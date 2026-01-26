import { redirect } from "react-router";
import type { Route } from "./+types/go";

export function loader({ request }: Route.LoaderArgs) {
  const appUrl = process.env.APP_URL ?? "";

  if (!appUrl) {
    throw new Response("App URL not configured", { status: 500 });
  }

  // The ref param is captured by analytics when they visit /go?ref=hero
  // We just redirect to the app
  return redirect(appUrl);
}
