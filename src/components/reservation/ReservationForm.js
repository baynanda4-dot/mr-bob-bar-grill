"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormSubmit } from "@/lib/useFormSubmit";
import { isValidEmail, isValidPhoneDigits, EMAIL_ERROR, PHONE_ERROR } from "@/lib/validation";
import { DEFAULT_COUNTRY_CODE } from "@/lib/countryCodes";
import { TITLES } from "@/lib/titles";
import { OPENING_HOUR_SLOTS } from "@/lib/timeSlots";
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

export default function ReservationForm() {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];
  const [fields, setFields] = useState(initialFields);
  const [fieldErrors, setFieldErrors] = useState({});
  const { status, errorMessage, submitForm, submittingMessage } = useFormSubmit({
    formType: "reservation",
  });

  const update = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));
  const toggle = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.checked }));

  const validate = () => {
    const errors = {};
    if (!isValidEmail(fields.email)) errors.email = EMAIL_ERROR;
    if (!isValidPhoneDigits(fields.whatsappNumber)) errors.whatsapp = PHONE_ERROR;
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
    };

    const ok = await submitForm(payload);
    if (ok) {
      setFields(initialFields);
      setFieldErrors({});
      router.push("/reservation/thank-you");
    }
  };

  return (
    <div id="reservation" className="w-full">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <fieldset disabled={status === "submitting"} className="m-0 min-w-0 space-y-5 border-0 p-0">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <FieldLabel>Title</FieldLabel>
              <select value={fields.title} onChange={update("title")} aria-label="Title" className={FIELD_CLASS_FULL}>
                <option value="">None</option>
                {TITLES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel required>First Name</FieldLabel>
              <input placeholder="Your first name" aria-label="First Name" required value={fields.firstName} onChange={update("firstName")} className={FIELD_CLASS_FULL} />
            </div>
            <div>
              <FieldLabel required>Last Name</FieldLabel>
              <input placeholder="Your last name" aria-label="Last Name" required value={fields.lastName} onChange={update("lastName")} className={FIELD_CLASS_FULL} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel required>Date</FieldLabel>
              <input type="date" min={today} required value={fields.date} onChange={update("date")} className={FIELD_CLASS_FULL} />
            </div>
            <div>
              <FieldLabel required>Time</FieldLabel>
              <select required value={fields.time} onChange={update("time")} className={FIELD_CLASS_FULL}>
                <option value="" disabled>
                  Select a time
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
              <FieldLabel required>Number of Adults</FieldLabel>
              <GuestCountField value={fields.adults} onChange={update("adults")} placeholder="Select" required className={FIELD_CLASS_FULL} />
            </div>
            <div>
              <FieldLabel>Number of Children</FieldLabel>
              <GuestCountField value={fields.children} onChange={update("children")} options={[0, 1, 2, 3, 4, 5]} placeholder="Select" className={FIELD_CLASS_FULL} />
            </div>
          </div>

          <div>
            <FieldLabel required>Email Address</FieldLabel>
            <input
              type="email"
              placeholder="you@example.com"
              aria-label="Email Address"
              required
              value={fields.email}
              onChange={update("email")}
              className={FIELD_CLASS_FULL}
            />
            {fieldErrors.email && <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>}
          </div>

          <div>
            <FieldLabel required>WhatsApp Number</FieldLabel>
            <PhoneField
              countryCode={fields.whatsappCountry}
              onCountryCodeChange={update("whatsappCountry")}
              number={fields.whatsappNumber}
              onNumberChange={update("whatsappNumber")}
              error={fieldErrors.whatsapp}
              className={FIELD_CLASS}
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
              I&apos;d like complimentary pickup around Nusa Dua (minimum 2 adults)
            </label>
            {fields.pickupNeeded && (
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel required>Hotel Name</FieldLabel>
                  <input placeholder="Hotel name" aria-label="Hotel Name" required value={fields.hotelName} onChange={update("hotelName")} className={FIELD_CLASS_FULL} />
                </div>
                <div>
                  <FieldLabel required>Room Number</FieldLabel>
                  <input placeholder="Room number" aria-label="Room Number" required value={fields.roomNumber} onChange={update("roomNumber")} className={FIELD_CLASS_FULL} />
                </div>
              </div>
            )}
          </div>

          <div>
            <FieldLabel>Special Requests</FieldLabel>
            <textarea
              placeholder="Dietary requirements, special arrangements..."
              aria-label="Special Requests"
              value={fields.message}
              onChange={update("message")}
              className={`${FIELD_CLASS_FULL} h-20 resize-none`}
            ></textarea>
          </div>

          <div className="pt-2">
            <SubmitButton status={status} label="Submit" submittingMessage={submittingMessage} />
          </div>

          <p className="text-xs text-white/40">
            Your table will be held for 30 minutes past the reservation time, after which the booking may be released and treated as cancelled.
          </p>
        </fieldset>
        {status === "success" && (
          <p className="text-center text-sm text-emerald-400">
            Thank you! Your table is confirmed. We&apos;re looking forward to welcoming you.
          </p>
        )}
        {status === "error" && (
          <p className="text-center text-sm text-red-400">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}
