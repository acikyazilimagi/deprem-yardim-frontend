type ApiClientProps = {
  url: string;
};

export class ApiClient {
  url: string;

  constructor(props: ApiClientProps) {
    this.url = props.url;
  }
}
