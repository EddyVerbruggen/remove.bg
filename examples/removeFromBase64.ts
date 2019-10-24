import * as fs from "fs";
import { RemoveBgError, removeBackgroundFromImageBase64 } from "remove.bg";

const apiKeyFile = require("./_test_apikey.json");
if (!apiKeyFile || !apiKeyFile.apiKey) {
  throw new Error("No apikey found");
}

async function removeBgFromBase64(path) {
  try {

    const outputFile = `${__dirname}/out/img-removed-from-base64.png`;
    const base64img = fs.readFileSync(path, { encoding: "base64" });
    const result = await removeBackgroundFromImageBase64({
      base64img,
      apiKey: apiKeyFile.apiKey,
      size: "regular",
      outputFile
    });

    console.log(`File saved to ${outputFile}`);
    console.log(`${result.creditsCharged} credit(s) charged for this image`);
    console.log(`Result width x height: ${result.resultWidth} x ${result.resultHeight}, type: ${result.detectedType}`);
    console.log(result.base64img.substring(0, 40) + "..");
  } catch (e) {
    const errors: Array<RemoveBgError> = e;
    console.log("Error: " + JSON.stringify(errors));
  }
  return null;
}

removeBgFromBase64("./examples/testfiles/trump-small.jpg");
