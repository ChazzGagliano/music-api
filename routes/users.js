import { Router } from "express";

const router = Router();
import { users } from "../config/mongoCollections.js";

/*
  get all playlist names for current user
 */
router.get("/playlists", async (req, res) => {
  // todo
});

/*
  add given track id to user's playlist based on given playlist name
 */
router.post("/playlist/add", async (req, res) => {
  // todo
});

router.get("/:id", async (req, res) => {
  const userCollection = await users();
  const { id } = req.params;

  const user = await userCollection.findOne({ id: id });

  res.json(user);
});

router.post("/artist/like", async (req, res) => {
  const userCollection = await users();
  const { userId } = req.body;
  const { artistId } = req.body;

  await userCollection.updateOne(
    { id: userId },
    { $push: { artists: artistId } },
  );

  res.json({
    success: `User ${userId} liked artist ${artistId}`,
  });
});

router.post("/artist/unlike", async (req, res) => {
  const userCollection = await users();
  const { userId } = req.body;
  const { artistId } = req.body;

  await userCollection.updateOne(
    { id: userId },
    { $pull: { artists: artistId } },
  );

  res.json({
    success: `User ${userId} unliked artist ${artistId}`,
  });
});

router.post("/track/like", async (req, res) => {
  const userCollection = await users();
  const { userId } = req.body;
  const { trackId } = req.body;

  await userCollection.updateOne(
    { id: userId },
    { $push: { tracks: trackId } },
  );
  res.json({
    success: `User ${userId} liked track ${trackId}`,
  });
});

router.post("/track/unlike", async (req, res) => {
  const userCollection = await users();
  const { userId } = req.body;
  const { trackId } = req.body;

  await userCollection.updateOne(
    { id: userId },
    { $pull: { tracks: trackId } },
  );

  res.json({
    success: `User ${userId} unliked track ${trackId}`,
  });
});

router.post("/playlist", async (req, res) => {
  const userCollection = await users();
  const { userId } = req.body;
  const { playlistName } = req.body;

  await userCollection.updateOne(
    { id: userId },
    { $push: { playlists: { name: playlistName, tracks: [] } } },
  );

  res.json({
    success: `User ${userId} created playlist, ${playlistName}`,
  });
});

export default router;
