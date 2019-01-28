import { removeBackgroundFromImageFile, RemoveBgError } from "remove.bg";
import { RemoveBgResult } from "../index";

const apiKeyFile = require("./_test_apikey.json");
if (!apiKeyFile || !apiKeyFile.apiKey) {
  throw new Error("No apikey found");
}

async function removeBgFromLocalFile(path) {
  const outputFile = `${__dirname}/out/img-removed-from-file.png`;
  removeBackgroundFromImageFile({
    path,
    apiKey: apiKeyFile.apiKey,
    size: "regular",
    outputFile
  }).then((result: RemoveBgResult) => {
    console.log(`File saved to ${outputFile}`);
    console.log(result.base64img.substring(0, 40) + "..");
  }).catch((errors: Array<RemoveBgError>) => {
    console.log(JSON.stringify(errors));
  });

  return null;
}

removeBgFromLocalFile("./examples/testfiles/trump-large.jpg");
