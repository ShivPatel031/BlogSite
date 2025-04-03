import Joi from "joi";

const validateCreatePost = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(150).required(),
    content: Joi.string().min(5).required(),
    tags: Joi.array().items(Joi.string()),
    status: Joi.string().valid("draft", "published"),
    slug: Joi.string(),
    is_featured: Joi.string(),
    description: Joi.string(),
  });

  return schema.validate(data);
};

export { validateCreatePost };
