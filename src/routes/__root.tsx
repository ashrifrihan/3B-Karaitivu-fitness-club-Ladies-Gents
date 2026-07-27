import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "3B Karaitivu Fitness Club | Best Gym in Karaitivu, Sri Lanka | Ladies & Gents" },
      {
        name: "description",
        content:
          "3B Karaitivu Fitness Club is Karaitivu's premier gym at 11 Main Street, Karaitivu (13250), Sri Lanka. Dedicated Ladies-only and Gents sections, personal training, cardio & strength training. Open daily 6:00-10:00 AM & 4:30-10:00 PM. Call 0672 050 465.",
      },
      {
        name: "keywords",
        content:
          "gym in Karaitivu, 3B fitness club, ladies gym Karaitivu, gents gym Sri Lanka, fitness club Karaitivu, personal trainer Karaitivu, weight training Karaitivu, cardio gym Sri Lanka, body shaping Karaitivu",
      },
      { name: "author", content: "3B Karaitivu Fitness Club" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "theme-color", content: "#0c0e12" },

      /* Geographic / GEO Meta Tags for Local & Geo Search */
      { name: "geo.region", content: "LK-52" },
      { name: "geo.placename", content: "Karaitivu, Ampara, Sri Lanka" },
      { name: "geo.position", content: "7.370929;81.841554" },
      { name: "ICBM", content: "7.370929, 81.841554" },

      /* OpenGraph / Social SEO */
      { property: "og:title", content: "3B Karaitivu Fitness Club | Ladies & Gents Gym in Karaitivu" },
      {
        property: "og:description",
        content:
          "Karaitivu's premier fitness club with fully separate Ladies & Gents sections. Personal coaching, free weights, cardio. Open daily from 6 AM.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.3bfitnessclub.com/" },
      { property: "og:site_name", content: "3B Karaitivu Fitness Club" },
      { property: "og:locale", content: "en_US" },
      { property: "og:image", content: "/logo.png" },
      { property: "og:image:width", content: "920" },
      { property: "og:image:height", content: "890" },
      { property: "og:image:alt", content: "3B Karaitivu Fitness Club Official Logo" },

      /* Twitter Cards */
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "3B Karaitivu Fitness Club | Ladies & Gents Gym" },
      {
        name: "twitter:description",
        content:
          "Karaitivu's premier gym with separate Ladies-only & Gents training zones. Open daily 6-10 AM & 4:30-10 PM.",
      },
      { name: "twitter:image", content: "/logo.png" },
    ],
    links: [
      { rel: "canonical", href: "https://www.3bfitnessclub.com/" },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/logo.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/logo.png" },
      // One self-hosted variable woff2 (latin subset), declared in styles.css —
      // no third-party preconnect or render-blocking stylesheet.
      {
        rel: "preload",
        href: "/fonts/inter-tight-latin-var.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
