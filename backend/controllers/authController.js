let users = []; // temporary in-memory store

export const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = { id: Date.now(), name, email, password };
  users.push(newUser);

  res.json({ message: 'Registration successful', user: newUser });
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // In a real app, generate JWT here
  res.json({ message: 'Login successful', user });
};
export const logoutUser = (req, res) => {
  // In a real app, handle token invalidation here
  res.json({ message: 'Logout successful' });
};

export const getUserProfile = (req, res) => {
  const userId = req.params.id;
  const user = users.find(u => u.id == userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};  