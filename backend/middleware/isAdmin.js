//middleware/isAdmin.js
export const isAdmin = (req, res, next) => {
  if (req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Permission denied" });
  }
  next();
};
