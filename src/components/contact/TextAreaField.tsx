interface TextAreaFieldProps {
  id: string
  label: string
  required?: boolean
  value: string
  onChange: (value: string) => void
  placeholder: string
  error?: string
}

export function TextAreaField({ id, label, required = false, value, onChange, placeholder, error }: TextAreaFieldProps) {
  return (
    <div className="vct-field vct-textarea-field">
      <label htmlFor={id}>
        <span>{label}</span>
        {required ? <em>Required</em> : <em>Optional</em>}
      </label>
      <textarea
        id={id}
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
