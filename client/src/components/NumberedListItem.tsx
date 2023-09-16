import React, { PropsWithChildren } from "react";

interface Props {
  number: number;
}
export const NumberedListItem: React.FC<PropsWithChildren<Props>> = ({
  number,
  children,
}) => {
  return (
    <div>
      <span style={{ fontWeight: "bold" }}>{number}. </span>
      {children}
    </div>
  );
};
