import React, { ReactElement, ReactNode } from "react";

interface DoubleClickStopPropagationProps {
  children: ReactNode;
}

const DoubleClickStopPropagation = ({
  children,
}: DoubleClickStopPropagationProps): ReactElement => {
  const handleDoubleClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  return (
    <>
      {React.Children.map(children, (child) =>
        React.cloneElement(child as ReactElement, {
          onDoubleClick: handleDoubleClick,
        })
      )}
    </>
  );
};

export { DoubleClickStopPropagation };
