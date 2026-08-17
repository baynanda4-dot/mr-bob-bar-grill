"use client";

import { useState } from "react";

const OTHER_VALUE = "__other__";
const DEFAULT_OPTIONS = [1, 2, 3, 4, 5];

/**
 * Guest-count dropdown (1-5 by default, with a "type manually" escape
 * hatch for larger groups) — same combobox/manual-toggle pattern as
 * PhoneField's country code. Shared by both Number of Adults (required)
 * and Number of Children (optional) fields.
 */
export default function GuestCountField({
  value,
  onChange,
  options = DEFAULT_OPTIONS,
  placeholder = "Number of Guests",
  required = false,
  className = "field p-3",
}) {
  const [isManual, setIsManual] = useState(false);

  const handleSelectChange = (e) => {
    if (e.target.value === OTHER_VALUE) {
      setIsManual(true);
      onChange({ target: { value: "" } });
      return;
    }
    onChange(e);
  };

  const handleUseList = () => {
    setIsManual(false);
    onChange({ target: { value: "" } });
  };

  return isManual ? (
    <div className="flex flex-col gap-1">
      <input
        type="number"
        min={required ? 1 : 0}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        aria-label={placeholder}
        className={className}
      />
      <button
        type="button"
        onClick={handleUseList}
        className="text-left text-xs text-white/50 underline hover:text-mrbob-yellow"
      >
        Use list
      </button>
    </div>
  ) : (
    <select value={value} onChange={handleSelectChange} required={required} aria-label={placeholder} className={className}>
      <option value="" disabled={required}>
        {placeholder}
      </option>
      {options.map((n) => (
        <option key={n} value={n}>
          {n}
        </option>
      ))}
      <option value={OTHER_VALUE}>Other (type manually)</option>
    </select>
  );
}
