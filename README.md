# [remove.bg](https://www.remove.bg) API wrapper for Node.js

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Twitter Follow][twitter-image]][twitter-url]

[npm-image]:http://img.shields.io/npm/v/remove.bg.svg
[npm-url]:https://npmjs.org/package/remove.bg
[downloads-image]:http://img.shields.io/npm/dm/remove.bg.svg
[twitter-image]:https://img.shields.io/twitter/follow/eddyverbruggen.svg?style=social&label=Follow%20me
[twitter-url]:https://twitter.com/eddyverbruggen

<img src="https://github.com/EddyVerbruggen/remove.bg/raw/master/media/remove.bg.promo.jpg" width="600px" height="400px" />

The **AWESOME** remove.bg API is quite easy to use, but it can always be easier - that's where this package comes in.

## Requirements
Get your API key from the [remove.bg website](https://www.remove.bg/api).
At the moment it's early access, so it may take some time to get yours.

## Installation

```bash
npm i remove.bg
```

## Examples
Look at the various `removeFrom*.ts` files in the [examples folder](/examples), or check out the snippets below.

Curious how to use `async/await`? That's another reason to check out those examples.

## API
The common **input parameters** of all three currently supported `removeBackgroundFrom*` functions are:

| Property | Mandatory | Type | Description |
| --- | --- | --- | --- |
| apiKey | Y | `string` | The API key you got from the [remove.bg website](https://www.remove.bg/api). |
| size | N | `"regular"` / `"medium"` / `"hd"` / `"4k"` | The returned size of the image. The cheaper `"regular"` option is default. |
| type | N | `"auto"` / `"person"` / `"product"` | Help the API a little by telling the type of image you want to extract the background from. Default `"auto"`. |
| outputFile | N | `string` | The path to save the returned file to. |

And the **output properties** are:

| Property  | Type | Description |
| --- | --- | --- |
| base64img | `string` | Base64 encoded representation of the returned image.
| creditsCharged | `number` | Amount of credits charged for this call, based on the output size of the response.
| detectedType | `string` | Either a `person` or a `product`.
| resultWidth | `number` | The width of the result image, in pixels.
| resultHeight | `number` | The height of the result image, in pixels.

### `removeBackgroundFromImageFile`
Remove the background from a local file.

```typescript
import { RemoveBgResult, RemoveBgError, removeBackgroundFromImageFile } from "remove.bg";

const localFile = "./local/file/name.jpg";
const outputFile = `${__dirname}/out/img-removed-from-file.png`;

removeBackgroundFromImageFile({
  path: localFile,
  apiKey: "YOUR-API-KEY",
  size: "regular",
  type: "auto",
  outputFile
}).then((result: RemoveBgResult) => {
 console.log(`File saved to ${outputFile}`);
  const base64img = result.base64img;
}).catch((errors: Array<RemoveBgError>) => {
 console.log(JSON.stringify(errors));
});
```

### `removeBackgroundFromImageUrl`
Remove the background from a remote file (URL).

```typescript
import { RemoveBgResult, RemoveBgError, removeBackgroundFromImageUrl } from "remove.bg";

const url = "https://domain.tld/path/file.jpg";
const outputFile = `${__dirname}/out/img-removed-from-file.png`;

removeBackgroundFromImageUrl({
  url,
  apiKey: "YOUR-API-KEY",
  size: "regular",
  type: "person",
  outputFile
}).then((result: RemoveBgResult) => {
 console.log(`File saved to ${outputFile}`);
  const base64img = result.base64img;
}).catch((errors: Array<RemoveBgError>) => {
 console.log(JSON.stringify(errors));
});
```

### `removeBackgroundFromImageBase64`
Remove the background from a base64 encoded file.

```typescript
import { RemoveBgResult, RemoveBgError, removeBackgroundFromImageBase64 } from "remove.bg";
import * as fs from "fs";

const localFile = "./local/file/name.jpg";
const base64img = fs.readFileSync(localFile, { encoding: "base64" });
const outputFile = `${__dirname}/out/img-removed-from-file.png`;

removeBackgroundFromImageBase64({
  base64img,
  apiKey: "YOUR-API-KEY",
  size: "regular",
  type: "product",
  outputFile
}).then((result: RemoveBgResult) => {
 console.log(`File saved to ${outputFile}`);
  const base64img = result.base64img;
}).catch((errors: Array<RemoveBgError>) => {
 console.log(JSON.stringify(errors));
});
```
