const db = require("../config/connection");
const { User, Post } = require("../models");
const postSeeds = require("./postSeeds.json");
const userSeeds = require("./userSeeds.json");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  try {
    await cleanDB("Post", "post");
    await cleanDB("User", "users");

    await User.create(userSeeds);

    for (let i = 0; i < postSeeds.length; i++) {
      const { _id, username } = await Post.create(postSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: username },
        {
          $addToSet: {
            posts: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("SEEDING COMPLETE");
  process.exit(0);
});
