import { t } from '@/client/libs/i18n';

export const SupportSection = () => (
  <section
    id="support"
    className="relative space-y-12 bg-secondary-accent py-24 text-primary sm:py-32"
  >
    <div className="container space-y-6">
      <h1 className="text-4xl font-bold">{t`Supporting Reactive Resume`}</h1>

      <p className="max-w-4xl leading-loose">
      {t`Reactive Resume is a free and open-source project. Your support means a lot! If you're able and willing, consider making a donation through the platform below.`}
      </p>

      <div className="flex items-center gap-x-10">

        <a href="https://paypal.me/Nityanand Yadav" rel="noreferrer noopener nofollow" target="_blank">
          {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
          <img src="/support-logos/paypal.svg" className="max-h-[28px]" alt="PayPal" />
        </a>
      </div>

      <p className="max-w-4xl leading-loose">
      {t`If you're unable to contribute financially, you can still support Reactive Resume by starring the GitHub repo, sharing it with friends, or sending a quick message about how it helped you. Your feedback and support truly mean a lot!`}
      </p>
    </div>
  </section>
);
