import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityClient } from "@sanity/client";

export const sanClient: SanityClient = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(sanClient);

export const urlFor = (source: {
  _key: string;
  _type: string;
  asset: { _ref: string; _type: string };
}) => builder.image(source);
