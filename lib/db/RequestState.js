import { connectAndQuery } from "./connectAndQuery";

const generateSaveRequestSql = ({ requestState }) => `
INSERT INTO AuthRequest (RequestState)
VALUES (${requestState})
`;

export class RequestState {
  constructor(state) {
    this.state = state;
  }

  async persist() {
    return connectAndQuery(generateSaveRequestSql({ requestState: this.state}));
  }
}