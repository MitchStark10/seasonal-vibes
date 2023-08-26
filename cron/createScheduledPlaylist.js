import { ScheduledPlaylists } from "../lib/db/ScheduledPlaylists.js";

export const createScheduledPlaylist = async () => {
  console.log("Beginning create scheduled playlist cron job");

  const userList = new ScheduledPlaylists().findAllUsers();

  for (const user of userList) {
    await user.createScheduledPlaylist();
  }
};
