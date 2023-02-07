import { ReactNode } from "react";

interface RenderIfProps {
  condition: "loading" | "error" | "success";

  children: ReactNode;

  fallback?: ReactNode;

  loading?: ReactNode;
}

const RenderIf = ({
  condition,
  children,
  fallback,
  loading,
}: RenderIfProps) => {
  if (condition === "success") {
    return <>{children}</>;
  } else if (condition === "loading") {
    return <>{loading}</>;
  } else {
    return <>{fallback}</>;
  }
};

export default RenderIf;
