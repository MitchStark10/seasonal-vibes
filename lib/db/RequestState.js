import sql from "mssql";
import { connectAndQuery } from "./connectAndQuery";

const SAVE_REQUEST_SQL = `
INSERT INTO AuthRequest (RequestState)
VALUES (@requestState)
`;

const FIND_REQUEST_SQL = `
SELECT RequestState
FROM AuthRequest
WHERE RequestState = @requestState;
`;

export class RequestState {
  constructor(state) {
    this.state = state;
    this.queryParam = {
      key: "requestState",
      type: sql.VarChar,
      value: this.requestState,
    };
  }

  async persist() {
    return connectAndQuery(SAVE_REQUEST_SQL, [this.queryParam]);
  }

  async find() {
    return connectAndQuery(FIND_REQUEST_SQL, [this.queryParam]);
  }
}
