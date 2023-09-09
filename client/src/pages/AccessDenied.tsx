import styled from "@emotion/styled";
import { SpotifyButton } from "../components/SpotifyButton";

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > p {
    margin-top: -5px;
  }
`;

export const AccessDenied = () => {
  return (
    <CenteredContainer>
      <h4>Oops, something went wrong!</h4>
      <p>Try again below:</p>
      <SpotifyButton />
    </CenteredContainer>
  );
};
