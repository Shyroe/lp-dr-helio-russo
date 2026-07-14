import fs from 'node:fs/promises'
import path from 'node:path'
import ts from 'typescript'

const root = process.cwd()
const srcDir = path.join(root, 'src')
const reportPath = path.join(root, '.agent-tmp', 'css-audit-report.json')

const allowedCssFiles = new Set(['src/styles.css', 'src/theme.css'])
const forbiddenGlobalClasses = ['btn', 'card', 'input', 'separator']
const forbiddenCodePatterns = [
  { type: 'removed-feature-reference', pattern: new RegExp(['features', 'elearning'].join('/'), 'g') },
  { type: 'removed-asset-reference', pattern: new RegExp(['assets', 'landing', 'elearning'].join('/'), 'g') },
  { type: 'removed-page-reference', pattern: new RegExp(['E', 'learning', 'Page'].join(''), 'g') },
  { type: 'removed-css-class', pattern: new RegExp(`\\.${['elearning', ''].join('-')}`, 'g') },
  { type: 'removed-css-token', pattern: new RegExp(`--${['elearning', ''].join('-')}`, 'g') },
]
const legacyTokenPattern =
  /(?:var\(--(?:cyan|cyan-dark|navy|body|light|white)\)|--(?:cyan|cyan-dark|navy|body|light|white)\s*:)/g

// Runtime-calculated values that cannot be represented by static Tailwind utilities.
// Adding another inline style requires an explicit audit-policy update and documentation.
const approvedDynamicInlineStyles = new Map([
  ['src/features/dr-helio-russo/sections/LifeStagesSection.tsx', [['backgroundImage']]],
  ['src/features/dr-helio-russo/sections/testimonials/ReviewCard.tsx', [['height', 'transform']]],
  ['src/features/dr-helio-russo/sections/testimonials/TestimonialsSection.tsx', [['transform']]],
])

async function listFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await listFiles(fullPath)))
    if (entry.isFile() && /\.(css|tsx?|jsx?)$/.test(entry.name)) files.push(fullPath)
  }

  return files
}

function lineNumber(source, index) {
  return source.slice(0, index).split('\n').length
}

function unwrapExpression(expression) {
  let current = expression
  while (
    ts.isAsExpression(current) ||
    ts.isTypeAssertionExpression(current) ||
    ts.isParenthesizedExpression(current) ||
    ts.isSatisfiesExpression(current)
  ) {
    current = current.expression
  }
  return current
}

function propertyNameText(name, sourceFile) {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return name.text
  return name.getText(sourceFile)
}

function inspectInlineStyles({ file, relativePath, source, findings }) {
  if (!/\.(tsx|jsx)$/.test(file)) return

  const sourceFile = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.JSX
  )
  const inlineStyles = []

  function visit(node) {
    if (
      ts.isJsxAttribute(node) &&
      node.name.text === 'style' &&
      node.initializer &&
      ts.isJsxExpression(node.initializer) &&
      node.initializer.expression
    ) {
      const expression = unwrapExpression(node.initializer.expression)
      const descriptor = {
        node,
        properties: [],
      }

      if (ts.isObjectLiteralExpression(expression)) {
        for (const property of expression.properties) {
          if (!ts.isPropertyAssignment(property)) continue
          const propertyName = propertyNameText(property.name, sourceFile)
          descriptor.properties.push(propertyName)
          const initializer = unwrapExpression(property.initializer)
          const isStaticValue =
            ts.isStringLiteral(initializer) ||
            ts.isNumericLiteral(initializer) ||
            ts.isNoSubstitutionTemplateLiteral(initializer) ||
            initializer.kind === ts.SyntaxKind.TrueKeyword ||
            initializer.kind === ts.SyntaxKind.FalseKeyword

          if (isStaticValue) {
            findings.push({
              type: 'static-inline-style',
              file: relativePath,
              line: sourceFile.getLineAndCharacterOfPosition(property.getStart(sourceFile)).line + 1,
              value: propertyName,
            })
          }
        }
      } else {
        descriptor.properties.push('<non-object-expression>')
      }

      inlineStyles.push(descriptor)
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)

  const approvedSignatures = (approvedDynamicInlineStyles.get(relativePath) ?? []).map((properties) =>
    [...properties].sort().join(',')
  )

  for (const descriptor of inlineStyles) {
    const signature = [...descriptor.properties].sort().join(',')
    const approvedIndex = approvedSignatures.indexOf(signature)

    if (approvedIndex >= 0) {
      approvedSignatures.splice(approvedIndex, 1)
      continue
    }

    findings.push({
      type: 'unapproved-inline-style',
      file: relativePath,
      line: sourceFile.getLineAndCharacterOfPosition(descriptor.node.getStart(sourceFile)).line + 1,
      value: signature || 'style',
    })
  }
}

