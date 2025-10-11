import { createServerFeature } from "@payloadcms/richtext-lexical";

export const TextSizeFeature = createServerFeature({
  key: "textSize",
  feature: {
    ClientFeature:
      "@payloadcms-toolbox/lexical-text-size/dist/feature.client#TextSizeFeatureClient",
  },
});
