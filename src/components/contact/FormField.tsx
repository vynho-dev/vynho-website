interface FormFieldProps {
  id: string
  label: string
  required?: boolean
  value: string
  onChange: (value: string) => void
  placeholder: string
  error?: string
  type?: 'text' | 'email' | 'tel'
}

export function FormField({
  id,
  label,
  required = false,
  value,
  onChange,
  placeholder,
  error,
  type = 'text',
}: FormFieldProps) {
  return (
    <div className="vct-field">
      <label htmlFor={id}>
        <span>{label}</span>
        {required ? <em>Required</em> : <em>Optional</em>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <p id={`${id}-error`} className="vct-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
