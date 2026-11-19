'use client'

// Third-party Imports
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

// Type Imports
import type { ContactFormValues } from './contact-form-schema'
import { contactFormSchema, REASON_OPTIONS } from './contact-form-schema'
import { PROFILE } from '@/lib/profile'

// Component Imports
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from '@/components/ui/select'

// Util Imports
import { cn } from '@/lib/utils'

type ContactFormProps = {
  className?: string
}

const ContactForm = ({ className }: ContactFormProps) => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      company: '',
      reason: '',
      message: ''
    }
  })

  // No backend on a static site: compose the email in the visitor's own mail app.
  const onSubmit = (values: ContactFormValues) => {
    const from = values.company ? `${values.name} (${values.company})` : values.name
    const subject = `${values.reason}: message from ${from}`
    const body = `${values.message}\n\n${from}`
    const href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    window.location.assign(href)
    toast.info(`Opening your email app. If nothing happens, email ${PROFILE.email} directly.`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-5', className)}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='gap-1'>
              <FormLabel className='text-muted-foreground text-base'>Name*</FormLabel>
              <FormControl>
                <Input
                  placeholder='Your name'
                  className='border-border h-11 rounded-[12px] bg-(--background-darker)'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='company'
          render={({ field }) => (
            <FormItem className='gap-1'>
              <FormLabel className='text-muted-foreground text-base'>Company</FormLabel>
              <FormControl>
                <Input
                  placeholder='Optional'
                  className='border-border h-11 rounded-[12px] bg-(--background-darker)'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='reason'
          render={({ field }) => (
            <FormItem className='gap-1'>
              <FormLabel className='text-muted-foreground text-base'>Reason*</FormLabel>
              <Select value={field.value || undefined} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className='border-border h-11! w-full rounded-[12px] bg-(--background-darker)'>
                    <SelectValue placeholder='Select a reason' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {REASON_OPTIONS.map(reason => (
                      <SelectItem key={reason} value={reason}>
                        {reason}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem className='gap-1'>
              <FormLabel className='text-muted-foreground text-base'>Message*</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='What role or project is this about?'
                  className='border-border min-h-25 rounded-[12px] bg-(--background-darker)'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          variant='outline'
          className='hover:bg-card hover:text-accent bg-card h-10 w-full rounded-[12px]'
        >
          Write the email
        </Button>
        <p className='text-muted-foreground text-center text-sm'>
          Opens your email app with this message filled in. Or email me at{' '}
          <span className='text-foreground font-medium select-all'>{PROFILE.email}</span>
        </p>
      </form>
    </Form>
  )
}

export default ContactForm
