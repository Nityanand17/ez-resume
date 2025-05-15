/* eslint-disable lingui/text-restrictions */
/* eslint-disable lingui/no-unlocalized-strings */

import { t, Trans } from '@/client/libs/i18n';
import { Quotes } from "@phosphor-icons/react";
import { cn } from "@reactive-resume/utils";
import { motion } from "framer-motion";

const email = "nityanandyadav2324@gmail.com";

type Testimonial = {
  quote: string;
  name: string;
};

const testimonials: Testimonial[][] = [
  [
    {
      name: "A. Sharma",
      quote:
        "EZResume made resume writing so easy! I’ve always found it difficult to structure my CV, but this tool simplified everything beautifully.",
    },
    {
      name: "R. Mehta",
      quote:
        "Hey Nityanand, just wanted to say a big thank you for EZResume. It's honestly one of the cleanest and most effective resume builders I've come across. Shared it with all my college friends!",
    },
    {
      name: "K. Iyer",
      quote:
        "Loved the simplicity of your resume builder! The fact that it’s open-source was the cherry on top. Thank you for building something so useful.",
    },
  ],
  [
    {
      name: "T. Verma",
      quote:
        "Your tool didn’t just help me get a job — it helped my cousin and even a college senior. Truly grateful! Donated on GitHub as a small thanks.",
    },
    {
      name: "J. Pillai",
      quote:
        "I'm a civil engineer and not very tech-savvy, but EZResume was a breeze to use. Hats off for keeping it free and easy to use. Keep up the great work!",
    },
  ],
  [
    {
      name: "F. Ansari",
      quote:
        "EZResume has been a blessing! Created my resume in minutes and it looked better than most paid tools. Thank you so much!",
    },
    {
      name: "S. Reddy",
      quote:
        "Really appreciate your effort in making EZResume open for everyone. It’s far better than many paid builders I've tried earlier.",
    },
    {
      name: "M. Choudhary",
      quote:
        "Thanks a lot for building EZResume. It’s so intuitive and beginner-friendly. After struggling with other platforms, this was a breath of fresh air!",
    },
  ],
];


export const TestimonialsSection = () => (
  <section id="testimonials" className="container relative space-y-12 py-24 sm:py-32">
    <div className="space-y-6 text-center">
      <h1 className="text-4xl font-bold">{t`Testimonials`}</h1>
      <p className="mx-auto max-w-2xl leading-relaxed">
        <Trans>
          I always love to hear from the users of EZResume with feedback or support. Here are
          some of the messages I've received. If you have any feedback, feel free to drop me an
          email at{" "}
          <a href={email} className="underline">
            {email}
          </a>
          .
        </Trans>
      </p>
    </div>

    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-y-0">
      {testimonials.map((columnGroup, groupIndex) => (
        <div key={groupIndex} className="space-y-8">
          {columnGroup.map((testimonial, index) => (
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0, transition: { delay: index * 0.25 } }}
              className={cn(
                "relative overflow-hidden rounded-lg bg-secondary-accent p-5 text-primary shadow-lg",
                index > 0 && "hidden lg:block",
              )}
            >
              <Quotes size={64} className="absolute -right-3 bottom-0 opacity-20" />
              <blockquote className="italic leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-3 font-medium">{testimonial.name}</figcaption>
            </motion.figure>
          ))}
        </div>
      ))}
    </div>
  </section>
);
