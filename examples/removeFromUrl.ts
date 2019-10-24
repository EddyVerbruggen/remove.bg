import { RemoveBgError, removeBackgroundFromImageUrl } from "remove.bg";

const apiKeyFile = require("./_test_apikey.json");
if (!apiKeyFile || !apiKeyFile.apiKey) {
  throw new Error("No apikey found");
}

async function removeFromImgUrl(url) {
  try {
    const outputFile = `${__dirname}/out/img-removed-from-url.png`;
    const result = await removeBackgroundFromImageUrl({
      url,
      apiKey: apiKeyFile.apiKey,
      size: "regular",
      type: "product",
      outputFile
    });

    console.log(`File saved to ${outputFile}`);
    console.log(`${result.creditsCharged} credit(s) charged for this image`);
    console.log(`Result width x height: ${result.resultWidth} x ${result.resultHeight}, type: ${result.detectedType}`);
    console.log(result.base64img.substring(0, 40) + "..");
    console.log(`Rate limit: ${result.rateLimit}, remaining: ${result.rateLimitRemaining}, reset: ${result.rateLimitReset}, retryAfter: ${result.retryAfter}`);
  } catch (e) {
    const errors: Array<RemoveBgError> = e;
    console.log(JSON.stringify(errors));
  }
  return null;
}

// removeFromImgUrl("https://samarew.com/wp-content/uploads/2018/05/obama2.jpg");
removeFromImgUrl("https://www.ikea.com/ca/en/images/products/ypperlig-vase-brown__0505227_PE633784_S4.JPG");
