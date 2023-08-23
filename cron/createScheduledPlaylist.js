import { ScheduledPlaylists } from "../lib/db/ScheduledPlaylists";

const createScheduledPlaylist = async () => {
  console.log("Beginning create scheduled playlist cron job");

  const userList = new ScheduledPlaylists().findAllUsers();
  // TODO: Loop through all saved users in the DB
  // TODO: Create a playlist for each user
};
