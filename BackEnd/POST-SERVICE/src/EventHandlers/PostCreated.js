import { Search } from "../Models/search.model.js";
import { logger } from "../Utility/logger.js";
import { validateSearchPost } from "../Utility/validation.js";

export async function PostCreatedAfterWork(content) {
  logger.info("Post created after work endpoint hit..");
  try {
    const { error } = validateSearchPost(content);

    if (!error) {
      logger.error(`error because of getting incorrect data`);
      return;
    }

    const postSearch = await Search.create({...content});

    if(!postSearch){
        logger.error("Something went wrong while creatien search data for post");
    }
  } catch (error) {
    logger.error(`Something went wrong while handle event ${error.message}`);
  }
}
