import errorInterceptor from "./error.interceptor";
const interceptors = (err: Error): void => {
  errorInterceptor(err);
};
export default interceptors;
