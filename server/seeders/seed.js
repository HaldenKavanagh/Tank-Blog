const db = require("../config/connection");
const { User, Post } = require("../models");
const postSeeds = require("./postSeeds.json");
const userSeeds = require("./userSeeds.json");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  try {
    await cleanDB("Post", "posts");
    await cleanDB("User", "users");

    await User.create(userSeeds);

    await Post.create(postSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("SEEDING COMPLETE");
  process.exit(0);
});