import { removeBackgroundFromImageFile, RemoveBgError } from "remove.bg";
import { RemoveBgResult } from "../index";

const apiKeyFile = require("./_test_apikey.json");
if (!apiKeyFile || !apiKeyFile.apiKey) {
  throw new Error("No apikey found");
}

async function removeBgFromLocalFile(path) {
  const outputFile = `${__dirname}/out/img-removed-from-file-with-crop-and-scale.png`;
  removeBackgroundFromImageFile({
    path,
    outputFile,
    apiKey: apiKeyFile.apiKey,
    size: "regular",
    type: "person",
    crop: true,
    crop_margin: "30px",
    scale: "70%"
  }).then((result: RemoveBgResult) => {
    console.log(`File saved to ${outputFile}`);
    console.log(`${result.creditsCharged} credit(s) charged for this image`);
    console.log(`Result width x height: ${result.resultWidth} x ${result.resultHeight}, type: ${result.detectedType}`);
    console.log(result.base64img.substring(0, 40) + "..");
  }).catch((errors: Array<RemoveBgError>) => {
    console.log(JSON.stringify(errors));
  });

  return null;
}

removeBgFromLocalFile("./examples/testfiles/trump-small.jpg");
