"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/Button";

export function GitHubRefresh() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <Button
      variant="outline"
      onClick={() => startTransition(() => router.refresh())}
      ariaLabel="Retry loading GitHub data"
    >
      {pending ? "REFRESHING..." : "RETRY ↻"}
    </Button>
  );
}
