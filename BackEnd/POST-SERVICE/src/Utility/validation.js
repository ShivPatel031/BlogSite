import Joi from "joi";

const validateSearchPost = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(150).required(),
    slug: Joi.string().min(3).required(),
    tags: Joi.array().items(Joi.string()),
    authorId: Joi.string().valid("draft", "published"),
    postId: Joi.string(),
    authorName: Joi.string().max(150),
    imageUrl: Joi.string(),
  });

  return schema.validate(data);
};

export { validateSearchPost };
