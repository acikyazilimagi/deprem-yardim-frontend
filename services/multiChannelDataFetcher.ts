export const multiChannelDataFetcher = async (url: string) => {
  const urlForTwitterChannel = new URL(url);
  urlForTwitterChannel.searchParams.delete("channel");
  urlForTwitterChannel.searchParams.append("channel", "twitter");

  const urlForBabalaChannel = new URL(url);
  urlForBabalaChannel.searchParams.delete("channel");
  urlForBabalaChannel.searchParams.append("channel", "babala");

  const [responseTwitter, responseBabala] = await Promise.all([
    fetch(urlForTwitterChannel),
    fetch(urlForBabalaChannel),
  ]);

  const twitterJSON = await responseTwitter.json();
  const babalaJSON = await responseBabala.json();
  return {
    count: twitterJSON.count + babalaJSON.count,
    results: [...twitterJSON.results, ...babalaJSON.results],
  };
};
