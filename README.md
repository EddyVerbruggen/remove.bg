# [remove.bg](https://www.remove.bg) API wrapper for Node.js

The *AWESOME* remove.bg API quite easy to use, but it can always be easier - that's where this Node.js API wrapper comes in.

<img src="https://github.com/EddyVerbruggen/remove.bg/raw/master/media/remove.bg.promo.jpg" width="600px" height="400px" />

## Requirements
Get your API key from the [remove.bg website](https://www.remove.bg/api).
At the moment it's easly access, so it may tike some time to get yours.

## Installation

```bash
npm i remove.bg
```

## Examples
Look at the various `removeFrom*.ts` files in the [examples folder](/examples),
or check out the snippets below.

## API
The common input parameters of all three currently supported `removeBackgroundFrom*` functions are:

| Property | Mandatory | Type | Description |
| --- | --- | --- | --- |
| apiKey | Y | `string` | The API key you got from the [remove.bg website](https://www.remove.bg/api). |
| size | N | `"regular"` / `"hd"` | The returned size of the image. The cheaper `"regular"` option is default. |
| outputFile | N | `string` | The path to save the file returned by the API. |

And the output parameters are:

| Property  | Type | Description |
| --- | --- | --- |
| base64img | `string` | Base64 encoded representation of the returned image.

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
  outputFile
}).then((result: RemoveBgResult) => {
 console.log(`File saved to ${outputFile}`);
  const base64img = result.base64img;
}).catch((errors: Array<RemoveBgError>) => {
 console.log(JSON.stringify(errors));
});
```