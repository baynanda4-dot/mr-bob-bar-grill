// Code first in the label (not "Indonesia (+62)") so the number that
// actually matters is still visible when the <select> is too narrow to
// show the whole label — it truncates from the end, not the start.
export const COUNTRY_CODES = [
  { code: "+62", label: "+62 Indonesia" },
  { code: "+65", label: "+65 Singapore" },
  { code: "+60", label: "+60 Malaysia" },
  { code: "+61", label: "+61 Australia" },
  { code: "+1", label: "+1 United States" },
  { code: "+44", label: "+44 United Kingdom" },
  { code: "+81", label: "+81 Japan" },
  { code: "+82", label: "+82 South Korea" },
  { code: "+86", label: "+86 China" },
  { code: "+91", label: "+91 India" },
  { code: "+31", label: "+31 Netherlands" },
  { code: "+49", label: "+49 Germany" },
];

export const DEFAULT_COUNTRY_CODE = "+62";
