import { i18n, t } from '@/client/libs/i18n';
// Removed @lingui/react import:  useLingui ;
import { Helmet } from "react-helmet-async";

import { FAQSection } from "./sections/faq";
import { FeaturesSection } from "./sections/features";
import { HeroSection } from "./sections/hero";
import { SupportSection } from "./sections/support";
import { TemplatesSection } from "./sections/templates";
import { TestimonialsSection } from "./sections/testimonials";

export const HomePage = () => {
  return (
    <main className="relative isolate bg-background">
      <Helmet prioritizeSeoTags>
        <html lang={i18n.locale} />

        <title>
          EZResume - {t`A free and open-source resume builder`}
        </title>

        <meta
          name="description"
          content="A free and open-source resume builder that simplifies the process of creating, updating, and sharing your resume."
        />
      </Helmet>

      <HeroSection />
      <FeaturesSection />
      <TemplatesSection />
      <TestimonialsSection />
      <SupportSection />
      <FAQSection />
    </main>
  );
};
