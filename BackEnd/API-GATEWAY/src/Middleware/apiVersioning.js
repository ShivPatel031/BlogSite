export const urlVersioning = (version) => (req, res, next) => {
  if (req.path.startsWith(`/api/${version}`)) {
    next();
  } else {
    res
      .status(404)
      .json({ success: true, message: "Api Version is not supported" });
  }
};
