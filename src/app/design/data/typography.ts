export interface TypeStyle {
  name: string;
  fontFamily: string;
  fontFamilyClass: string;
  weights: { label: string; value: number }[];
  sizes: {
    label: string;
    mobile: string;
    desktop: string;
    lineHeight: string;
    tracking?: string;
  }[];
}

export const displayType: TypeStyle = {
  name: "Instrument Sans",
  fontFamily: "Instrument Sans",
  fontFamilyClass: "font-display",
  weights: [
    { label: "Regular", value: 400 },
    { label: "Medium", value: 500 },
    { label: "SemiBold", value: 600 },
    { label: "Bold", value: 700 },
  ],
  sizes: [
    { label: "Display XL", mobile: "48px", desktop: "96px", lineHeight: "0.95", tracking: "-0.02em" },
    { label: "Display L", mobile: "40px", desktop: "72px", lineHeight: "0.95", tracking: "-0.02em" },
    { label: "Display M", mobile: "32px", desktop: "56px", lineHeight: "1.0", tracking: "-0.01em" },
    { label: "Heading 1", mobile: "28px", desktop: "40px", lineHeight: "1.1", tracking: "-0.01em" },
    { label: "Heading 2", mobile: "24px", desktop: "32px", lineHeight: "1.15" },
    { label: "Heading 3", mobile: "20px", desktop: "24px", lineHeight: "1.2" },
  ],
};

export const bodyType: TypeStyle = {
  name: "Geist",
  fontFamily: "Geist",
  fontFamilyClass: "font-body",
  weights: [
    { label: "Regular", value: 400 },
    { label: "Medium", value: 500 },
    { label: "SemiBold", value: 600 },
    { label: "Bold", value: 700 },
  ],
  sizes: [
    { label: "Body L", mobile: "18px", desktop: "20px", lineHeight: "1.6" },
    { label: "Body M", mobile: "16px", desktop: "16px", lineHeight: "1.6" },
    { label: "Body S", mobile: "14px", desktop: "14px", lineHeight: "1.5" },
    { label: "Caption", mobile: "12px", desktop: "12px", lineHeight: "1.4" },
  ],
};

export const monoType: TypeStyle = {
  name: "Geist Mono",
  fontFamily: "Geist Mono",
  fontFamilyClass: "font-mono",
  weights: [
    { label: "Regular", value: 400 },
    { label: "Medium", value: 500 },
    { label: "SemiBold", value: 600 },
  ],
  sizes: [
    { label: "Data L", mobile: "14px", desktop: "16px", lineHeight: "1.5", tracking: "0.02em" },
    { label: "Data M", mobile: "12px", desktop: "14px", lineHeight: "1.5", tracking: "0.02em" },
    { label: "Label", mobile: "10px", desktop: "11px", lineHeight: "1.4", tracking: "0.1em" },
    { label: "Code", mobile: "13px", desktop: "14px", lineHeight: "1.6" },
  ],
};

export const typeStyles = [displayType, bodyType, monoType];
