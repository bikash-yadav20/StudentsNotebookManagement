
export const checkAuth = (req, res, next) => {
  const clientUsername = req.headers["x-app-username"];
  const clientPassword = req.headers["x-app-password"];

  if (
    clientUsername === process.env.APP_USERNAME &&
    clientPassword === process.env.APP_PASSWORD
  ) {
    return next(); 
  }

  return res.status(403).json({ error: "Forbidden: Invalid credentials" });
};
