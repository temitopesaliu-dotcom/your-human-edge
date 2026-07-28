import { ERROR_MESSAGES } from "./consulting-profile-form.data";

export default function FieldError({ name, errors }: { name: string; errors: Record<string, boolean> }) {
  return errors[name] ? (
    <div className="cpf-field-error-msg">{ERROR_MESSAGES[name] || "This field is required."}</div>
  ) : null;
}
