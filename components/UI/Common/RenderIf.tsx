import { ReactNode } from "react";
import RenderLoadingSpinner from "./RenderLoadingSpinner";

interface RenderIfProps {
  isLoading: boolean;
  condition: boolean;
  children: ReactNode;
  fallback?: ReactNode;
}

const RenderIf = ({
  isLoading,
  condition,
  children,
  fallback,
}: RenderIfProps) => {
  if (condition) {
    return (
      <>
        {children}
        {isLoading && <RenderLoadingSpinner />}
      </>
    );
  } else if (isLoading) {
    return <RenderLoadingSpinner />;
  } else {
    if (fallback) {
      return <>{fallback}</>;
    } else {
      return <></>;
    }
  }
};

export default RenderIf;
