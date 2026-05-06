import { useState, type FormEvent } from 'react'
import { FormField } from '@/components/contact/FormField'
import { TextAreaField } from '@/components/contact/TextAreaField'

type SubmitState = 'idle' | 'loading' | 'success' | 'error'

interface FormValues {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const initialValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface ContactFormProps {
  onSubmitSuccess?: () => void
}

export function ContactForm({ onSubmitSuccess }: ContactFormProps) {
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate()) return

    setSubmitState('loading')
    setSubmitMessage('')

    try {
      await new Promise((resolve) => setTimeout(resolve, 900))
      setSubmitState('success')
      setSubmitMessage('Request sent. Our team will get back to you shortly.')
      setValues(initialValues)
      onSubmitSuccess?.()
    } catch {
      setSubmitState('error')
      setSubmitMessage('Request failed. Please try again in a moment.')
    }
  }

  return (
    <form className="vct-form" noValidate onSubmit={handleSubmit}>
      <div className="vct-grid-two">
        <FormField
          id="contact-first-name"
          label="First name"
          required
          value={values.firstName}
          onChange={(value) => setField('firstName', value)}
          placeholder="First name"
          error={errors.firstName}
        />
        <FormField
          id="contact-last-name"
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
          id="contact-email"
          label="Email address"
          required
          type="email"
          value={values.email}
          onChange={(value) => setField('email', value)}
          placeholder="you@company.com"
          error={errors.email}
        />
        <FormField
          id="contact-phone"
          label="Phone number"
          type="tel"
          value={values.phone}
          onChange={(value) => setField('phone', value)}
          placeholder="+1 000 000 0000"
        />
      </div>

      <TextAreaField
        id="contact-message"
        label="Message"
        required
        value={values.message}
        onChange={(value) => setField('message', value)}
        placeholder="Tell us what’s on your mind..."
        error={errors.message}
      />

      <p className="vct-privacy">
        By submitting this form, you agree that Vynho may process your details to respond to your inquiry. Read our{' '}
        <a href="/privacy">Privacy Policy</a> for more information.
      </p>

      <div className="vct-submit-row">
        {submitMessage ? (
          <p className={submitState === 'error' ? 'vct-submit-message is-error' : 'vct-submit-message'}>{submitMessage}</p>
        ) : (
          <span />
        )}
        <button type="submit" className="vct-submit-btn" disabled={submitState === 'loading'}>
          {submitState === 'loading' ? 'Sending...' : submitState === 'success' ? 'Request sent' : 'Send request'}
          <i>→</i>
        </button>
      </div>
    </form>
  )
}
