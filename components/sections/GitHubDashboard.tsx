import Image from "next/image";
import Link from "next/link";
import { profile } from "@/data/profile";
import { fetchGitHubDashboard } from "@/lib/github";
import { formatGitHubDate } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { GitHubRefresh } from "@/components/sections/GitHubRefresh";
import { Reveal } from "@/components/ui/Reveal";

function StatBlock({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="theme-transition brutal-border bg-card p-4">
      <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/60">
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

function SkeletonDashboard() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-32 brutal-border bg-foreground/5" />
      <div className="grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 brutal-border bg-foreground/5" />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 brutal-border bg-foreground/5" />
        ))}
      </div>
    </div>
  );
}

export async function GitHubDashboard() {
  const { user, repos } = await fetchGitHubDashboard();

  const userError = !user.ok ? user.error : null;
  const reposError = !repos.ok ? repos.error : null;
  const totalFailure = userError && reposError;

  return (
    <section
      id="github"
      className="scroll-mt-[5.5rem] border-b-[2.5px] border-border grid-paper py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading label="04 / GITHUB ACTIVITY" title="Open Source Pulse" />

        {totalFailure ? (
          <Reveal>
            <div className="brutal-border brutal-shadow bg-pink/30 p-6 md:p-8">
              <p className="font-bold uppercase">Could not load GitHub data</p>
              <p className="mt-2 text-sm text-foreground/80">
                {userError ?? reposError}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase text-foreground/60">
                Contribution heatmap omitted (no public API without auth). Repository
                activity shown when the API responds.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <GitHubRefresh />
                <Button href={profile.github} external variant="purple">
                  VISIT GITHUB ↗
                </Button>
              </div>
            </div>
          </Reveal>
        ) : null}

        {user.ok ? (
          <div className="space-y-8">
            <Reveal>
              <div className="theme-transition brutal-border brutal-shadow flex flex-col gap-6 bg-card p-6 md:flex-row md:items-center md:p-8">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden brutal-border">
                  <Image
                    src={user.data.avatar_url}
                    alt={`${user.data.login} GitHub avatar`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-mono text-xs uppercase tracking-widest text-purple">
                    @{user.data.login}
                  </p>
                  <h3 className="mt-1 text-2xl font-bold uppercase">
                    {user.data.name ?? user.data.login}
                  </h3>
                  {user.data.bio ? (
                    <p className="mt-2 max-w-2xl text-sm text-foreground/80">
                      {user.data.bio}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button href={user.data.html_url} external variant="purple">
                    VISIT GITHUB ↗
                  </Button>
                  <Button
                    href={`${user.data.html_url}?tab=repositories`}
                    external
                    variant="lime"
                  >
                    VIEW REPOSITORIES ↗
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <StatBlock label="Public repos" value={user.data.public_repos} />
                <StatBlock label="Followers" value={user.data.followers} />
                <StatBlock label="Following" value={user.data.following} />
                <StatBlock
                  label="Activity view"
                  value="Repos"
                />
              </div>
              <p className="mt-3 font-mono text-[10px] text-foreground/50">
                Counts from GitHub API (cached ~1h). Heatmap not shown.
              </p>
            </Reveal>

            {repos.ok ? (
              <Reveal delay={0.1}>
                <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.2em]">
                  Recently updated repositories
                </h4>
                {repos.data.length === 0 ? (
                  <div className="brutal-border bg-lime/20 p-8 text-center font-mono text-sm uppercase">
                    No public repositories returned.
                  </div>
                ) : (
                  <ul className="grid gap-4 md:grid-cols-2">
                    {repos.data
                      .filter((r) => !r.fork)
                      .map((repo) => (
                        <li key={repo.id}>
                          <Link
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="theme-transition block h-full brutal-border brutal-shadow bg-card p-5 transition-transform hover:-translate-y-1 focus-brutal"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <p className="font-bold uppercase">{repo.name}</p>
                              <span className="font-mono text-[10px] text-foreground/60">
                                ★ {repo.stargazers_count}
                              </span>
                            </div>
                            {repo.description ? (
                              <p className="mt-2 line-clamp-2 text-sm text-foreground/80">
                                {repo.description}
                              </p>
                            ) : (
                              <p className="mt-2 text-sm italic text-foreground/50">
                                No description provided.
                              </p>
                            )}
                            <div className="mt-4 flex flex-wrap gap-3 font-mono text-[10px] uppercase text-foreground/60">
                              {repo.language ? <span>{repo.language}</span> : null}
                              <span>Updated {formatGitHubDate(repo.updated_at)}</span>
                            </div>
                          </Link>
                        </li>
                      ))}
                  </ul>
                )}
              </Reveal>
            ) : (
              <Reveal delay={0.1}>
                <div className="brutal-border bg-pink/20 p-6">
                  <p className="font-bold uppercase">Repositories unavailable</p>
                  <p className="mt-2 text-sm text-foreground/80">{reposError}</p>
                  <div className="mt-4">
                    <GitHubRefresh />
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        ) : userError && !totalFailure ? (
          <Reveal>
            <div className="brutal-border brutal-shadow bg-pink/30 p-6">
              <p className="font-bold uppercase">Profile unavailable</p>
              <p className="mt-2 text-sm">{userError}</p>
              <div className="mt-4 flex gap-3">
                <GitHubRefresh />
                <Button href={profile.github} external variant="purple">
                  VISIT GITHUB ↗
                </Button>
              </div>
            </div>
          </Reveal>
        ) : !user.ok && !userError ? (
          <SkeletonDashboard />
        ) : null}
      </div>
    </section>
  );
}
