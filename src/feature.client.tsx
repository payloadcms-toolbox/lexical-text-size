import {
	createClientFeature,
	toolbarFeatureButtonsGroupWithItems,
} from "@payloadcms/richtext-lexical/client";

import type { TextSizeClientFeatureProps } from "./types";
import { Button } from "./ui/Button";

export const TextSizeFeatureClient =
	createClientFeature<TextSizeClientFeatureProps>(({ props }) => {
		// Props are already validated and defaulted by server feature
		const { sizes, defaultSize } = props;

		// Create a wrapper component that passes sizes and defaultSize to Button
		const ButtonWithProps = (buttonProps: {
			editor: any;
			anchorElem?: any;
			active?: boolean;
			enabled?: boolean;
		}) => {
			return (
				<Button {...buttonProps} sizes={sizes} defaultSize={defaultSize} />
			);
		};

		return {
			toolbarFixed: {
				groups: [
					toolbarFeatureButtonsGroupWithItems([
						{
							key: "textSize",
							label: "Text size",
							order: 1,
							Component: ButtonWithProps,
						},
					]),
				],
			},
			toolbarInline: {
				groups: [
					toolbarFeatureButtonsGroupWithItems([
						{
							key: "textSize",
							label: "Text size",
							order: 1,
							Component: ButtonWithProps,
						},
					]),
				],
			},
		};
	});
