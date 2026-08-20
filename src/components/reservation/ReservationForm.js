"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useFormSubmit } from "@/lib/useFormSubmit";
import { isValidEmail, isValidPhoneDigits } from "@/lib/validation";
import { DEFAULT_COUNTRY_CODE } from "@/lib/countryCodes";
import { TITLES } from "@/lib/titles";
import { OPENING_HOUR_SLOTS, todayLocalDate } from "@/lib/timeSlots";
import PhoneField from "@/components/PhoneField";
import GuestCountField from "@/components/GuestCountField";
import SubmitButton from "@/components/SubmitButton";

const initialFields = {
  title: "",
  firstName: "",
  lastName: "",
  date: "",
  time: "",
  adults: "",
  children: "",
  email: "",
  whatsappCountry: DEFAULT_COUNTRY_CODE,
  whatsappNumber: "",
  message: "",
  pickupNeeded: false,
  hotelName: "",
  roomNumber: "",
};

const LABEL_CLASS = "mb-1.5 block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/50";
// No width class here — PhoneField appends its own (w-32/flex-1) to
// whatever className it's given, so a baked-in w-full would collide.
// Every other field adds w-full itself via FIELD_CLASS_FULL.
const FIELD_CLASS = "field-line py-2";
const FIELD_CLASS_FULL = `${FIELD_CLASS} w-full`;

function FieldLabel({ children, required }) {
  return (
    <label className={LABEL_CLASS}>
      {children}
      {required && <span className="text-mrbob-yellow"> *</span>}
    </label>
  );
}

// `dict` is dictionaries/*/forms.json's `reservation` slice, `common` is
// its `common` slice (shared field-chrome strings reused across all 3 forms).
export default function ReservationForm({ dict, common }) {
  const router = useRouter();
  const { locale } = useParams();
  const today = todayLocalDate();
  const [fields, setFields] = useState(initialFields);
  const [fieldErrors, setFieldErrors] = useState({});
  const { status, errorMessage, submitForm, submittingMessage } = useFormSubmit({
    formType: "reservation",
    messages: common.submittingMessages,
    errorFallback: common.errorFallback,
  });

  const update = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));
  const toggle = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.checked }));

  const validate = () => {
    const errors = {};
    if (!isValidEmail(fields.email)) errors.email = common.emailError;
    if (!isValidPhoneDigits(fields.whatsappNumber)) errors.whatsapp = common.phoneError;
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const { whatsappCountry, whatsappNumber, pickupNeeded, hotelName, roomNumber, ...rest } = fields;
    const payload = {
      ...rest,
      whatsapp: `${whatsappCountry} ${whatsappNumber}`,
      ...(pickupNeeded ? { hotelName, roomNumber } : {}),
      locale,
    };

    const ok = await submitForm(payload);
    if (ok) {
      setFields(initialFields);
      setFieldErrors({});
      router.push(`/${locale}/reservation/thank-you`);
    }
  };

  return (
    <div id="reservation" className="w-full">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <fieldset disabled={status === "submitting"} className="m-0 min-w-0 space-y-5 border-0 p-0">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <FieldLabel>{dict.titleLabel}</FieldLabel>
              <select value={fields.title} onChange={update("title")} aria-label={dict.titleLabel} className={FIELD_CLASS_FULL}>
                <option value="">{dict.titleNone}</option>
                {TITLES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel required>{dict.firstNameLabel}</FieldLabel>
              <input placeholder={dict.firstNamePlaceholder} aria-label={dict.firstNameLabel} required value={fields.firstName} onChange={update("firstName")} className={FIELD_CLASS_FULL} />
            </div>
            <div>
              <FieldLabel required>{dict.lastNameLabel}</FieldLabel>
              <input placeholder={dict.lastNamePlaceholder} aria-label={dict.lastNameLabel} required value={fields.lastName} onChange={update("lastName")} className={FIELD_CLASS_FULL} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel required>{dict.dateLabel}</FieldLabel>
              <input type="date" min={today} required value={fields.date} onChange={update("date")} className={FIELD_CLASS_FULL} />
            </div>
            <div>
              <FieldLabel required>{dict.timeLabel}</FieldLabel>
              <select required value={fields.time} onChange={update("time")} className={FIELD_CLASS_FULL}>
                <option value="" disabled>
                  {dict.selectTime}
                </option>
                {OPENING_HOUR_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel required>{dict.adultsLabel}</FieldLabel>
              <GuestCountField
                value={fields.adults}
                onChange={update("adults")}
                placeholder={dict.guestSelectPlaceholder}
                required
                className={FIELD_CLASS_FULL}
                useListLabel={common.useList}
                otherManualLabel={common.otherManual}
              />
            </div>
            <div>
              <FieldLabel>{dict.childrenLabel}</FieldLabel>
              <GuestCountField
                value={fields.children}
                onChange={update("children")}
                options={[0, 1, 2, 3, 4, 5]}
                placeholder={dict.guestSelectPlaceholder}
                className={FIELD_CLASS_FULL}
                useListLabel={common.useList}
                otherManualLabel={common.otherManual}
              />
            </div>
          </div>

          <div>
            <FieldLabel required>{dict.emailLabel}</FieldLabel>
            <input
              type="email"
              placeholder={dict.emailPlaceholder}
              aria-label={dict.emailLabel}
              required
              value={fields.email}
              onChange={update("email")}
              className={FIELD_CLASS_FULL}
            />
            {fieldErrors.email && <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>}
          </div>

          <div>
            <FieldLabel required>{dict.whatsappLabel}</FieldLabel>
            <PhoneField
              countryCode={fields.whatsappCountry}
              onCountryCodeChange={update("whatsappCountry")}
              number={fields.whatsappNumber}
              onNumberChange={update("whatsappNumber")}
              error={fieldErrors.whatsapp}
              className={FIELD_CLASS}
              dict={common}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                checked={fields.pickupNeeded}
                onChange={toggle("pickupNeeded")}
                className="h-4 w-4 rounded border-white/25 bg-white/5 accent-mrbob-yellow"
              />
              {dict.pickupLabel}
            </label>
            {fields.pickupNeeded && (
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel required>{dict.hotelNameLabel}</FieldLabel>
                  <input placeholder={dict.hotelNamePlaceholder} aria-label={dict.hotelNameLabel} required value={fields.hotelName} onChange={update("hotelName")} className={FIELD_CLASS_FULL} />
                </div>
                <div>
                  <FieldLabel required>{dict.roomNumberLabel}</FieldLabel>
                  <input placeholder={dict.roomNumberPlaceholder} aria-label={dict.roomNumberLabel} required value={fields.roomNumber} onChange={update("roomNumber")} className={FIELD_CLASS_FULL} />
                </div>
              </div>
            )}
          </div>

          <div>
            <FieldLabel>{dict.specialRequestsLabel}</FieldLabel>
            <textarea
              placeholder={dict.specialRequestsPlaceholder}
              aria-label={dict.specialRequestsLabel}
              value={fields.message}
              onChange={update("message")}
              className={`${FIELD_CLASS_FULL} h-20 resize-none`}
            ></textarea>
          </div>

          <div className="pt-2">
            <SubmitButton status={status} label={dict.submitLabel} submittingMessage={submittingMessage} />
          </div>

          <p className="text-xs text-white/40">{dict.holdNotice}</p>
        </fieldset>
        {status === "success" && (
          <p className="text-center text-sm text-emerald-400">{dict.successMessage}</p>
        )}
        {status === "error" && (
          <p className="text-center text-sm text-red-400">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}
