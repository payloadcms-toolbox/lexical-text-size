# lexical-text-size

[![npm version](https://badge.fury.io/js/@payloadcms-toolbox%2Flexical-text-size.svg)](https://badge.fury.io/js/@payloadcms-toolbox%2Flexical-text-size)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/@payloadcms-toolbox/lexical-text-size.svg)](https://www.npmjs.com/package/@payloadcms-toolbox/lexical-text-size)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A powerful, type-safe text size management feature for [Lexical](https://lexical.dev/) editors in [Payload CMS](https://payloadcms.com/). Provides an intuitive toolbar control for adjusting text sizes with full HTML/CSS conversion support.

## Table of Contents

- [The Problem](#the-problem)
- [This Solution](#this-solution)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
  - [Global Configuration](#global-configuration)
  - [Per-Field Configuration](#per-field-configuration)
- [Configuration Options](#configuration-options)
- [API Reference](#api-reference)
- [Customization](#customization)
  - [Custom Size Values](#custom-size-values)
  - [CSS Styling](#css-styling)
- [TypeScript](#typescript)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## The Problem

When building content management systems with Payload CMS and Lexical:

- **Inconsistent sizing**: Text size controls are not available out-of-the-box in Lexical
- **Poor user experience**: Content editors need an intuitive way to adjust text sizes without writing HTML
- **Maintenance overhead**: Implementing custom text sizing requires understanding Lexical's complex node system
- **HTML conversion**: Converting between Lexical's internal format and HTML with proper size attributes is non-trivial
- **TypeScript complexity**: Setting up proper types for custom Lexical features requires deep framework knowledge

## This Solution

`lexical-text-size` provides a **production-ready, plug-and-play solution** that:

✅ Integrates seamlessly with Payload CMS's Lexical editor  
✅ Adds a toolbar button for text size selection  
✅ Supports custom size values (predefined or custom)  
✅ Handles HTML/Markdown conversion automatically  
✅ Fully typed with TypeScript  
✅ Works with Lexical's undo/redo system  
✅ Follows Payload CMS [Custom Features](https://payloadcms.com/docs/rich-text/custom-features) best practices

## Features

- 🎨 **Visual Toolbar Control**: Easy-to-use dropdown in the Lexical toolbar
- 🔧 **Fully Customizable**: Define your own size values and labels
- 📝 **HTML/Markdown Support**: Automatic conversion to and from HTML/Markdown
- 🌐 **i18n Ready**: Built-in internationalization support
- ⚡ **Performance Optimized**: Lazy-loaded components for minimal bundle size
- 🔒 **Type-Safe**: Full TypeScript definitions included
- ♿ **Accessible**: ARIA-compliant UI components
- 🎯 **Server & Client Features**: Follows Payload CMS architecture patterns

## Requirements

- **@payloadcms/richtext-lexical**: `^3.0.0`
- **React**: `>= 19.0.0`
- **Node.js**: `>= 18.0.0` (recommended)

## Installation

```bash
npm install @payloadcms-toolbox/lexical-text-size
```

```bash
yarn add @payloadcms-toolbox/lexical-text-size
```

```bash
pnpm add @payloadcms-toolbox/lexical-text-size
```

### Peer Dependencies

This package has the following peer dependencies (usually already installed with Payload CMS):

```json
{
  "@payloadcms/richtext-lexical": "^3",
  "react": ">=19"
}
```

## Usage

### Global Configuration

Configure the text size feature globally for **all** rich text fields in your `payload.config.ts`:

```ts
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { TextSizeFeature } from '@payloadcms-toolbox/lexical-text-size'
import { buildConfig } from 'payload'

export default buildConfig({
  // ... other config
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      TextSizeFeature({
        sizes: ['small', 'normal', 'large', 'x-large'],
        defaultSize: 'normal'
      })
    ]
  }),
  // ... rest of config
})
```

### Per-Field Configuration

Add the text size feature to **specific** rich text fields:

```ts
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { TextSizeFeature } from '@payloadcms-toolbox/lexical-text-size'

export const Pages = {
  slug: 'pages',
  fields: [
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          TextSizeFeature({
            sizes: ['small', 'normal', 'large', 'x-large'],
            defaultSize: 'normal'
          })
        ]
      })
    }
  ]
}
```

## Configuration Options

The `TextSizeFeature` function accepts a configuration object with the following options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `sizes` | `string[]` | `['small', 'normal', 'large']` | Array of available text sizes shown in the dropdown |
| `defaultSize` | `string` | `'normal'` | Default size applied to text. Must be one of the values in `sizes` |
| `labels` | `Record<string, string>` | Auto-generated | Custom labels for size options in the UI |
| `customSizeMap` | `Record<string, string>` | See below | Map size names to CSS values (font-size) |

### Default Size Mapping

By default, sizes are mapped to CSS values as follows:

```ts
{
  'x-small': '0.75rem',   // 12px
  'small': '0.875rem',    // 14px
  'normal': '1rem',       // 16px
  'medium': '1.125rem',   // 18px
  'large': '1.25rem',     // 20px
  'x-large': '1.5rem',    // 24px
  'xx-large': '2rem'      // 32px
}
```

## API Reference

### `TextSizeFeature(options?)`

Creates a text size feature for the Lexical editor.

**Parameters:**
- `options` (optional): Configuration object

**Returns:** Lexical feature that can be passed to the `features` array

**Example:**
```ts
TextSizeFeature({
  sizes: ['small', 'medium', 'large'],
  defaultSize: 'medium'
})
```

### `setTextSize(editor, size)`

Programmatically set text size for the current selection.

**Parameters:**
- `editor`: `LexicalEditor` - The Lexical editor instance
- `size`: `string` - Size value from your configured sizes

**Example:**
```ts
import { setTextSize } from '@payloadcms-toolbox/lexical-text-size'

// In a custom command or plugin
setTextSize(editor, 'large')
```

### `getTextSize(editor)`

Get the current text size of the selection.

**Parameters:**
- `editor`: `LexicalEditor` - The Lexical editor instance

**Returns:** `string | null` - Current size or null if no size is set

**Example:**
```ts
import { getTextSize } from '@payloadcms-toolbox/lexical-text-size'

const currentSize = getTextSize(editor)
console.log(currentSize) // 'large'
```

## Customization

### Custom Size Values

Define your own custom sizes with specific CSS values:

```ts
TextSizeFeature({
  sizes: ['tiny', 'base', 'huge'],
  defaultSize: 'base',
  customSizeMap: {
    'tiny': '0.625rem',    // 10px
    'base': '1rem',        // 16px
    'huge': '3rem'         // 48px
  },
  labels: {
    'tiny': 'Tiny Text',
    'base': 'Normal',
    'huge': 'Huge Title'
  }
})
```

### CSS Styling

The text size feature applies inline styles by default, but you can override them with CSS:

```css
/* Target specific sizes */
[data-text-size="small"] {
  font-size: 0.875rem;
  line-height: 1.4;
}

[data-text-size="large"] {
  font-size: 1.5rem;
  line-height: 1.6;
  font-weight: 600;
}

/* Responsive sizing */
@media (max-width: 768px) {
  [data-text-size="x-large"] {
    font-size: 1.25rem;
  }
}
```

### HTML Output

Text with custom sizes is rendered as:

```html
<span style="font-size: 1.5rem;">Large text</span>
```

Or with custom data attributes:

```html
<span data-text-size="large">Large text</span>
```

## TypeScript

This package is written in TypeScript and provides full type definitions.

### Type Imports

```ts
import type { 
  TextSizeFeatureProps,
  TextSizeOptions,
  SizeValue 
} from '@payloadcms-toolbox/lexical-text-size'
```

### Type-Safe Configuration

```ts
import { TextSizeFeature } from '@payloadcms-toolbox/lexical-text-size'
import type { TextSizeOptions } from '@payloadcms-toolbox/lexical-text-size'

const config: TextSizeOptions = {
  sizes: ['small', 'normal', 'large'],
  defaultSize: 'normal'
}

TextSizeFeature(config)
```

### Custom Types

If you extend the feature with custom sizes:

```ts
type CustomSize = 'tiny' | 'small' | 'base' | 'large' | 'huge'

const config = {
  sizes: ['tiny', 'small', 'base', 'large', 'huge'] as const,
  defaultSize: 'base' as const
}
```

## Troubleshooting

### Feature not appearing in toolbar

**Problem:** The text size button doesn't show up in the editor toolbar.

**Solution:**
1. Ensure you're using Payload CMS >= 3.0.0
2. Check that the feature is added to the `features` array
3. Verify that `@payloadcms/richtext-lexical` is installed
4. Clear your build cache: `rm -rf .next` or `rm -rf dist`

### Sizes not applying correctly

**Problem:** Selecting a size doesn't change the text appearance.

**Solution:**
1. Check your CSS for conflicting `font-size` rules
2. Use browser DevTools to inspect the applied styles
3. Ensure your `customSizeMap` values are valid CSS
4. Check console for any JavaScript errors

### TypeScript errors

**Problem:** Type errors when using the feature.

**Solution:**
```bash
# Ensure types are properly installed
npm install --save-dev @types/react

# Clear TypeScript cache
rm -rf node_modules/.cache
```

### Build errors with Next.js

**Problem:** "Module not found" or SSR errors.

**Solution:**
```js
// next.config.js
module.exports = {
  transpilePackages: ['@payloadcms-toolbox/lexical-text-size']
}
```

## FAQ

### Can I use this with Lexical outside of Payload CMS?

Currently, this package is specifically designed for Payload CMS's Lexical integration. For standalone Lexical, you would need to adapt the feature implementation.

### How do I migrate from an older rich text editor?

The package includes migration utilities. See the [migration guide](./docs/MIGRATION.md) for details.

### Can I use rem, px, em, or other CSS units?

Yes! The `customSizeMap` accepts any valid CSS font-size value:

```ts
customSizeMap: {
  'small': '14px',
  'medium': '1.2em',
  'large': '2rem'
}
```

### Does this work with dark mode?

Yes, the feature respects Payload CMS's theme settings automatically.

### How do I localize the size labels?

Use the `labels` option or integrate with Payload's i18n system:

```ts
TextSizeFeature({
  sizes: ['small', 'large'],
  labels: {
    'small': t('sizes.small'),
    'large': t('sizes.large')
  }
})
```

## Examples

See the [`/examples`](./examples) directory for complete working examples:

- [Basic Usage](./examples/basic)
- [Custom Sizes](./examples/custom-sizes)
- [Global Configuration](./examples/global-config)
- [Per-Field Configuration](./examples/per-field)
- [Advanced Customization](./examples/advanced)

## Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) first.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/payloadcms-toolbox/lexical-text-size.git
cd lexical-text-size

# Install dependencies (using pnpm)
pnpm install

# Build the project
pnpm run build

# Development mode with watch
pnpm run dev
```

### Available Scripts

```bash
pnpm run build  # Build the project with tsup
pnpm run dev    # Development mode with watch
```

## License

MIT © [Evgenii Troinov](./LICENSE)

---

Made with ❤️ for the [Payload CMS](https://payloadcms.com/) community

## Links

- [Documentation](https://github.com/payloadcms-toolbox/lexical-text-size#readme)
- [Issue Tracker](https://github.com/payloadcms-toolbox/lexical-text-size/issues)
- [NPM Package](https://www.npmjs.com/package/@payloadcms-toolbox/lexical-text-size)
- [Payload CMS](https://payloadcms.com/)
- [Lexical](https://lexical.dev/)
