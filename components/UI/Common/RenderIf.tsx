import { ReactNode } from "react";

interface RenderIfProps {
  condition: boolean;

  children: ReactNode;

  fallback?: ReactNode;
}

const RenderIf = ({ condition, children, fallback }: RenderIfProps) => {
  if (condition) {
    return <>{children}</>;
  }

  return fallback ? <>{fallback}</> : <></>;
};

export default RenderIf;
