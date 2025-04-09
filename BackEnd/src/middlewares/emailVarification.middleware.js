function emailVarified(req, res, next) {
  try {
    if (!req.user.emailVarification)
      return res
        .status(404)
        .json({ success: false, message: "email not varified" });
    next();
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "something went wrong while checking email varification",
    });
  }
}

export { emailVarified };
