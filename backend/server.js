const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug middleware pour voir les requêtes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  if (req.method === 'POST' || req.method === 'PUT') {
    console.log('Body:', req.body);
  }
  next();
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongodb:27017/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('MongoDB connected');
  
  // Import models
  const Project = require('./models/Project');
  const Skill = require('./models/Skill');

  // Add default project if none exists
  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await new Project({
      title: 'Portfolio Docker',
      description: 'Un portfolio moderne utilisant Docker et une architecture 3-tiers',
      technologies: ['React', 'Node.js', 'MongoDB', 'Docker']
    }).save();
    console.log('Projet par défaut créé');
  }

  // Add default skills if none exist
  const skillCount = await Skill.countDocuments();
  if (skillCount === 0) {
    const defaultSkills = [
      { name: 'React.js', level: 4, category: 'Frontend' },
      { name: 'Node.js', level: 4, category: 'Backend' },
      { name: 'MongoDB', level: 3, category: 'Database' },
      { name: 'Docker', level: 3, category: 'DevOps' }
    ];
    await Skill.insertMany(defaultSkills);
    console.log('Compétences par défaut créées');
  }
})
.catch(err => console.error('MongoDB connection error:', err));

// Routes
const projectsRouter = require('./routes/projects');
const skillsRouter = require('./routes/skills');

app.use('/api/projects', projectsRouter);
app.use('/api/skills', skillsRouter);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
