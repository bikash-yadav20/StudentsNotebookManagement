export const login = (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.APP_USERNAME &&
    password === process.env.APP_PASSWORD
  ) {
    return res.json({ success: true, message: "Login successful" });
  }

  return res.status(401).json({ success: false, message: "Invalid credentials" });
};

export const getReports = (req, res) => {
  // Example: fetch from MongoDB later
  res.json({ reports: "Sensitive student report data here" });
};
