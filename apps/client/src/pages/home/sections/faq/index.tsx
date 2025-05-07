/* eslint-disable lingui/text-restrictions */
/* eslint-disable lingui/no-unlocalized-strings */

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";

import { useLanguages } from "@/client/services/resume/translation";

// Who are you, and why did you build Reactive Resume?
const Question1 = () => (
  <AccordionItem value="1">
    <AccordionTrigger className="text-left leading-relaxed">
      Who are you, and why did you build Reactive Resume?
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        I'm Nityanand Swami, a passionate developer from Visakhapatnam, India. I previously worked on a project called Typeblaze and have always enjoyed building things that solve real problems. 
      </p>

      <p>
        During my early days of development, I came across Reactive Resume and was impressed by its open-source nature and practical use. I decided to contribute by customizing and improving it further for users like me.
      </p>

      <p>
        My motivation has always been to help others present their professional story better through modern, user-friendly tools. This version of Reactive Resume reflects that vision and effort.
      </p>

      <p>
        I believe that tools like this should be accessible to everyone, without unnecessary barriers. This project is my way of giving back to the community and helping others take a confident step in their careers.
      </p>

      <p>
        I hope it continues to grow and reach more people who need a polished resume to kickstart their journey.
      </p>
    </AccordionContent>
  </AccordionItem>
);


// How much does it cost to run Reactive Resume?
const Question2 = () => (
  <AccordionItem value="2">
    <AccordionTrigger className="text-left leading-relaxed">
      How much does it cost to run Reactive Resume?
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        Running Reactive Resume doesn’t cost a lot. The hosting and associated services are minimal, and I’ve tried to keep it lightweight and accessible.
      </p>

      <p>
        I’ve put in several hours of development to bring this version to life and make it easier for users to build their resumes without hassle.
      </p>

      <p>
        I'm always happy to hear feedback or suggestions. You can reach out to me at <a href="mailto:nityanandyadav2324@gmail.com">nityanandyadav2324@gmail.com</a>.
      </p>
    </AccordionContent>
  </AccordionItem>
);


// Other than donating, how can I support you?
const Question3 = () => (
  <AccordionItem value="3">
    <AccordionTrigger className="text-left leading-relaxed">
      Other than donating, how can I support you?
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        <strong>If you speak a language other than English</strong>, sign up to be a translator on{" "}
        <a href="https://translate.rxresu.me/" target="_blank" rel="noreferrer">
          Crowdin
        </a>
        , our translation management service. You can help translate the product to your language
        and share it among your community. Even if the language is already translated, it helps to
        sign up as you would be notified when there are new phrases to be translated.
      </p>

      <p>
        <strong>If you work in the media, are an influencer or have lots of friends</strong>, share
        the app with your circles and let them know so it can reach the people who need it the most.
        I'm also <a href="mailto:hello@amruthpillai.com">open to giving tech talks</a>, although
        that's wishful thinking. But if you do mention Reactive Resume on your blog, let me know so
        that I can link back to you here.
      </p>

      <p>
        <strong>If you found a bug or have an idea for a feature</strong>, raise an issue on{" "}
        <a
          href="https://github.com/AmruthPillai/Reactive-Resume/issues/new/choose"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>{" "}
        or shoot me a message and let me know what you'd like to see. I can't promise that it'll be
        done soon, but juggling work, life and open-source, I'll definitely get to it when I can.
      </p>
    </AccordionContent>
  </AccordionItem>
);

// What languages are supported on Reactive Resume?
const Question4 = () => {
  const { languages } = useLanguages();

  return (
    <AccordionItem value="4">
      <AccordionTrigger className="text-left leading-relaxed">
        What languages are supported on Reactive Resume?
      </AccordionTrigger>
      <AccordionContent className="prose max-w-none dark:prose-invert">
        <p>
          Here are the languages currently supported by Reactive Resume, along with their respective
          completion percentages.
        </p>

        <div className="flex flex-wrap items-start justify-start gap-x-2 gap-y-4">
          {languages.map((language) => (
            <a
              key={language.id}
              className="no-underline"
              href={`https://crowdin.com/translate/reactive-resume/all/en-${language.editorCode}`}
              target="_blank"
              rel="noreferrer"
            >
              <div className="relative bg-secondary-accent font-medium transition-colors hover:bg-primary hover:text-background">
                <span className="px-2 py-1">{language.name}</span>

                {language.progress !== undefined && (
                  <span
                    className={cn(
                      "inset-0 bg-warning px-1.5 py-1 text-xs text-white",
                      language.progress < 40 && "bg-error",
                      language.progress > 80 && "bg-success",
                    )}
                  >
                    {language.progress}%
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>

        <p>
          If you'd like to improve the translations for your language, please{" "}
          <a href="https://crowdin.com/project/reactive-resume" rel="noreferrer" target="_blank">
            sign up as a translator on Crowdin
          </a>{" "}
          and join the project. You can also choose to be notified of any new phrases that get added
          to the app.
        </p>

        <p>
          If a language is missing from this list, please raise an issue on GitHub requesting its
          inclusion, and I will make sure to add it as soon as possible.
        </p>
      </AccordionContent>
    </AccordionItem>
  );
};

// How does the Gemini Integration work?
const Question5 = () => (
  <AccordionItem value="5">
    <AccordionTrigger className="text-left leading-relaxed">
      How does the Gemini Integration work?
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        Google's Gemini has been a game-changer for all of us. I cannot tell you how much AI has helped
        me in my everyday work and with the development of Reactive Resume. It only makes sense that
        you leverage what Gemini Flash 2.0 has to offer and let it help you build the perfect resume.
      </p>

      <p>
        While most applications out there charge you a fee to use their AI services (rightfully so,
        because it isn't cheap), you can choose to enter your own Gemini API key on the Settings
        page (under Gemini Integration).{" "}
        <strong>The key is stored in your browser's local storage</strong>, which means that if you
        uninstall your browser, or even clear your data, the key is gone with it. All requests made
        to Google's Gemini API are also sent directly to their service and does not hit the app servers at all.
      </p>

      <p>
        You are free to turn off all AI features (and not be aware of it's existence) simply by not
        adding a key in the Settings page and still make use of all the useful features that
        Reactive Resume has to offer. I would even suggest you to take the extra step of using
        Gemini's chat interface to write your content, and simply copy it over to Reactive Resume.
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
          Here are some questions I often get asked about Reactive Resume.
        </p>

        <p className="text-sm leading-loose">
          Unfortunately, this section is available only in English, as I do not want to burden
          translators with having to translate these large paragraphs of text.
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
