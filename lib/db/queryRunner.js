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

export const connectAndQuery = async (queryString) => {
  try {
    const poolConnection = await sql.connect(config);

    const resultSet = await poolConnection.request().query(queryString);

    let columns = "";
    for (let column in resultSet.recordset.columns) {
      columns += column + ", ";
    }

    poolConnection.close();

    return resultSet.recordset;
  } catch (err) {
    console.error(err.message);
  }
};
