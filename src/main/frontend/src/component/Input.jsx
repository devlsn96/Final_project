import React from "react";

export default function Input({
  label,
  type,
  placeholder,
  name,
  button,
  ...props
}) {
  return (
    <div>
      <label>
        {label}
        <div className="input-with-button">
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            id={name}
            required
            {...props}
          />
          {button && (
            <button
              type="button"
              className="input-btn"
              onClick={button.onClick}
              disabled={button.disabled}
            >
              {button.text}
            </button>
          )}
        </div>
      </label>
    </div>
  );
}
