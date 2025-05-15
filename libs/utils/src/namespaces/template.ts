export const templatesList = [
  "bronzor",
  "nosepass",
  "onyx",
] as const;

export type Template = (typeof templatesList)[number];
