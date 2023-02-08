import { TagsConfig, TAGS_CONFIG } from "./tagsConfig";

export function findTagByClusterCount(
  clusterCount: number,
  tagsConfig: TagsConfig = TAGS_CONFIG
) {
  const tag = Object.values(tagsConfig).find(
    (tag) => clusterCount >= tag.minClus && clusterCount <= tag.maxClus
  );

  return tag ?? tagsConfig.safe;
}
