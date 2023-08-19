const sql = require("mssql");

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

const connectAndQuery = async (queryString, inputArr) => {
  try {
    const poolConnection = await sql.connect(config);
    const request = poolConnection.request();

    for (const input of inputArr) {
      console.log("creating input", input);
      request.input(input.key, input.type, input.value);
    }

    const resultSet = await request.query(queryString);

    poolConnection.close();

    return { resultSet: resultSet.recordset || [], err: null };
  } catch (err) {
    console.error(err.message);
    return { resultSet: [], err };
  }
};

module.exports = { connectAndQuery };
