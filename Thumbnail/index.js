import ytdl from 'ytdl-core';
import fs from 'fs'
const videoId = 'https://www.youtube.com/watch?v=2rOnvgFyPgw';
import {__dirname} from './app.js'

// Get video info from YouTube
ytdl.getInfo(videoId).then((info) => {
  // Select the video format and quality
  const format = ytdl.chooseFormat(info.formats,{quality:"lowest"});
  // Create a write stream to save the video file
  // const outputFilePath = `${info.videoDetails.title}.${videoFormat.container}`;
  const outputFilePath = __dirname + '../images';
  const outputStream = fs.createWriteStream(outputFilePath);
  // Download the video file
  ytdl.downloadFromInfo(info, { format: format }).pipe(outputStream);
  // When the download is complete, show a message
  outputStream.on('finish', () => {
    console.log(`Finished downloading: ${outputFilePath}`);
  });
}).catch((err) => {
  console.error(err);
});

// const format = ytdl.chooseFormat(info.formats,{quality:"248"});