import { RemoveBgError, removeBackgroundFromImageFile } from "remove.bg";

const apiKeyFile = require("./_test_apikey.json");
if (!apiKeyFile || !apiKeyFile.apiKey) {
  throw new Error("No apikey found");
}

async function removeBgFromLocalFile(path) {
  try {
    const outputFile = `${__dirname}/out/img-removed-from-file.png`;
    const result = await removeBackgroundFromImageFile({
      path,
      apiKey: apiKeyFile.apiKey,
      size: "regular",
      outputFile
    });

    console.log(`File saved to ${outputFile}`);
    console.log(result.base64img.substring(0, 40) + "..");
  } catch (e) {
    const errors: Array<RemoveBgError> = e;
    console.log(JSON.stringify(errors));
  }
  return null;
}

removeBgFromLocalFile("./examples/testfiles/trump-large.jpg");
