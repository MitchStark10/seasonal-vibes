const sql = require("mssql");
const { connectAndQuery } = require("./connectAndQuery");

const SAVE_REQUEST_SQL = `
INSERT INTO AuthRequest (RequestState)
VALUES (@requestState)
`;

const FIND_REQUEST_SQL = `
SELECT RequestState
FROM AuthRequest
WHERE RequestState = @requestState;
`;

class RequestState {
  constructor(state) {
    this.state = state;
    this.queryParam = {
      key: "requestState",
      type: sql.VarChar,
      value: this.state,
    };
  }

  async persist() {
    return connectAndQuery(SAVE_REQUEST_SQL, [this.queryParam]);
  }

  async find() {
    return connectAndQuery(FIND_REQUEST_SQL, [this.queryParam]);
  }
}

module.exports = { RequestState };
