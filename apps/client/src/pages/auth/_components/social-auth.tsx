import { t } from '@/client/libs/i18n';
import { Button } from "@reactive-resume/ui";

import { useAuthProviders } from "@/client/services/auth/providers";

export const SocialAuth = () => {
  const { providers } = useAuthProviders();

  if (!providers) return null;
  
  const providersArray = providers.providers || [];

  if (providersArray.length === 0) return null;

  // OAuth functionality has been removed
  return null;
};
