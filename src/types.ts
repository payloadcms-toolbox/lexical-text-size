/**
 * Props for configuring the TextSize feature on the server side
 */
export interface TextSizeFeatureProps {
	/**
	 * Array of available text sizes (e.g., ['6px', '12px', '16px', '24px'])
	 * Must be valid CSS font-size values
	 * @default ['6px', '8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '40px', '48px', '56px', '64px', '72px']
	 */
	sizes?: string[];

	/**
	 * Default size to apply to text
	 * Must be one of the values in the sizes array
	 * @default First element of sizes array
	 */
	defaultSize?: string;
}

/**
 * Props passed to the client feature (validated and with defaults applied)
 */
export interface TextSizeClientFeatureProps {
	/**
	 * Array of available text sizes
	 */
	sizes: string[];

	/**
	 * Default size to apply to text
	 */
	defaultSize: string;
}
