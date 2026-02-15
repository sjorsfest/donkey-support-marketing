import { redirect } from "react-router";
import type { Route } from "./+types/go";

export function loader({ request }: Route.LoaderArgs) {
  const appUrl = process.env.APP_URL ?? ""; // https://app.donkey.support

  const url = new URL(request.url);
  const ref = url.searchParams.get("ref");

  console.log("Redirecting to app", { ref });

  if (!appUrl) {
    throw new Response("App URL not configured", { status: 500 });
  }

  // Preserve attribution/query params for downstream conversion tracking.
  const targetUrl = new URL(appUrl);
  for (const [key, value] of url.searchParams.entries()) {
    targetUrl.searchParams.append(key, value);
  }

  return redirect(targetUrl.toString());
}
