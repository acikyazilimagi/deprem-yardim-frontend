/**
 * Returns given cookie's value.
 * @param name
 */
export const getCookie = (name: string): string | undefined => {
  const cookies = decodeURIComponent(document.cookie).split("; ");
  return cookies.find((cookie) => cookie.split("=")[0] === name)?.split("=")[1];
};

/**
 * Sets a cookie with given parameters.
 * @param name
 * @param value
 * @param path
 * @param expireHours
 */
export const setCookie = (
  name: string,
  value: string,
  path: string,
  expireHours?: number
): void => {
  if (expireHours) {
    const date = new Date();
    date.setHours(date.getHours() + expireHours);
    document.cookie = `${name}=${value};path=${path};expires=${date.toUTCString()};samesite=strict`;
  } else {
    document.cookie = `${name}=${value};path=${path};samesite=strict`;
  }
};
