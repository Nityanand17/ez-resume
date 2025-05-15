import { sampleResume } from "@reactive-resume/schema";
import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";

import { router } from "./router";
import { useArtboardStore } from "./store/artboard";

// Pre-initialize the artboard store with sample data if needed
if (!useArtboardStore.getState().resume) {
  useArtboardStore.setState({ resume: sampleResume });
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.querySelector("#root")!);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
