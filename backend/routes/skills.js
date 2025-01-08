const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');

// Get all skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new skill
router.post('/', async (req, res) => {
  const skill = new Skill({
    name: req.body.name,
    level: req.body.level,
    category: req.body.category
  });

  try {
    const newSkill = await skill.save();
    res.status(201).json(newSkill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a skill
router.put('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (skill) {
      skill.name = req.body.name || skill.name;
      skill.level = req.body.level || skill.level;
      skill.category = req.body.category || skill.category;
      const updatedSkill = await skill.save();
      res.json(updatedSkill);
    } else {
      res.status(404).json({ message: 'Compétence non trouvée' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a skill
router.delete('/:id', async (req, res) => {
  try {
    const result = await Skill.deleteOne({ _id: req.params.id });
    if (result.deletedCount > 0) {
      res.json({ message: 'Compétence supprimée' });
    } else {
      res.status(404).json({ message: 'Compétence non trouvée' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
