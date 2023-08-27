import { ScheduledPlaylists } from "../lib/db/ScheduledPlaylists.js";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const d = new Date();
const currentMonthName = monthNames[d.getMonth()];
const currentYear = d.getFullYear();

export const createScheduledPlaylist = async () => {
  console.log(
    "Beginning create scheduled playlist cron job for: ",
    currentMonthName
  );

  const userList = await new ScheduledPlaylists().findAllUsers();

  for (const user of userList) {
    console.log("User found, creating playlist for: " + user.email);
    await user.createScheduledPlaylist({
      playlistName: `${currentMonthName} ${currentYear}`,
    });
  }
};

createScheduledPlaylist();
