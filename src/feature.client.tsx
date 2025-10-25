import {
	createClientFeature,
	toolbarFeatureButtonsGroupWithItems,
} from "@payloadcms/richtext-lexical/client";

import { Button } from "./ui/Button";

export const TextSizeFeatureClient = createClientFeature({
	toolbarFixed: {
		groups: [
			toolbarFeatureButtonsGroupWithItems([
				{
					key: "textSize",
					label: "Pick the size",
					order: 1,
					Component: Button,
				},
			]),
		],
	},
	toolbarInline: {
		groups: [
			toolbarFeatureButtonsGroupWithItems([
				{
					key: "textSize",
					label: "Pick the size",
					order: 1,
					Component: Button,
				},
			]),
		],
	},
});
