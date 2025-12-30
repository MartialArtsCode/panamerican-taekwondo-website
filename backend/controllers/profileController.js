export const updateProfile = (req, res) => {
  const { name, email } = req.body;
  const avatarUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const updatedUser = {
    name,
    email,
    avatarUrl,
  };

  res.json(updatedUser);
};
