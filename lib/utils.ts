export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export const HEADER_OFFSET = 88;

export function sectionId(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function formatGitHubDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
