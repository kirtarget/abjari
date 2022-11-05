import type { AppRouter } from "./routers/_app";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { getBaseUrl } from "../utils/trpc";

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});
