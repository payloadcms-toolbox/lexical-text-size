import { createServerFeature } from "@payloadcms/richtext-lexical";
import type { TextSizeClientFeatureProps, TextSizeFeatureProps } from "./types";
import { DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZES } from "./utils/constants";

export const TextSizeFeature = createServerFeature<
	TextSizeFeatureProps,
	TextSizeClientFeatureProps,
	TextSizeClientFeatureProps
>({
	key: "textSize",
	feature: ({ props }) => {
		// Provide defaults following Payload CMS patterns
		const sizes = props?.sizes || DEFAULT_FONT_SIZES;
		const defaultSize = props?.defaultSize || sizes[0];

		// Validate defaultSize is in sizes array
		if (!sizes.includes(defaultSize)) {
			console.warn(
				`TextSizeFeature: defaultSize "${defaultSize}" is not in sizes array. Using first size "${sizes[0]}".`,
			);
		}

		// Ensure sizes array is not empty
		if (sizes.length === 0) {
			console.warn(
				"TextSizeFeature: sizes array is empty. Using default sizes.",
			);
			return {
				ClientFeature:
					"@payloadcms-toolbox/lexical-text-size/dist/feature.client#TextSizeFeatureClient",
				clientFeatureProps: {
					sizes: DEFAULT_FONT_SIZES,
					defaultSize: DEFAULT_FONT_SIZE,
				},
			};
		}

		return {
			ClientFeature:
				"@payloadcms-toolbox/lexical-text-size/dist/feature.client#TextSizeFeatureClient",
			clientFeatureProps: {
				sizes,
				defaultSize: sizes.includes(defaultSize) ? defaultSize : sizes[0],
			},
		};
	},
});
