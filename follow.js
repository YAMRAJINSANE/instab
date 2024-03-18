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

  // Read usernames from a JSON file
  const usernamesFilePath = "C:/Users/mkuma/Desktop/code/SSC/py/usernames.json"; // Assuming the usernames are stored in usernames.json
  const usernamesData = fs.readFileSync(usernamesFilePath, "utf8");
  const usernamesArray = JSON.parse(usernamesData);

  // Iterate over each username and follow
//   for (const username of usernamesArray) {
    try {
      await ig.friendship.create("aakkumar9834");
      console.log(`Successfully followed `);
    } catch (error) {
      console.error(`Error following :`, error.message);
    }
  }
// }

) ();
