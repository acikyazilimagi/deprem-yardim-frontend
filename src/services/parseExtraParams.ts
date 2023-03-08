import dJSON from "dirty-json";

export const parseExtraParams = <TExtraParams>(extraParamsStr: string) => {
  return dJSON.parse<string, TExtraParams>(
    extraParamsStr?.replaceAll("nan", "").replaceAll(/\\"/g, '"')
  );
};
