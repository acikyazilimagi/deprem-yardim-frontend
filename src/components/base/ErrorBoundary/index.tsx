import { DefaultError, MaintenanceError } from "@/errors";
import CustomErrorPage from "@/pages/_error";
import type { ReactNode } from "react";
import { Component } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;

  error?: Error;
}

const hasError = (hasError: boolean, error: unknown): error is Error => {
  return hasError;
};

const isTypeError = (error: Error): error is TypeError => {
  return error.name === "TypeError";
};

const isMaintenanceError = (error: Error): error is MaintenanceError => {
  return error.name === "Bakımdayız";
};

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.

    const state: State = { hasError: true };

    if (isTypeError(error)) {
      state.error = new DefaultError();
    } else {
      state.error = error;
    }

    return state;
  }

  public render() {
    if (hasError(this.state.hasError, this.state.error)) {
      if (isMaintenanceError(this.state.error)) {
        return (
          <CustomErrorPage
            title={this.state.error.name}
            detail={this.state.error.message}
            statusCode={200}
          />
        );
      }

      return (
        <CustomErrorPage
          // @ts-expect-error IDK why this is causing problem, we're safe inside hasError closure
          title={this.state.error.name}
          // @ts-expect-error IDK why this is causing problem, we're safe inside hasError closure
          detail={this.state.error.message}
          statusCode={400}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
