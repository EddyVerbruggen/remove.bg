import * as fs from "fs";

const unirest = require("unirest");

const API_ENDPOINT = "https://api.remove.bg/v1.0/removebg";
const API_KEY_HEADER = "X-Api-Key";

interface RemoveBgOptions {
  apiKey: string;
  /**
   * Output resolution.
   * "regular" default (up to 0.25 megapixels), which costs 1 credit.
   * "medium" (up to 1.5 megapixels) costs 3.
   * "hd" (up to 4 megapixels) costs 5.
   * "4k" (up to 10 megapixels) costs 8.
   */
  size?: "regular" | "medium" | "hd" | "4k"
  outputFile?: string;
}

export interface RemoveBgUrlOptions extends RemoveBgOptions {
  url: string;
}

export interface RemoveBgBase64Options extends RemoveBgOptions {
  base64img: string;
}

export interface RemoveBgFileOptions extends RemoveBgOptions {
  path: string;
}

export interface RemoveBgResult {
  base64img: string;
  creditsCharged: number;
  resultWidth: number;
  resultHeight: number;
}

export interface RemoveBgError {
  title: string;
  detail: string;
}

export function removeBackgroundFromImageUrl(options: RemoveBgUrlOptions): Promise<RemoveBgResult> {
  return new Promise<RemoveBgResult>((resolve, reject) => {
    getPost(options)
        .header("Content-Type", "application/json")
        .send({
          "image_url": options.url,
          "size": options.size || "regular"
        })
        .end(result => processResult(result, options, resolve, reject));
  });
}

export async function removeBackgroundFromImageFile(options: RemoveBgFileOptions): Promise<RemoveBgResult> {
  return new Promise<RemoveBgResult>((resolve, reject) => {
    getPost(options)
        .field("size", options.size || "regular")
        .attach("image_file", fs.createReadStream(options.path))
        .end(result => processResult(result, options, resolve, reject));
  });
}

export function removeBackgroundFromImageBase64(options: RemoveBgBase64Options): Promise<RemoveBgResult> {
  return new Promise<RemoveBgResult>((resolve, reject) => {
    getPost(options)
        .header("Content-Type", "application/json")
        .send({
          "image_file_b64": options.base64img,
          "size": options.size || "regular"
        })
        .end(result => processResult(result, options, resolve, reject));
  });
}

function getPost(options: RemoveBgOptions): any {
  return unirest
      .post(API_ENDPOINT)
      .header(API_KEY_HEADER, options.apiKey)
      .header("Accept", "application/json");
}

async function processResult(result, options: RemoveBgOptions, resolve, reject) {
  if (result.status === 200) {
    if (options.outputFile) {
      fs.writeFileSync(options.outputFile, result.body.data.result_b64, {encoding: "base64"});
    }
    resolve(<RemoveBgResult>{
      base64img: result.body.data.result_b64,
      creditsCharged: result.headers["x-credits-charged"],
      resultWidth: result.headers["x-width"],
      resultHeight: result.headers["x-height"]
    });
  } else {
    reject(<Array<RemoveBgError>>(result.body.errors ? result.body.errors : result.body));
  }
}