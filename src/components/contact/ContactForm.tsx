import { useState, type FormEvent } from 'react'
import { FormField } from '@/components/contact/FormField'
import { TextAreaField } from '@/components/contact/TextAreaField'
import { buildContactMailto, type ContactMailtoValues } from '@/lib/contactMailto'

type SubmitState = 'idle' | 'ready'

type FormValues = ContactMailtoValues

type FormErrors = Partial<Record<keyof FormValues, string>>

const initialValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ContactForm({ idPrefix = 'contact', variant = 'page' }: { idPrefix?: string; variant?: 'page' | 'sheet' }) {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const setField = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const validate = () => {
    const nextErrors: FormErrors = {}

    if (!values.firstName.trim()) nextErrors.firstName = 'Please enter your first name.'
    if (!values.lastName.trim()) nextErrors.lastName = 'Please enter your last name.'
    if (!values.email.trim() || !emailPattern.test(values.email)) nextErrors.email = 'Please enter a valid email address.'
    if (!values.message.trim()) nextErrors.message = 'Please tell us a little about your project.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!validate()) {
      window.requestAnimationFrame(() => {
        form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      })
      return
    }

    setSubmitState('ready')
    setSubmitMessage('Your email draft is ready. Send it from your email app to complete the inquiry.')
    window.location.href = buildContactMailto(values)
  }

  return (
    <form className={variant === 'sheet' ? 'vct-form vct-form-sheet' : 'vct-form'} aria-label="Project inquiry" noValidate onSubmit={handleSubmit}>
      <div className="vct-grid-two">
        <FormField
          id={`${idPrefix}-first-name`}
          label="First name"
          required
          value={values.firstName}
          onChange={(value) => setField('firstName', value)}
          placeholder="First name"
          error={errors.firstName}
        />
        <FormField
          id={`${idPrefix}-last-name`}
          label="Last name"
          required
          value={values.lastName}
          onChange={(value) => setField('lastName', value)}
          placeholder="Last name"
          error={errors.lastName}
        />
      </div>

      <div className="vct-grid-two">
        <FormField
          id={`${idPrefix}-email`}
          label="Email address"
          required
          type="email"
          value={values.email}
          onChange={(value) => setField('email', value)}
          placeholder="you@company.com"
          error={errors.email}
        />
        <FormField
          id={`${idPrefix}-phone`}
          label="Phone number"
          type="tel"
          value={values.phone}
          onChange={(value) => setField('phone', value)}
          placeholder="+1 000 000 0000"
        />
      </div>

      <TextAreaField
        id={`${idPrefix}-message`}
        label="Message"
        required
        value={values.message}
        onChange={(value) => setField('message', value)}
        placeholder="Tell us what’s on your mind..."
        error={errors.message}
      />

      <p className="vct-privacy">
        This form creates a pre-filled email draft. By continuing, you agree that Vynho may process your details to
        respond to your inquiry. Read our{' '}
        <a href="/privacy/">Privacy Policy</a> for more information.
      </p>

      <div className="vct-submit-row">
        {submitMessage ? (
          <p className="vct-submit-message" role="status">{submitMessage}</p>
        ) : (
          <span />
        )}
        <button type="submit" className="vct-submit-btn">
          {submitState === 'ready' ? 'Open draft again' : 'Create email draft'}
          <i>→</i>
        </button>
      </div>
    </form>
  )
}
