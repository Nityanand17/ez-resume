/* eslint-disable lingui/text-restrictions */
/* eslint-disable lingui/no-unlocalized-strings */

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";

// Who are you, and why did you build EZResume?
const Question1 = () => (
  <AccordionItem value="1">
    <AccordionTrigger className="text-left leading-relaxed">
      Is EZResume open source?
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        Yes! EZResume is fully open source. You can view, modify, or contribute via our{" "}
        <a href="https://github.com/Nityanand17/ez-resume" target="_blank" rel="noreferrer">GitHub repo</a>.
      </p>
    </AccordionContent>
  </AccordionItem>
);

const Question2 = () => (
  <AccordionItem value="2">
    <AccordionTrigger className="text-left leading-relaxed">
      Can I export my resume as a PDF?
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        Absolutely. Just click on the "Download PDF" button from the editor to save your resume offline.
      </p>
    </AccordionContent>
  </AccordionItem>
);

const Question3 = () => (
  <AccordionItem value="3">
    <AccordionTrigger className="text-left leading-relaxed">
      Do I need to create an account to use it?
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        No account is required. You can build, save, and download resumes entirely from your browser.
      </p>
    </AccordionContent>
  </AccordionItem>
);

const Question4 = () => (
  <AccordionItem value="4">
    <AccordionTrigger className="text-left leading-relaxed">
      Can I customize the resume templates?
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        Yes! You can change layouts, sections, fonts, and colors to match your personal style.
      </p>
    </AccordionContent>
  </AccordionItem>
);

const Question5 = () => (
  <AccordionItem value="5">
    <AccordionTrigger className="text-left leading-relaxed">
      Is my data stored securely?
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        Your data is stored locally in your browser. If you clear your browser data, you may lose your resume unless it's backed up.
      </p>
    </AccordionContent>
  </AccordionItem>
);

export const FAQSection = () => (
  <section id="faq" className="container relative py-24 sm:py-32">
    <div className="grid gap-12 lg:grid-cols-3">
      <div className="space-y-6">
        <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>

        <p className="text-base leading-loose">
          Here are some questions I often get asked about EZResume.
        </p>

        
      </div>

      <div className="col-span-2">
        <Accordion collapsible type="single">
          <Question1 />
          <Question2 />
          <Question3 />
          <Question4 />
          <Question5 />
        </Accordion>
      </div>
    </div>
  </section>
);
