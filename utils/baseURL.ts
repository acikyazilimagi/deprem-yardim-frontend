const getBaseURL = (): string => {
  if (!process.env.VERCEL_URL) {
    return "http://localhost:3000";
  }

  return `https://${process.env.VERCEL_URL}`;
};

export default getBaseURL;
