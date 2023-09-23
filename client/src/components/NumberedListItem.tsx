import { styled } from "@mui/material";
import React, { PropsWithChildren } from "react";

interface Props {
  number: number;
}

const NumberedListItemContainer = styled("div")({
  fontSize: "20px",
});

const NumberedListItemCounter = styled("span")({
  fontWeight: "bold",
});

export const NumberedListItem: React.FC<PropsWithChildren<Props>> = ({
  number,
  children,
}) => {
  return (
    <NumberedListItemContainer>
      <NumberedListItemCounter>{number}. </NumberedListItemCounter>
      {children}
    </NumberedListItemContainer>
  );
};