const files = await listFiles(srcDir)
const findings = []

for (const file of files) {
  const relativePath = path.relative(root, file)
  const source = await fs.readFile(file, 'utf8')

  if (file.endsWith('.css') && !allowedCssFiles.has(relativePath)) {
    findings.push({
      type: 'unapproved-css-file',
      file: relativePath,
      line: 1,
      value: relativePath,
    })
  }

  for (const globalClass of forbiddenGlobalClasses) {
    const selectorPattern = new RegExp(`(^|[\\s,{>+~])\\.${globalClass}(?![\\w-])`, 'gm')
    for (const match of source.matchAll(selectorPattern)) {
      const selectorIndex = (match.index ?? 0) + match[1].length
      findings.push({
        type: 'forbidden-global-class',
        file: relativePath,
        line: lineNumber(source, selectorIndex),
        value: `.${globalClass}`,
      })
    }
  }

  let importantIndex = source.indexOf('!important')
  while (importantIndex !== -1) {
    findings.push({
      type: 'important',
      file: relativePath,
      line: lineNumber(source, importantIndex),
      value: '!important',
    })
    importantIndex = source.indexOf('!important', importantIndex + 10)
  }

  for (const match of source.matchAll(legacyTokenPattern)) {
    findings.push({
      type: 'legacy-token',
      file: relativePath,
      line: lineNumber(source, match.index ?? 0),
      value: match[0],
    })
  }

  for (const check of forbiddenCodePatterns) {
    for (const match of source.matchAll(check.pattern)) {
      findings.push({
        type: check.type,
        file: relativePath,
        line: lineNumber(source, match.index ?? 0),
        value: match[0],
      })
    }
  }

  inspectInlineStyles({ file, relativePath, source, findings })
}

const report = {
  generatedAt: new Date().toISOString(),
  filesScanned: files.length,
  policy: {
    styling: 'Tailwind-first',
    allowedCssFiles: [...allowedCssFiles],
    approvedDynamicInlineStyles: Object.fromEntries(approvedDynamicInlineStyles),
  },
  assertions: [
    { name: 'no !important in source styles/components', passed: !findings.some((item) => item.type === 'important') },
    {
      name: 'no forbidden global template utility classes',
      passed: !findings.some((item) => item.type === 'forbidden-global-class'),
    },
    {
      name: 'legacy color aliases were removed from source',
      passed: !findings.some((item) => item.type === 'legacy-token'),
    },
    {
      name: 'removed landing code is not referenced from source',
      passed: !findings.some((item) => item.type.startsWith('removed-')),
    },
    {
      name: 'only global infrastructure and theme CSS files are authored',
      passed: !findings.some((item) => item.type === 'unapproved-css-file'),
    },
    {
      name: 'JSX does not use static inline styles',
      passed: !findings.some((item) => item.type === 'static-inline-style'),
    },
    {
      name: 'inline styles are limited to approved runtime-calculated values',
      passed: !findings.some((item) => item.type === 'unapproved-inline-style'),
    },
  ],
  findings,
}

await fs.mkdir(path.dirname(reportPath), { recursive: true })
await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`)
console.log(JSON.stringify(report, null, 2))

const failedAssertions = report.assertions.filter((assertion) => !assertion.passed)
if (failedAssertions.length > 0) {
  console.error(`CSS audit failed: ${failedAssertions.map((assertion) => assertion.name).join(', ')}`)
  process.exitCode = 1
}
