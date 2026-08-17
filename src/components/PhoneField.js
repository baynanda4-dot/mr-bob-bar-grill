"use client";

import { useState } from "react";
import { COUNTRY_CODES, DEFAULT_COUNTRY_CODE } from "@/lib/countryCodes";

const OTHER_VALUE = "__other__";
const MANUAL_CODE_PATTERN = /^\+[0-9]+$/;

/**
 * Country-code combobox (dropdown, with a "type manually" escape hatch) +
 * number input, combined into one "+62 8123..." value by the parent form on
 * submit. `className` matches whatever border/rounded style the surrounding
 * form already uses, so this drops into any of the existing form grids
 * without changing their look.
 *
 * The dropdown/manual toggle is kept local to this component — parents only
 * ever see plain "+<digits>" values through `onCountryCodeChange`, so no
 * changes were needed in the forms that already use this field.
 */
export default function PhoneField({
  countryCode,
  onCountryCodeChange,
  number,
  onNumberChange,
  error,
  className = "field p-3",
  required = true,
}) {
  const [isManual, setIsManual] = useState(false);

  const handleSelectChange = (e) => {
    if (e.target.value === OTHER_VALUE) {
      setIsManual(true);
      onCountryCodeChange({ target: { value: "+" } });
      return;
    }
    onCountryCodeChange(e);
  };

  const handleUseList = () => {
    setIsManual(false);
    onCountryCodeChange({ target: { value: DEFAULT_COUNTRY_CODE } });
  };

  const manualInvalid = isManual && countryCode && !MANUAL_CODE_PATTERN.test(countryCode);

  return (
    <div>
      <div className="flex gap-2">
        {isManual ? (
          <div className="flex w-32 shrink-0 flex-col gap-1">
            <input
              type="text"
              inputMode="tel"
              value={countryCode}
              onChange={onCountryCodeChange}
              placeholder="+66"
              required={required}
              pattern="\+[0-9]+"
              title="Country code must start with + followed by digits only, e.g. +66"
              aria-label="Country code"
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
          <select
            value={countryCode}
            onChange={handleSelectChange}
            aria-label="Country code"
            className={`${className} w-32 shrink-0`}
          >
            {COUNTRY_CODES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
            <option value={OTHER_VALUE}>Other (type manually)</option>
          </select>
        )}
        <input
          type="tel"
          inputMode="numeric"
          placeholder="Whatsapp Number"
          required={required}
          value={number}
          onChange={onNumberChange}
          aria-label="Whatsapp Number"
          className={`${className} min-w-0 flex-1`}
        />
      </div>
      {manualInvalid && (
        <p className="mt-1 text-xs text-red-600">
          Country code must start with + followed by digits only (e.g. +66).
        </p>
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
