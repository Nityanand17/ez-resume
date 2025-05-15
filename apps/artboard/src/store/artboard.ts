import type { ResumeData } from "@reactive-resume/schema";
import { sampleResume } from "@reactive-resume/schema";
import { create } from "zustand";

export type ArtboardStore = {
  resume: ResumeData;
  setResume: (resume: ResumeData) => void;
};

export const useArtboardStore = create<ArtboardStore>()((set) => ({
  resume: sampleResume,
  setResume: (resume) => {
    set({ resume });
  },
}));
