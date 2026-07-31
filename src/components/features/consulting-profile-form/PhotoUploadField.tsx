"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { ACCEPTED_PHOTO_TYPES, ERROR_MESSAGES, MAX_PHOTO_BYTES } from "./consulting-profile-form.data";
import type { FieldName } from "./consulting-profile-form.data";

interface PhotoUploadFieldProps {
  value: string;
  error: boolean;
  onChange: (name: FieldName, value: string) => void;
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function PhotoUploadField({ value, error, onChange }: PhotoUploadFieldProps) {
  const [localError, setLocalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_PHOTO_TYPES.includes(file.type)) {
      setLocalError("Please upload a JPG or PNG image.");
      onChange("photo_base64", "");
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setLocalError(`Image must be smaller than ${Math.floor(MAX_PHOTO_BYTES / (1024 * 1024))}MB.`);
      onChange("photo_base64", "");
      return;
    }

    setLocalError(null);
    onChange("photo_base64", await readAsDataUrl(file));
  };

  const handleRemove = () => {
    onChange("photo_base64", "");
    setLocalError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const showError = Boolean(localError) || error;

  return (
    <div className={`cpf-field${showError ? " error" : ""}`} id="f-photo">
      <label className="cpf-field-label">
        Photo of yourself <span className="cpf-req">*</span>
      </label>
      <div className="cpf-field-hint">A clear, recent photo of your face. JPG or PNG.</div>

      {value ? (
        <div className="cpf-photo-preview">
          {/* eslint-disable-next-line @next/next/no-img-element -- inline data-URL preview of a user upload, next/image can't optimize that */}
          <img src={value} alt="Your uploaded photo" className="cpf-photo-preview-img" />
          <button type="button" className="cpf-photo-remove" onClick={handleRemove}>
            Remove photo
          </button>
        </div>
      ) : (
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_PHOTO_TYPES.join(",")}
          onChange={handleFile}
        />
      )}

      {showError && (
        <div className="cpf-field-error-msg">{localError || ERROR_MESSAGES.photo_base64}</div>
      )}
    </div>
  );
}
