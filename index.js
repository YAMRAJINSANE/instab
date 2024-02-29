require("dotenv").config();

const fs = require("fs");
const { IgApiClient } = require("instagram-private-api");
const CronJob = require("cron").CronJob;

(async () => {
  const ig = new IgApiClient();
  ig.state.generateDevice(process.env.IG_USERNAME);
  ig.state.proxyUrl = process.env.IG_PROXY;
  const auth = await ig.account.login(
    process.env.IG_USERNAME,
    process.env.IG_PASSWORD
  );
  console.log(JSON.stringify(auth));

  // Upload multiple local images
  const imagePaths = [
    "C:/Users/mkuma/Downloads/ImgDownVoccab/img30.jpeg",
    "C:/Users/mkuma/Downloads/ImgDownVoccab/img40.jpeg",
  ];


  const imageBuffers = await Promise.all(
    imagePaths.map((path) => fs.promises.readFile(path))
  );

  const albumItems = imageBuffers.map((buffer) => ({
    file: buffer,
    // You can optionally add usertags here
  }));

  const publishResult = await ig.publish.album({
    items: albumItems, // Array of objects, each representing an image in the album
    caption: `sscenglish2024 sscenglish2024 Top Voccab 📕📕  words asked IN #ssc #exam

#ssc #ssccgl

#sscexam #sscenglish #englishexam #englishiseasy #sscchslexam #englishlanguageteaching #englishlearner #examday #englishtown #englishmastiffpuppy #englishquiz #sscycle #englishgrammer #englisheveryday #sscgk #englishacademy #englishman #englishtoyterrier #ssccglcpocds #examsover #sscexams #englishword #cglove`, // Caption for the album (optional)
  });

  console.log(publishResult); // publishResult.status should be "ok"
})();
