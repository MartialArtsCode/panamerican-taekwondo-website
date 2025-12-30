import User from '../models/User.js';

export const awardBadge = async (req, res) => {
  try {
    const { badgeId } = req.body;
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.badges.push(badgeId);
    await user.save();
    res.json({ message: "Badge awarded", user });
  } catch (err) {
    res.status(500).json({ error: "Failed to award badge" });
  }
};

export const updateRank = async (req, res) => {
  try {
    const { rank } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { rank },
      { new: true }
    );
    res.json({ message: "Rank updated", user });
  } catch (err) {
    res.status(500).json({ error: "Failed to update rank" });
  }
};

export const addAchievement = async (req, res) => {
  try {
    const { achievement } = req.body;
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.achievements.push(achievement);
    await user.save();
    res.json({ message: "Achievement added", user });
  } catch (err) {
    res.status(500).json({ error: "Failed to add achievement" });
  }
};
