import React, { useState, useEffect, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from './components/Modal';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import SkillCard from './components/SkillCard';
import SearchBar from './components/SearchBar';
import FilterTags from './components/FilterTags';

function App() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState({
    projects: true,
    skills: true,
    action: false
  });
  const [error, setError] = useState(null);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Modal states
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const [isSkillModalOpen, setSkillModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);

  // Get unique categories
  const categories = useMemo(() => {
    return [...new Set(skills.map(skill => skill.category))];
  }, [skills]);

  // Filter skills
  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || skill.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [skills, searchQuery, selectedCategory]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesSearch;
    });
  }, [projects, searchQuery]);

  useEffect(() => {
    fetchProjects();
    fetchSkills();
  }, []);

  // API calls
  const fetchProjects = async () => {
    try {
      setLoading(prev => ({ ...prev, projects: true }));
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/projects`);
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des projets');
      }
      const data = await response.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Erreur lors du chargement des projets');
      toast.error('Erreur lors du chargement des projets');
      setProjects([]);
    } finally {
      setLoading(prev => ({ ...prev, projects: false }));
    }
  };

  const fetchSkills = async () => {
    try {
      setLoading(prev => ({ ...prev, skills: true }));
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/skills`);
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des compétences');
      }
      const data = await response.json();
      setSkills(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching skills:', err);
      setError('Erreur lors du chargement des compétences');
      toast.error('Erreur lors du chargement des compétences');
      setSkills([]);
    } finally {
      setLoading(prev => ({ ...prev, skills: false }));
    }
  };

  const handleProjectSubmit = async (e, projectData) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, action: true }));
    try {
      if (projectData._id) {
        // Update existing project
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/projects/${projectData._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectData),
        });
        if (!response.ok) throw new Error('Erreur lors de la mise à jour du projet');

        const updatedProject = await response.json();
        setProjects(projects.map(p => p._id === projectData._id ? updatedProject : p));
        toast.success('Projet mis à jour avec succès !');
      } else {
        // Create new project
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/projects`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectData),
        });
        if (!response.ok) throw new Error('Erreur lors de la création du projet');

        const newProject = await response.json();
        setProjects([...projects, newProject]);
        toast.success('Projet créé avec succès !');
      }
      setProjectModalOpen(false);
      setEditingProject(null);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message);
    } finally {
      setLoading(prev => ({ ...prev, action: false }));
    }
  };

  const handleSkillSubmit = async (e, skill) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/api/skills${skill._id ? `/${skill._id}` : ''}`;
    const method = skill._id ? 'PUT' : 'POST';

    try {
      setLoading(prev => ({ ...prev, action: true }));
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skill)
      });
      if (response.ok) {
        fetchSkills();
        setSkillModalOpen(false);
        setEditingSkill(null);
        toast.success(skill._id ? 'Compétence modifiée avec succès' : 'Compétence créée avec succès');
      }
    } catch (err) {
      toast.error('Erreur lors de la sauvegarde de la compétence');
    } finally {
      setLoading(prev => ({ ...prev, action: false }));
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return;
    
    setLoading(prev => ({ ...prev, action: true }));
    const url = `${process.env.REACT_APP_API_URL}/api/${type}/${id}`;
    try {
      const response = await fetch(url, { method: 'DELETE' });
      if (response.ok) {
        if (type === 'projects') {
          setProjects(projects.filter(p => p._id !== id));
          toast.success('Projet supprimé avec succès');
        } else {
          setSkills(skills.filter(s => s._id !== id));
          toast.success('Compétence supprimée avec succès');
        }
      } else {
        throw new Error(`Erreur lors de la suppression de ${type === 'projects' ? 'projet' : 'compétence'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message);
    } finally {
      setLoading(prev => ({ ...prev, action: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {loading.action && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-center">Chargement en cours...</p>
          </div>
        </div>
      )}
      <Navbar
        onNewProject={() => {
          setEditingProject(null);
          setProjectModalOpen(true);
        }}
        onNewSkill={() => {
          setEditingSkill(null);
          setSkillModalOpen(true);
        }}
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Hero />

        <div className="max-w-3xl mx-auto mb-12">
          <SearchBar
            placeholder="Rechercher des projets ou des compétences..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-800" id="skills">Compétences</h2>
              <span className="text-sm text-gray-500">{filteredSkills.length} compétence(s)</span>
            </div>

            <FilterTags
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            <AnimatePresence mode="popLayout">
              <div className="grid gap-8">
                {filteredSkills.map((skill) => (
                  <motion.div
                    key={skill._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <SkillCard
                      skill={skill}
                      onEdit={(skill) => {
                        setEditingSkill(skill);
                        setSkillModalOpen(true);
                      }}
                      onDelete={() => handleDelete('skills', skill._id)}
                    />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-800" id="projects">Projets</h2>
              <span className="text-sm text-gray-500">{filteredProjects.length} projet(s)</span>
            </div>

            <AnimatePresence mode="popLayout">
              <div className="grid gap-8">
                {(loading.projects || loading.skills) ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  </div>
                ) : error ? (
                  <div className="text-red-500 text-center">{error}</div>
                ) : filteredProjects.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">Aucun projet trouvé.</p>
                  </div>
                ) : (
                  filteredProjects.map((project) => (
                    <motion.div
                      key={project._id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ProjectCard
                        project={project}
                        onEdit={(project) => {
                          setEditingProject(project);
                          setProjectModalOpen(true);
                        }}
                        onDelete={() => handleDelete('projects', project._id)}
                      />
                    </motion.div>
                  ))
                )}
              </div>
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      {/* Modal pour les projets */}
      <Modal
        isOpen={isProjectModalOpen}
        onClose={() => {
          setProjectModalOpen(false);
          setEditingProject(null);
        }}
        title={editingProject ? "Modifier le projet" : "Nouveau projet"}
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = {
            _id: editingProject?._id,
            title: e.target.title.value,
            description: e.target.description.value,
            technologies: e.target.technologies.value.split(',').map(t => t.trim()),
            keyPoints: e.target.keyPoints.value.split('\n').filter(point => point.trim() !== '')
          };
          handleProjectSubmit(e, formData);
        }}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
              <input
                type="text"
                name="title"
                defaultValue={editingProject?.title}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                defaultValue={editingProject?.description}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                rows="4"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Technologies (séparées par des virgules)</label>
              <input
                type="text"
                name="technologies"
                defaultValue={editingProject?.technologies?.join(', ')}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Points clés (un par ligne)
                <span className="text-sm text-gray-500 font-normal ml-2">3 points recommandés</span>
              </label>
              <textarea
                name="keyPoints"
                defaultValue={editingProject?.keyPoints?.join('\n')}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                rows="3"
                placeholder="Architecture moderne et scalable&#10;Interface utilisateur intuitive&#10;Performance et sécurité optimisées"
                required
              />
            </div>
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  setProjectModalOpen(false);
                  setEditingProject(null);
                }}
                className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {editingProject ? "Modifier" : "Créer"}
              </button>
            </div>
          </div>
        </form>
      </Modal>

      {/* Modal pour les compétences */}
      <Modal
        isOpen={isSkillModalOpen}
        onClose={() => {
          setSkillModalOpen(false);
          setEditingSkill(null);
        }}
        title={editingSkill ? "Modifier la compétence" : "Nouvelle compétence"}
      >
        <form onSubmit={(e) => handleSkillSubmit(e, {
          _id: editingSkill?._id,
          name: e.target.name.value,
          level: parseInt(e.target.level.value),
          category: e.target.category.value
        })}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
              <input
                type="text"
                name="name"
                defaultValue={editingSkill?.name}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Niveau (1-5)</label>
              <input
                type="range"
                name="level"
                min="1"
                max="5"
                step="1"
                defaultValue={editingSkill?.level || 3}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                required
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>Débutant</span>
                <span>Intermédiaire</span>
                <span>Expert</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
              <select
                name="category"
                defaultValue={editingSkill?.category}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                required
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Database">Database</option>
                <option value="DevOps">DevOps</option>
                <option value="Other">Autre</option>
              </select>
            </div>
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  setSkillModalOpen(false);
                  setEditingSkill(null);
                }}
                className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {editingSkill ? "Modifier" : "Créer"}
              </button>
            </div>
          </div>
        </form>
      </Modal>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
