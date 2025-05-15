import { t, Trans } from "@/client/libs/i18n";
import { cn } from "@reactive-resume/utils";

type Props = {
  className?: string;
};

// Get app version from environment or set to development
const appVersion = import.meta.env.VITE_APP_VERSION || "development";

export const Copyright = ({ className }: Props) => (
  <div
    className={cn(
      "prose prose-sm prose-zinc flex max-w-none flex-col gap-y-1 text-xs opacity-40 dark:prose-invert",
      className,
    )}
  >
    <span>
      <Trans>
        Licensed under{" "}
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://github.com/NItyanand17/ez-resume/blob/main/LICENSE.md"
        >
          MIT
        </a>
      </Trans>
    </span>
    <span>{t`By the community, for the community.`}</span>
    <span>
      <Trans>
        A passion project by <a href="https:/nityanand.vercel.app/">Nityanand Yadav</a>
      </Trans>
    </span>

    <span className="mt-4">
      {t`EZResume`} {"v" + appVersion}
    </span>
  </div>
);
