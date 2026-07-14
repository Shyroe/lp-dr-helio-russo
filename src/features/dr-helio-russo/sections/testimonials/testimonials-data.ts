import { drHelioRussoData } from '../../data'

export type Testimonial = (typeof drHelioRussoData.testimonials.items)[number]

export const testimonialItems = drHelioRussoData.testimonials.items
export const desktopTestimonials = [
  testimonialItems[1],
  testimonialItems[2],
  testimonialItems[3],
  testimonialItems[4],
  testimonialItems[5],
  testimonialItems[0],
] as const
export const tabletTestimonials = [
  testimonialItems[4],
  testimonialItems[5],
  testimonialItems[0],
  testimonialItems[1],
  testimonialItems[2],
  testimonialItems[3],
] as const
export const mobileTestimonials = [
  testimonialItems[3],
  testimonialItems[4],
  testimonialItems[5],
  testimonialItems[0],
  testimonialItems[1],
  testimonialItems[2],
] as const
