import sql from "mssql";
import dotenv from "dotenv";
dotenv.config();

console.log(
  "process.env.QUARTERLY_VIBES_DB_SERVER",
  process.env.QUARTERLY_VIBES_DB_SERVER
);

const config = {
  user: process.env.QUARTERLY_VIBES_DB_USER,
  password: process.env.QUARTERLY_VIBES_DB_PASSWORD,
  server: process.env.QUARTERLY_VIBES_DB_SERVER,
  port: 1433,
  database: process.env.QUARTERLY_VIBES_DB_NAME,
  authentication: {
    type: "default",
  },
  options: {
    encrypt: true,
  },
};

export const connectAndQuery = async (
  queryString,
  inputArr = [],
  options = { logInfo: false }
) => {
  try {
    const poolConnection = await sql.connect(config);
    const request = poolConnection.request();

    for (const input of inputArr) {
      request.input(input.key, input.type, input.value);
    }

    const resultSet = await request.query(queryString);

    if (options.logInfo) {
      console.log("raw query result", resultSet);
    }

    poolConnection.close();

    return { resultSet: resultSet.recordset || [], err: null };
  } catch (err) {
    console.error(err.message);
    return { resultSet: [], err };
  }
};
