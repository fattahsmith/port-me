import { profile } from "@/data/profile";

export type GitHubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string | null;
};

export type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
};

export type GitHubFetchResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; status?: number };

const USER_AGENT = "fattah-dev-portfolio";

async function githubFetch<T>(url: string): Promise<GitHubFetchResult<T>> {
  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": USER_AGENT,
      },
      next: { revalidate: 3600 },
    });

    if (res.status === 403) {
      return {
        ok: false,
        error: "GitHub rate limit reached. Try again later or use Refresh.",
        status: 403,
      };
    }

    if (!res.ok) {
      return {
        ok: false,
        error: `GitHub API error (${res.status}).`,
        status: res.status,
      };
    }

    const data = (await res.json()) as T;
    return { ok: true, data };
  } catch {
    return { ok: false, error: "Network error while contacting GitHub." };
  }
}

export async function fetchGitHubProfile(): Promise<GitHubFetchResult<GitHubUser>> {
  return githubFetch<GitHubUser>(
    `https://api.github.com/users/${profile.githubUsername}`
  );
}

export async function fetchGitHubRepos(): Promise<GitHubFetchResult<GitHubRepo[]>> {
  return githubFetch<GitHubRepo[]>(
    `https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=6`
  );
}

export async function fetchGitHubDashboard() {
  const [user, repos] = await Promise.all([
    fetchGitHubProfile(),
    fetchGitHubRepos(),
  ]);

  return { user, repos };
}
