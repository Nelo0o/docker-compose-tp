const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new project
router.post('/', async (req, res) => {
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    technologies: req.body.technologies,
    keyPoints: req.body.keyPoints
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a project
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      project.title = req.body.title || project.title;
      project.description = req.body.description || project.description;
      project.technologies = req.body.technologies || project.technologies;
      project.keyPoints = req.body.keyPoints || project.keyPoints;
      project.updatedAt = Date.now();

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Projet non trouvé' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a project
router.delete('/:id', async (req, res) => {
  try {
    const result = await Project.deleteOne({ _id: req.params.id });
    if (result.deletedCount > 0) {
      res.json({ message: 'Projet supprimé' });
    } else {
      res.status(404).json({ message: 'Projet non trouvé' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
