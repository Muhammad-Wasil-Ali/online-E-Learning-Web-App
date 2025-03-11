import path from "path";
import ffmpeg from "fluent-ffmpeg";
import cloudinary from "../cloudinary/cloudinary.js";

export const processVideo = async (inputPath, outputPath) => {
  const hlsPath = path.join(outputPath, "index.m3u8");
  await new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        "-codec:v",
        "libx264",
        "-codec:a",
        "aac",
        "-hls_time",
        "10",
        "-hls_playlist_type",
        "vod",
        `-hls_segment_filename`,
        `${outputPath}/segment%03d.ts`,
      ])
      .output(hlsPath)
      .on("end", () => {
        console.log("Video Processing Finished");

        resolve(hlsPath);
      })
      .on("error", (err) => {
        console.log("FFmpeg Error");
        reject(hlsPath);
      })
      .run();
  });

  return hlsPath;
};
