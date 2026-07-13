import fs from 'node:fs/promises'
import path from 'node:path'
import { gzipSync } from 'node:zlib'

const root = process.cwd()
const distAssetsDir = path.join(root, 'dist', 'client', 'assets')
const reportPath = path.join(root, '.agent-tmp', 'bundle-audit-report.json')

const thresholds = {
  jsGzipMaxBytes: 170 * 1024,
  cssGzipMaxBytes: 25 * 1024,
  totalGzipMaxBytes: 244 * 1024,
  jsRawMaxBytes: 512 * 1024,
}

const budgetPolicy =
  'The budgets include the required Embla Carousel, Radix Accordion, and Motion useAnimate mini entrance-animation runtime. Motion raised only the raw-JS and total-gzip ceilings; the JS-gzip and CSS ceilings remain unchanged.'

const removedHeavyRuntimePackages = [
  '@fortawesome/fontawesome-svg-core',
  '@fortawesome/free-brands-svg-icons',
  '@fortawesome/free-solid-svg-icons',
  '@fortawesome/react-fontawesome',
  'lucide-react',
]

function formatKb(bytes) {
  return Number((bytes / 1024).toFixed(2))
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, 'utf8'))
}

async function listAssetStats() {
  const entries = await fs.readdir(distAssetsDir, { withFileTypes: true })
  const assets = []

  for (const entry of entries) {
    if (!entry.isFile()) continue

    const filePath = path.join(distAssetsDir, entry.name)
    const buffer = await fs.readFile(filePath)
    const gzipBytes = gzipSync(buffer).length
    const ext = path.extname(entry.name).replace('.', '') || 'unknown'

    assets.push({
      file: entry.name,
      type: ext,
      rawBytes: buffer.length,
      gzipBytes,
      rawKb: formatKb(buffer.length),
      gzipKb: formatKb(gzipBytes),
    })
  }

  return assets.sort((a, b) => b.rawBytes - a.rawBytes)
}

function sumByType(assets, type) {
  return assets.filter((asset) => asset.type === type).reduce((total, asset) => total + asset.gzipBytes, 0)
}

function rawByType(assets, type) {
  return assets.filter((asset) => asset.type === type).reduce((total, asset) => total + asset.rawBytes, 0)
}

async function checkRemovedHeavyRuntimePackages() {
  const packageJson = await readJson(path.join(root, 'package.json'))
  const dependencyBuckets = {
    dependencies: packageJson.dependencies ?? {},
    devDependencies: packageJson.devDependencies ?? {},
  }

  return removedHeavyRuntimePackages.map((packageName) => ({
    packageName,
    presentInDependencies: packageName in dependencyBuckets.dependencies,
    presentInDevDependencies: packageName in dependencyBuckets.devDependencies,
  }))
}

async function checkBundleStrings(assets) {
  const jsAssets = assets.filter((asset) => asset.type === 'js')
  const checks = []

  for (const asset of jsAssets) {
    const source = await fs.readFile(path.join(distAssetsDir, asset.file), 'utf8')
    checks.push({
      file: asset.file,
      containsFontAwesomeRuntime: source.includes('___FONT_AWESOME___'),
      containsLucideRuntime: source.includes('lucide') || source.includes('Lucide'),
    })
  }

  return checks
}

const assets = await listAssetStats()
const jsGzipBytes = sumByType(assets, 'js')
const cssGzipBytes = sumByType(assets, 'css')
const totalGzipBytes = assets.reduce((total, asset) => total + asset.gzipBytes, 0)
const jsRawBytes = rawByType(assets, 'js')
const removedPackageChecks = await checkRemovedHeavyRuntimePackages()
const bundleStringChecks = await checkBundleStrings(assets)

const assertions = [
  {
    name: 'js gzip under threshold',
    passed: jsGzipBytes <= thresholds.jsGzipMaxBytes,
    actualBytes: jsGzipBytes,
    maxBytes: thresholds.jsGzipMaxBytes,
  },
  {
    name: 'css gzip under threshold',
    passed: cssGzipBytes <= thresholds.cssGzipMaxBytes,
    actualBytes: cssGzipBytes,
    maxBytes: thresholds.cssGzipMaxBytes,
  },
  {
    name: 'total gzip under threshold',
    passed: totalGzipBytes <= thresholds.totalGzipMaxBytes,
    actualBytes: totalGzipBytes,
    maxBytes: thresholds.totalGzipMaxBytes,
  },
  {
    name: 'js raw under threshold',
    passed: jsRawBytes <= thresholds.jsRawMaxBytes,
    actualBytes: jsRawBytes,
    maxBytes: thresholds.jsRawMaxBytes,
  },
  {
    name: 'deprecated Font Awesome and Lucide runtime packages removed from package.json',
    passed: removedPackageChecks.every((item) => !item.presentInDependencies && !item.presentInDevDependencies),
    details: removedPackageChecks,
  },
  {
    name: 'bundle does not include Font Awesome runtime marker',
    passed: bundleStringChecks.every((item) => !item.containsFontAwesomeRuntime),
    details: bundleStringChecks,
  },
]

const report = {
  generatedAt: new Date().toISOString(),
  budgetPolicy,
  thresholds: Object.fromEntries(Object.entries(thresholds).map(([key, value]) => [key, `${formatKb(value)} kB`])),
  summary: {
    jsRawKb: formatKb(jsRawBytes),
    jsGzipKb: formatKb(jsGzipBytes),
    cssGzipKb: formatKb(cssGzipBytes),
    totalGzipKb: formatKb(totalGzipBytes),
  },
  assets,
  assertions,
}

await fs.mkdir(path.dirname(reportPath), { recursive: true })
await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`)
console.log(JSON.stringify(report, null, 2))

const failedAssertions = assertions.filter((assertion) => !assertion.passed)
if (failedAssertions.length > 0) {
  console.error(`Bundle audit failed: ${failedAssertions.map((assertion) => assertion.name).join(', ')}`)
  process.exitCode = 1
}
