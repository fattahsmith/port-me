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
    <div className="theme-transition brutal-border bg-card p-3 sm:p-4">
      <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/60">
        {label}
      </p>
      <p className="mt-1 text-xl font-bold sm:text-2xl">{value}</p>
    </div>
  );
}

function SkeletonDashboard() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-24 brutal-border bg-foreground/5 sm:h-28" />
      <div className="grid gap-3 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 brutal-border bg-foreground/5 sm:h-20" />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 brutal-border bg-foreground/5" />
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
        <SectionHeading label="04 / GITHUB" title="Open Source" />

        {totalFailure ? (
          <Reveal>
            <div className="brutal-border brutal-shadow bg-pink/30 p-6 md:p-8">
              <p className="font-bold uppercase">Could not load GitHub data</p>
              <p className="mt-2 text-sm text-foreground/80">
                {userError ?? reposError}
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
          <div className="space-y-6">
            {/* Profile card — compact */}
            <Reveal>
              <div className="theme-transition brutal-border brutal-shadow flex flex-col gap-4 bg-card p-5 sm:flex-row sm:items-center sm:p-6">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden brutal-border">
                  <Image
                    src={user.data.avatar_url}
                    alt={`${user.data.login} GitHub avatar`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-xs uppercase tracking-widest text-purple">
                    @{user.data.login}
                  </p>
                  <h3 className="mt-0.5 text-xl font-bold uppercase sm:text-2xl">
                    {user.data.name ?? user.data.login}
                  </h3>
                  {user.data.bio ? (
                    <p className="mt-1.5 line-clamp-2 text-sm text-foreground/80">
                      {user.data.bio}
                    </p>
                  ) : null}
                </div>
                <Button href={user.data.html_url} external variant="purple">
                  VIEW PROFILE ↗
                </Button>
              </div>
            </Reveal>

            {/* Stats — essential only */}
            <Reveal delay={0.05}>
              <div className="grid grid-cols-3 gap-3">
                <StatBlock label="Repos" value={user.data.public_repos} />
                <StatBlock label="Followers" value={user.data.followers} />
                <StatBlock label="Following" value={user.data.following} />
              </div>
            </Reveal>

            {/* Repositories — compact list */}
            {repos.ok ? (
              <Reveal delay={0.1}>
                {repos.data.length === 0 ? (
                  <div className="brutal-border bg-lime/20 p-8 text-center font-mono text-sm uppercase">
                    No public repositories.
                  </div>
                ) : (
                  <ul className="grid gap-3 md:grid-cols-2">
                    {repos.data
                      .filter((r) => !r.fork)
                      .slice(0, 6)
                      .map((repo) => (
                        <li key={repo.id}>
                          <Link
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="theme-transition block h-full brutal-border bg-card p-4 transition-transform hover:-translate-y-0.5 focus-brutal"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <p className="font-bold uppercase text-sm">
                                {repo.name}
                              </p>
                              <span className="font-mono text-[10px] text-foreground/60">
                                ★ {repo.stargazers_count}
                              </span>
                            </div>
                            {repo.description ? (
                              <p className="mt-1.5 line-clamp-2 text-xs text-foreground/80">
                                {repo.description}
                              </p>
                            ) : null}
                            <div className="mt-3 flex flex-wrap gap-2 font-mono text-[10px] uppercase text-foreground/60">
                              {repo.language ? <span>{repo.language}</span> : null}
                              <span>· {formatGitHubDate(repo.updated_at)}</span>
                            </div>
                          </Link>
                        </li>
                      ))}
                  </ul>
                )}
              </Reveal>
            ) : (
              <Reveal delay={0.1}>
                <div className="brutal-border bg-pink/20 p-5">
                  <p className="font-bold uppercase text-sm">
                    Repositories unavailable
                  </p>
                  <p className="mt-1.5 text-xs text-foreground/80">{reposError}</p>
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
