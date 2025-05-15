import type { Template } from "@reactive-resume/utils";

import { Bronzor } from "./bronzor";
import { Nosepass } from "./nosepass";
import { Onyx } from "./onyx";

export const getTemplate = (template: Template) => {
  switch (template) {
    case "bronzor":
      return Bronzor;
    case "nosepass":
      return Nosepass;
    case "onyx":
      return Onyx;
    default:
      return Onyx;
  }
}; 