import { zodResolver } from "@hookform/resolvers/zod";
import { t, Trans } from '@/client/libs/i18n';
import { FloppyDisk, TrashSimple } from "@phosphor-icons/react";
import {
  Alert,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@reactive-resume/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DEFAULT_MAX_TOKENS, DEFAULT_MODEL, GEMINI_MODELS } from "@/client/constants/llm";
import { useLLMStore } from "@/client/stores/llm";

const formSchema = z.object({
  apiKey: z
    .string()
    // eslint-disable-next-line lingui/no-unlocalized-strings
    .min(1, "API key cannot be empty.")
    .default(""),
  model: z.string().default(DEFAULT_MODEL),
  maxTokens: z.number().default(DEFAULT_MAX_TOKENS),
});

type FormValues = z.infer<typeof formSchema>;

export const GeminiSettings = () => {
  const { apiKey, setApiKey, model, setModel, maxTokens, setMaxTokens } = useLLMStore();

  const isEnabled = !!apiKey;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: apiKey ?? "",
      model: model ?? DEFAULT_MODEL,
      maxTokens: maxTokens ?? DEFAULT_MAX_TOKENS,
    },
  });

  const onSubmit = ({ apiKey, model, maxTokens }: FormValues) => {
    setApiKey(apiKey);
    if (model) {
      setModel(model);
    }
    if (maxTokens) {
      setMaxTokens(maxTokens);
    }
  };

  const onRemove = () => {
    setApiKey(null);
    setModel(DEFAULT_MODEL);
    setMaxTokens(DEFAULT_MAX_TOKENS);
    form.reset({ apiKey: "", model: DEFAULT_MODEL, maxTokens: DEFAULT_MAX_TOKENS });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold leading-relaxed tracking-tight">{t`Gemini Integration`}</h3>
        <p className="leading-relaxed opacity-75">
          {t`You can make use of the Gemini API to help you generate content, or improve your writing while composing your resume.`}
        </p>
      </div>

      <div className="prose prose-sm prose-zinc max-w-full dark:prose-invert">
        <p>
          <Trans>
            You'll need to{" "}
            <a
              target="_blank"
              rel="noopener noreferrer nofollow"
              href="https://ai.google.dev/tutorials/setup"
            >
              obtain your own Google Gemini API key
            </a>
            . This key empowers you to leverage the API as you see fit. Alternatively, if you wish
            to disable the AI features in Reactive Resume altogether, you can simply remove the key
            from your settings.
          </Trans>
        </p>
      </div>

      <Form {...form}>
        <form className="grid gap-6 sm:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="apiKey"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t`Gemini API Key`}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="AI..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="model"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t`Model`}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {GEMINI_MODELS.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="maxTokens"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t`Max Tokens`}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={`${DEFAULT_MAX_TOKENS}`}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.valueAsNumber);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center space-x-2 self-end sm:col-start-2">
            <Button type="submit" disabled={!form.formState.isValid}>
              {isEnabled && <FloppyDisk className="mr-2" />}
              {isEnabled ? t`Saved` : t`Save Locally`}
            </Button>

            {isEnabled && (
              <Button type="reset" variant="ghost" onClick={onRemove}>
                <TrashSimple className="mr-2" />
                {t`Forget`}
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className="prose prose-sm prose-zinc max-w-full dark:prose-invert">
        <p>
          <Trans>
            Your API key is securely stored in the browser's local storage and is only utilized when
            making requests to Google's Gemini API via their official SDK. Rest assured that your key is not
            transmitted to any external server except when interacting with Google's services.
          </Trans>
        </p>
      </div>

      <Alert variant="warning">
        <div className="prose prose-neutral max-w-full text-xs leading-relaxed text-primary dark:prose-invert">
          <Trans>
            <strong>Note: </strong>By utilizing the Gemini API, you acknowledge and accept the{" "}
            <a
              href="https://ai.google.dev/terms"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              terms of use
            </a>{" "}
            and{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              privacy policy
            </a>{" "}
            outlined by Google. Please note that Reactive Resume bears no responsibility for any improper
            or unauthorized utilization of the service, and any resulting repercussions or
            liabilities solely rest on the user.
          </Trans>
        </div>
      </Alert>
    </div>
  );
};
