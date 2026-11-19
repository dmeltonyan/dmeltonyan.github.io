import { z } from 'zod'

export const REASON_OPTIONS = ['Full-time role', 'Internship', 'Project or collaboration', 'Something else'] as const

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name'),
  company: z.string().trim().optional(),
  reason: z.string().min(1, 'Please pick a reason'),
  message: z.string().trim().min(1, 'Please write a short message')
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
