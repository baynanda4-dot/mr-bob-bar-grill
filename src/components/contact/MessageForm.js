"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormSubmit } from "@/lib/useFormSubmit";
import { isValidEmail, isValidPhoneDigits, EMAIL_ERROR, PHONE_ERROR } from "@/lib/validation";
import { DEFAULT_COUNTRY_CODE } from "@/lib/countryCodes";
import { TITLES } from "@/lib/titles";
import PhoneField from "@/components/PhoneField";
import SubmitButton from "@/components/SubmitButton";

const initialFields = {
  title: "",
  firstName: "",
  lastName: "",
  email: "",
  whatsappCountry: DEFAULT_COUNTRY_CODE,
  whatsappNumber: "",
  message: "",
};

export default function MessageForm() {
  const router = useRouter();
  const [fields, setFields] = useState(initialFields);
  const [fieldErrors, setFieldErrors] = useState({});
  const { status, errorMessage, submitForm, submittingMessage } = useFormSubmit({
    formType: "contact",
  });

  const update = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));

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

    const { whatsappCountry, whatsappNumber, ...rest } = fields;
    const payload = { ...rest, whatsapp: `${whatsappCountry} ${whatsappNumber}` };

    const ok = await submitForm(payload);
    if (ok) {
      setFields(initialFields);
      setFieldErrors({});
      router.push("/contact/thank-you");
    }
  };

  return (
    <section className="py-24 px-6 max-w-2xl mx-auto border-t border-white/10">
      <h2 className="text-3xl font-light tracking-normal text-center mb-2">Send Us a Message</h2>
      <p className="text-center text-white/70 mb-14">
        If you have any questions, special requests, or would like more information, complete the form below.
      </p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <fieldset disabled={status === "submitting"} className="m-0 min-w-0 space-y-4 border-0 p-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select value={fields.title} onChange={update("title")} aria-label="Title" className="field p-3">
              <option value="">Title</option>
              {TITLES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <input placeholder="First Name" aria-label="First Name" required value={fields.firstName} onChange={update("firstName")} className="field p-3" />
            <input placeholder="Last Name" aria-label="Last Name" required value={fields.lastName} onChange={update("lastName")} className="field p-3" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
                required
                value={fields.email}
                onChange={update("email")}
                className="field p-3 w-full"
              />
              {fieldErrors.email && <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>}
            </div>
            <PhoneField
              countryCode={fields.whatsappCountry}
              onCountryCodeChange={update("whatsappCountry")}
              number={fields.whatsappNumber}
              onNumberChange={update("whatsappNumber")}
              error={fieldErrors.whatsapp}
              className="field p-3"
            />
          </div>
          <textarea placeholder="Add your enquiry" aria-label="Add your enquiry" required value={fields.message} onChange={update("message")} className="field p-3 w-full h-32"></textarea>
          <SubmitButton status={status} label="Send" submittingMessage={submittingMessage} />
        </fieldset>
        {status === "success" && (
          <p className="text-center text-sm text-emerald-400">
            Thank you! Your message has been sent. We&apos;ll get back to you shortly.
          </p>
        )}
        {status === "error" && (
          <p className="text-center text-sm text-red-400">{errorMessage}</p>
        )}
      </form>
    </section>
  );
}
