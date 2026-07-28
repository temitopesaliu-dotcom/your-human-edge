export default function FieldError({ field, errors }: { field: string; errors: Record<string, string> }) {
  return errors[field] ? <p className="form-error">{errors[field]}</p> : null;
}
