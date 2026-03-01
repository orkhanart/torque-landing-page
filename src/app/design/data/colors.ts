export interface ColorGrade {
  grade: number;
  hex: string;
}

export interface ColorFamily {
  name: string;
  slug: string;
  role: string;
  core: number; // which grade is the "core" brand color
  grades: ColorGrade[];
}

export const blue: ColorFamily = {
  name: "Blue",
  slug: "blue",
  role: "Primary brand, CTAs, links",
  core: 60,
  grades: [
    { grade: 10, hex: "#E6E7FF" },
    { grade: 20, hex: "#CCCDFF" },
    { grade: 30, hex: "#9999FF" },
    { grade: 40, hex: "#6666FF" },
    { grade: 50, hex: "#3333FF" },
    { grade: 60, hex: "#0008FF" },
    { grade: 70, hex: "#0006CC" },
    { grade: 80, hex: "#000599" },
    { grade: 90, hex: "#000366" },
    { grade: 100, hex: "#000233" },
  ],
};

export const gray: ColorFamily = {
  name: "Gray",
  slug: "gray",
  role: "UI backbone, text, backgrounds",
  core: 90,
  grades: [
    { grade: 10, hex: "#F4FAFF" },
    { grade: 20, hex: "#EFF3F7" },
    { grade: 30, hex: "#DEE2E8" },
    { grade: 40, hex: "#BCC2CC" },
    { grade: 50, hex: "#8A929F" },
    { grade: 60, hex: "#6B7280" },
    { grade: 70, hex: "#4A5059" },
    { grade: 80, hex: "#2E3540" },
    { grade: 90, hex: "#1A1F27" },
    { grade: 100, hex: "#08090A" },
  ],
};

export const cyan: ColorFamily = {
  name: "Cyan",
  slug: "cyan",
  role: "Data viz, highlights, accents",
  core: 40,
  grades: [
    { grade: 10, hex: "#EAFFF8" },
    { grade: 20, hex: "#CCFFF0" },
    { grade: 30, hex: "#99FFE3" },
    { grade: 40, hex: "#5DFDCB" },
    { grade: 50, hex: "#3DDAA8" },
    { grade: 60, hex: "#2BB88A" },
    { grade: 70, hex: "#1F9670" },
    { grade: 80, hex: "#157456" },
    { grade: 90, hex: "#0C523C" },
    { grade: 100, hex: "#063024" },
  ],
};

export const coral: ColorFamily = {
  name: "Coral",
  slug: "coral",
  role: "Alerts, warm accents",
  core: 40,
  grades: [
    { grade: 10, hex: "#FFF0EF" },
    { grade: 20, hex: "#FFE0DE" },
    { grade: 30, hex: "#FFC5C3" },
    { grade: 40, hex: "#F1A3A1" },
    { grade: 50, hex: "#D88987" },
    { grade: 60, hex: "#BF706E" },
    { grade: 70, hex: "#A65856" },
    { grade: 80, hex: "#8C403F" },
    { grade: 90, hex: "#732A29" },
    { grade: 100, hex: "#5A1514" },
  ],
};

export const colorFamilies: ColorFamily[] = [blue, gray, cyan, coral];

export const gradients = [
  {
    name: "Primary",
    css: "linear-gradient(135deg, #0008FF 0%, #0006CC 100%)",
    stops: ["#0008FF", "#0006CC"],
  },
  {
    name: "Aqua",
    css: "linear-gradient(135deg, #5DFDCB 0%, #7CC6FE 100%)",
    stops: ["#5DFDCB", "#7CC6FE"],
  },
  {
    name: "Brand",
    css: "linear-gradient(90deg, #F4FAFF -7.54%, #5DFDCB 50%, #7CC6FE 100%)",
    stops: ["#F4FAFF", "#5DFDCB", "#7CC6FE"],
  },
  {
    name: "Warm",
    css: "linear-gradient(135deg, #F1A3A1 0%, #7CC6FE 100%)",
    stops: ["#F1A3A1", "#7CC6FE"],
  },
];
