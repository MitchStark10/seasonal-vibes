import { ScheduledPlaylists } from "../lib/db/ScheduledPlaylists.js";

export const createScheduledPlaylist = async () => {
  console.log("Beginning create scheduled playlist cron job");

  const userList = await new ScheduledPlaylists().findAllUsers();

  for (const user of userList) {
    console.log("User found, creating playlist for: " + user.email);
    await user.createScheduledPlaylist({
      playlistName: "TBD - Name this playlist per the month",
    });
  }
};

createScheduledPlaylist();
