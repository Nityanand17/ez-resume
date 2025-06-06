import { zodResolver } from "@hookform/resolvers/zod";
import { t } from '@/client/libs/i18n';
import { useTheme } from "@reactive-resume/hooks";
import {
  Button,
  Combobox,
  Form,
  FormField,
  FormItem,
  FormLabel,
} from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useUpdateUser, useUser } from "@/client/services/user";

const formSchema = z.object({
  theme: z.enum(["system", "light", "dark"]).default("system"),
});

type FormValues = z.infer<typeof formSchema>;

export const ProfileSettings = () => {
  const { user } = useUser();
  const { theme, setTheme } = useTheme();
  const { updateUser, loading } = useUpdateUser();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { theme },
  });

  useEffect(() => {
    user && onReset();
  }, [user]);

  const onReset = () => {
    if (!user) return;

    form.reset({ theme });
  };

  const onSubmit = async (data: FormValues) => {
    if (!user) return;

    setTheme(data.theme);
    form.reset(data);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold leading-relaxed tracking-tight">{t`Profile`}</h3>
        <p className="leading-relaxed opacity-75">
          {t`Here, you can update your profile to customize and personalize your experience.`}
        </p>
      </div>

      <Form {...form}>
        <form className="grid gap-6 sm:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="theme"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t`Theme`}</FormLabel>
                <div className="w-full">
                  <Combobox
                    {...field}
                    value={field.value}
                    options={[
                      { label: t`System`, value: "system" },
                      { label: t`Light`, value: "light" },
                      { label: t`Dark`, value: "dark" },
                    ]}
                    onValueChange={field.onChange}
                  />
                </div>
              </FormItem>
            )}
          />

          <div
            className={cn(
              "hidden items-center space-x-2 self-center sm:col-start-2",
              form.formState.isDirty && "flex animate-in fade-in",
            )}
          >
            <Button type="submit" disabled={loading}>
              {t`Save Changes`}
            </Button>
            <Button type="reset" variant="ghost" onClick={onReset}>
              {t`Discard`}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
