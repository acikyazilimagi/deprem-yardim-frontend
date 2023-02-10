import Maintenance from "@/components/UI/Maintenance/Maintenance";
import { Component, ReactNode } from "react";

export interface ErrorBoundaryProps {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  State
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Maintenance title="Oops...">
          Sitede teknik bir sorun meydana geldi. Sayfayı yenileyerek tekrar
          deneyin. Eğer sorununuz devam ederse, lütfen daha sonra tekrar
          deneyiniz veya <a href="//depremyardim.com">depremyardim.com</a>{" "}
          adresini ziyaret ediniz.
        </Maintenance>
      );
    }

    return this.props.children;
  }
}
