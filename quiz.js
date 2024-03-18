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
    "C:/Users/mkuma/Downloads/G/img1.jpeg",
    "C:/Users/mkuma/Downloads/G/img2.jpeg",
    "C:/Users/mkuma/Downloads/G/img3.jpeg",
    "C:/Users/mkuma/Downloads/G/img4.jpeg",
    "C:/Users/mkuma/Downloads/G/img5.jpeg",
    "C:/Users/mkuma/Downloads/G/img6.jpeg",
    "C:/Users/mkuma/Downloads/G/img7.jpeg",
    "C:/Users/mkuma/Downloads/G/img8.jpeg",
    "C:/Users/mkuma/Downloads/G/img9.jpeg",
    "C:/Users/mkuma/Downloads/G/img10.jpeg",
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
    caption: ` Follow this page for more information regarding SSC
.
#currentaffairs
#onlinetaiyari
#uppsc
#ssc
#ssccgl
#sscchsl
#cpo #delhi
#indianarmy
#dailyupdate
#mts
#hindinews
#reasoning
#ncc
#sports
#reasoningquiz
#ukpsc
#sscexam
#panjab
#drsjaishankar
#UPSC
#womenempowerment
#narendramodi
#deepikapadukonefans #sscgkcurrentaffairscracker
#indianpolitics
#indianarmy🇮🇳
#yogiadityanath
#indiangovt
`, // Caption for the album (optional)
  });

  console.log(publishResult); // publishResult.status should be "ok"
})();
