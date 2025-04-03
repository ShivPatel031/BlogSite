export const generateAccessAndRefreshTokens = async (user) => {
  try {
    if (!user) return;

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error.message)
    return null;
  }
};
