# lexical-text-size

[![npm version](https://badge.fury.io/js/lexical-text-size.svg)](https://badge.fury.io/js/lexical-text-size)

A utility for managing text size in [Lexical](https://lexical.dev/) editors, designed for use with [Payload CMS](https://payloadcms.com/).

## Table of Contents

- [The Problem](#the-problem)
- [This Solution](#this-solution)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## The Problem

Managing text size in rich text editors can be inconsistent and difficult to maintain, especially when integrating with Payload CMS and Lexical.

## This Solution

`lexical-text-size` provides a simple, consistent API for controlling text size in Lexical editors, making it easy to integrate with Payload CMS and customize to your needs.

## Installation

```bash
npm install lexical-text-size
```

or

```bash
yarn add lexical-text-size
```

## Usage

```js
import { TextSizePlugin } from 'lexical-text-size';

// ...existing code...
<TextSizePlugin sizes={['small', 'medium', 'large']} />
// ...existing code...
```

## API

### `<TextSizePlugin />`

Props:

- `sizes`: `string[]` — Array of available text sizes.
- `defaultSize`: `string` — Default text size.

### Utility Functions

- `setTextSize(size: string): void` — Sets the text size for the current selection.

## Examples

See [`/examples`](./examples) for usage examples.

## Contributing

Contributions are welcome! Please open issues or pull requests.

## License

MIT — see [LICENSE](./LICENSE)