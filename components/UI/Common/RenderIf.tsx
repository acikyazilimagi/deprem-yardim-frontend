import { ReactNode } from "react";
import type { FC } from "react";

interface RenderIfProps {
  condition: "loading" | "error" | "success" | "DONT_RENDER";
  children: ReactNode;
  fallback?: ReactNode;
  loading?: ReactNode;
}

const RenderCondition: FC<RenderIfProps> = ({
  condition,
  children,
  fallback,
  loading,
}) => {
  if (condition === "DONT_RENDER") {
    return null;
  }

  if (condition === "loading" && loading) {
    return <>{loading}</>;
  }

  if (condition === "error" && fallback) {
    return <>{fallback}</>;
  }

  if (condition === "success" && children) {
    return <>{children}</>;
  }

  return null;
};

export default RenderCondition;
