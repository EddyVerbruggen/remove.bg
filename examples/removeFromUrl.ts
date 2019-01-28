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

removeFromImgUrl("https://firebasestorage.googleapis.com/v0/b/foorball-player-ratings.appspot.com/o/profilepics%2FEcyn4Sf4iZfuExtPGWfXyyu4sGE3.jpg?alt=media&token=1b7f429a-71fc-49dd-9103-96ef87941d75");
