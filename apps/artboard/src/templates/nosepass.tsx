import type {
  Award,
  Certification,
  CustomSection,
  CustomSectionGroup,
  Interest,
  Language,
  Profile,
  Project,
  Publication,
  Reference,
  SectionKey,
  SectionWithItem,
  Skill,
  URL,
} from "@reactive-resume/schema";
import { Education, Experience, Volunteer } from "@reactive-resume/schema";
import { cn, isEmptyString, isUrl, sanitize } from "@reactive-resume/utils";
import get from "lodash.get";
import { Fragment } from "react";

import { BrandIcon } from "../components/brand-icon";
import { Picture } from "../components/picture";
import { useArtboardStore } from "../store/artboard";
import type { TemplateProps } from "../types/template";

const Header = () => {
  const basics = useArtboardStore((state) => state.resume.basics);
  const profiles = useArtboardStore((state) => state.resume.sections.profiles);

  return (
    <div className="mb-4 space-y-2 text-center">
      <div className="text-2xl font-bold">{basics.name}</div>
      
      <div className="flex flex-wrap items-center justify-center gap-x-3 text-sm">
        {basics.location && (
          <div className="flex items-center gap-x-1">
            <i className="ph ph-map-pin" />
            <span>{basics.location}</span>
          </div>
        )}
        {basics.email && (
          <div className="flex items-center gap-x-1">
            <i className="ph ph-at" />
            <a href={`mailto:${basics.email}`}>{basics.email}</a>
          </div>
        )}
        {basics.phone && (
          <div className="flex items-center gap-x-1">
            <i className="ph ph-phone" />
            <a href={`tel:${basics.phone}`}>{basics.phone}</a>
          </div>
        )}
        {isUrl(basics.url.href) && (
          <div className="flex items-center gap-x-1">
            <i className="ph ph-globe" />
            <a href={basics.url.href} target="_blank" rel="noreferrer">
              {basics.url.label || basics.url.href}
            </a>
          </div>
        )}
        
        {profiles.items
          .filter((item) => item.visible && isUrl(item.url.href))
          .map((profile) => (
            <div key={profile.id} className="flex items-center gap-x-1">
              <BrandIcon slug={profile.icon} />
              <a href={profile.url.href} target="_blank" rel="noreferrer">
                {profile.username}
              </a>
            </div>
          ))}

        {basics.customFields.map((item) => (
          <div key={item.id} className="flex items-center gap-x-1">
            <i className={`ph ph-${item.icon}`} />
            {isUrl(item.value) ? (
              <a href={item.value} target="_blank" rel="noreferrer">
                {item.name || item.value}
              </a>
            ) : (
              <span>{item.name ? `${item.name}: ${item.value}` : item.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Summary = () => {
  const section = useArtboardStore((state) => state.resume.sections.summary);

  if (!section.visible || isEmptyString(section.content)) return null;

  return (
    <section id={section.id} className="mb-4">
      <h3 className="mb-1 font-bold">{section.name}</h3>
      <hr className="mb-2 border-black" />
      <div
        dangerouslySetInnerHTML={{ __html: sanitize(section.content) }}
        style={{ columns: section.columns }}
        className="wysiwyg"
      />
    </section>
  );
};

type LinkProps = {
  url: URL;
  icon?: React.ReactNode;
  iconOnRight?: boolean;
  label?: string;
  className?: string;
};

const Link = ({ url, icon, iconOnRight, label, className }: LinkProps) => {
  if (!isUrl(url.href)) return null;

  return (
    <div className="flex items-center gap-x-1.5">
      {!iconOnRight && (icon ?? <i className="ph ph-link" />)}
      <a
        href={url.href}
        target="_blank"
        rel="noreferrer noopener nofollow"
        className={cn("inline-block", className)}
      >
        {label ?? (url.label || url.href)}
      </a>
      {iconOnRight && (icon ?? <i className="ph ph-link" />)}
    </div>
  );
};

type LinkedEntityProps = {
  name: string;
  url: URL;
  separateLinks: boolean;
  className?: string;
};

const LinkedEntity = ({ name, url, separateLinks, className }: LinkedEntityProps) => {
  return !separateLinks && isUrl(url.href) ? (
    <Link
      url={url}
      label={name}
      icon={<i className="ph ph-globe" />}
      className={className}
    />
  ) : (
    <div className={className}>{name}</div>
  );
};

type SectionProps<T> = {
  section: SectionWithItem<T> | CustomSectionGroup;
  children?: (item: T) => React.ReactNode;
  urlKey?: keyof T;
  dateKey?: keyof T;
  levelKey?: keyof T;
  summaryKey?: keyof T;
  keywordsKey?: keyof T;
};

const Section = <T,>({
  section,
  children,
  urlKey,
  dateKey,
  summaryKey,
  keywordsKey,
}: SectionProps<T>) => {
  if (!section.visible || section.items.length === 0) return null;

  return (
    <section id={section.id} className="mb-4">
      <h3 className="mb-1 font-bold">{section.name}</h3>
      <hr className="mb-2 border-black" />

      <div className="space-y-2">
        {section.items
          .filter((item) => item.visible)
          .map((item) => {
            const url = (urlKey && get(item, urlKey)) as URL | undefined;
            const date = (dateKey && get(item, dateKey, "")) as string | undefined;
            const summary = (summaryKey && get(item, summaryKey, "")) as string | undefined;
            const keywords = (keywordsKey && get(item, keywordsKey, [])) as string[] | undefined;

            return (
              <div key={item.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    {children?.(item as T)}
                  </div>
                  
                  {date && <div className="text-right italic">{date}</div>}
                </div>

                {url !== undefined && section.separateLinks && <Link url={url} />}

                {summary !== undefined && !isEmptyString(summary) && (
                  <div
                    dangerouslySetInnerHTML={{ __html: sanitize(summary) }}
                    className="wysiwyg pl-4"
                  />
                )}

                {keywords !== undefined && keywords.length > 0 && (
                  <p className="pl-4">• {keywords.join(", ")}</p>
                )}
              </div>
            );
          })}
      </div>
    </section>
  );
};

const Profiles = () => {
  const section = useArtboardStore((state) => state.resume.sections.profiles);

  return (
    <Section<Profile> section={section} urlKey="url">
      {(item) => (
        <div className="flex items-center gap-x-1">
          <BrandIcon slug={item.icon} />
          <span className="font-medium">{item.network}</span>
          <span>{item.username}</span>
        </div>
      )}
    </Section>
  );
};

const Experience = () => {
  const section = useArtboardStore((state) => state.resume.sections.experience);

  return (
    <Section<Experience> section={section} urlKey="url" dateKey="date" summaryKey="summary">
      {(item) => (
        <div>
          <div className="font-medium">{item.position}</div>
          <div className="flex items-baseline gap-x-1">
            <LinkedEntity
              name={item.company}
              url={item.url}
              separateLinks={section.separateLinks}
            />
            {item.location && <span className="text-sm">{item.location}</span>}
          </div>
        </div>
      )}
    </Section>
  );
};

const Education = () => {
  const section = useArtboardStore((state) => state.resume.sections.education);

  return (
    <Section<Education> section={section} urlKey="url" dateKey="date" summaryKey="summary">
      {(item) => (
        <div>
          <div className="font-medium">{item.institution}</div>
          <div className="flex items-baseline gap-x-1">
            <div>{item.studyType}</div>
            {item.score && <div className="text-sm">{item.score}</div>}
            {item.area && <div className="text-sm">{item.area}</div>}
          </div>
        </div>
      )}
    </Section>
  );
};

const Awards = () => {
  const section = useArtboardStore((state) => state.resume.sections.awards);

  return (
    <Section<Award> section={section} urlKey="url" dateKey="date" summaryKey="summary">
      {(item) => (
        <div>
          <div className="font-medium">{item.title}</div>
          <div>{item.awarder}</div>
        </div>
      )}
    </Section>
  );
};

const Certifications = () => {
  const section = useArtboardStore((state) => state.resume.sections.certifications);

  return (
    <Section<Certification> section={section} urlKey="url" dateKey="date" summaryKey="summary">
      {(item) => (
        <div>
          <div className="font-medium">{item.name}</div>
          <div>{item.issuer}</div>
        </div>
      )}
    </Section>
  );
};

const Skills = () => {
  const section = useArtboardStore((state) => state.resume.sections.skills);

  return (
    <Section<Skill> section={section} levelKey="level" keywordsKey="keywords">
      {(item) => (
        <div>
          <div className="font-medium">
            {item.name}
            {item.description && <span className="ml-2 text-sm">({item.description})</span>}
          </div>
        </div>
      )}
    </Section>
  );
};

const Interests = () => {
  const section = useArtboardStore((state) => state.resume.sections.interests);

  return (
    <Section<Interest> section={section} keywordsKey="keywords">
      {(item) => <div className="font-medium">{item.name}</div>}
    </Section>
  );
};

const Publications = () => {
  const section = useArtboardStore((state) => state.resume.sections.publications);

  return (
    <Section<Publication> section={section} urlKey="url" dateKey="date" summaryKey="summary">
      {(item) => (
        <div>
          <div className="font-medium">
            {item.name}
            {item.publisher && <span className="ml-1 text-sm">({item.publisher})</span>}
          </div>
        </div>
      )}
    </Section>
  );
};

const Volunteer = () => {
  const section = useArtboardStore((state) => state.resume.sections.volunteer);

  return (
    <Section<Volunteer> section={section} urlKey="url" dateKey="date" summaryKey="summary">
      {(item) => (
        <div>
          <div className="font-medium">{item.position}</div>
          <div>
            <LinkedEntity
              name={item.organization}
              url={item.url}
              separateLinks={section.separateLinks}
            />
            {item.location && <span className="ml-1 text-sm">{item.location}</span>}
          </div>
        </div>
      )}
    </Section>
  );
};

const Languages = () => {
  const section = useArtboardStore((state) => state.resume.sections.languages);

  return (
    <Section<Language> section={section} levelKey="level">
      {(item) => (
        <div>
          <span className="font-medium">{item.name}</span>
          {item.description && <span className="ml-2 text-sm">({item.description})</span>}
        </div>
      )}
    </Section>
  );
};

const Projects = () => {
  const section = useArtboardStore((state) => state.resume.sections.projects);

  return (
    <Section<Project>
      section={section}
      urlKey="url"
      dateKey="date"
      summaryKey="summary"
      keywordsKey="keywords"
    >
      {(item) => (
        <div>
          <div className="font-medium">
            <LinkedEntity
              name={item.name}
              url={item.url}
              separateLinks={section.separateLinks}
            />
          </div>
          {item.description && <div className="text-sm">{item.description}</div>}
        </div>
      )}
    </Section>
  );
};

const References = () => {
  const section = useArtboardStore((state) => state.resume.sections.references);

  return (
    <Section<Reference> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div className="font-medium">
          <LinkedEntity name={item.name} url={item.url} separateLinks={section.separateLinks} />
          {item.description && <span className="ml-2 text-sm">• {item.description}</span>}
        </div>
      )}
    </Section>
  );
};

const Custom = ({ id }: { id: string }) => {
  const section = useArtboardStore((state) => state.resume.sections.custom[id]);

  return (
    <Section<CustomSection>
      section={section}
      urlKey="url"
      dateKey="date"
      summaryKey="summary"
      keywordsKey="keywords"
    >
      {(item) => (
        <div>
          <div className="font-medium">
            <LinkedEntity name={item.name} url={item.url} separateLinks={section.separateLinks} />
          </div>
          <div className="flex items-baseline gap-x-1">
            {item.description && <span>{item.description}</span>}
            {item.location && <span className="text-sm">{item.location}</span>}
          </div>
        </div>
      )}
    </Section>
  );
};

const mapSectionToComponent = (section: SectionKey) => {
  switch (section) {
    case "profiles": {
      return <Profiles />;
    }
    case "summary": {
      return <Summary />;
    }
    case "experience": {
      return <Experience />;
    }
    case "education": {
      return <Education />;
    }
    case "awards": {
      return <Awards />;
    }
    case "certifications": {
      return <Certifications />;
    }
    case "skills": {
      return <Skills />;
    }
    case "interests": {
      return <Interests />;
    }
    case "publications": {
      return <Publications />;
    }
    case "volunteer": {
      return <Volunteer />;
    }
    case "languages": {
      return <Languages />;
    }
    case "projects": {
      return <Projects />;
    }
    case "references": {
      return <References />;
    }
    default: {
      if (section.startsWith("custom.")) return <Custom id={section.split(".")[1]} />;

      return null;
    }
  }
};

export const Nosepass = ({ columns, isFirstPage = false }: TemplateProps) => {
  return (
    <div className="p-custom">
      <div className="text-right text-xs italic mb-2">
        Last updated on September 2024
      </div>
      
      {isFirstPage && <Header />}

      <div>
        {columns.flatMap((column) =>
          column.map((section) => <Fragment key={section}>{mapSectionToComponent(section)}</Fragment>)
        )}
      </div>
      
      <div className="text-center text-xs mt-4">
        <span>Page 1 of 1</span>
      </div>
    </div>
  );
};
