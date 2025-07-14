import React, { useEffect, useState } from 'react';
import { fetchGitHubProjects } from '../../services/github';
import unilinkImage from '../../assets/Images-Used/Project_images/unilink.png';
import calculatorImage from '../../assets/Images-Used/Project_images/calculatore.jpg';
import tictactoeImage from '../../assets/Images-Used/Project_images/tictactoe.png';
import sampleBookListImage from '../../assets/Images-Used/Project_images/samplebooklist.jpg';
import edurideImage from '../../assets/Images-Used/Project_images/eduride.jpg';
import { collection, addDoc, doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../api/idea';
import { FaGithub, FaRegCommentDots } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState({}); // { [projectTitle]: likeCount }
  const [likeLoading, setLikeLoading] = useState({}); // { [projectTitle]: boolean }
  const [ideaInputs, setIdeaInputs] = useState({}); // { [projectTitle]: inputValue }
  const [ideaStatus, setIdeaStatus] = useState({}); // { [projectTitle]: 'idle' | 'loading' | 'success' | 'error' }
  const [ideaModalOpen, setIdeaModalOpen] = useState(false);
  const [ideaModalProject, setIdeaModalProject] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [detailModalProject, setDetailModalProject] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'advanced', 'simple'

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchGitHubProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to fetch projects.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Fetch likes for all projects
  useEffect(() => {
    const fetchLikes = async () => {
      if (projects.length === 0) return;
      const likesObj = {};
      for (const project of projects) {
        try {
          const likeDoc = await getDoc(doc(db, 'projectLikes', project.title));
          likesObj[project.title] = likeDoc.exists() ? likeDoc.data().count : 0;
        } catch (err) {
          likesObj[project.title] = 0;
        }
      }
      setLikes(likesObj);
    };
    fetchLikes();
  }, [projects]);

  const handleIdeaInputChange = (projectTitle, value) => {
    setIdeaInputs((prev) => ({ ...prev, [projectTitle]: value }));
  };

  const handleIdeaSubmit = async (projectTitle) => {
    const idea = ideaInputs[projectTitle]?.trim();
    if (!idea) return;
    setIdeaStatus((prev) => ({ ...prev, [projectTitle]: 'loading' }));
    try {
      await addDoc(collection(db, 'projectIdeas'), {
        projectTitle,
        idea,
        timestamp: new Date(),
      });
      setIdeaStatus((prev) => ({ ...prev, [projectTitle]: 'success' }));
      setIdeaInputs((prev) => ({ ...prev, [projectTitle]: '' }));
      setTimeout(() => setIdeaStatus((prev) => ({ ...prev, [projectTitle]: 'idle' })), 2000);
    } catch (err) {
      setIdeaStatus((prev) => ({ ...prev, [projectTitle]: 'error' }));
      setTimeout(() => setIdeaStatus((prev) => ({ ...prev, [projectTitle]: 'idle' })), 2000);
    }
  };

  const isProjectLiked = (projectTitle) => localStorage.getItem(`liked_${projectTitle}`) === 'true';

  const handleLike = async (projectTitle) => {
    const likedKey = `liked_${projectTitle}`;
    const alreadyLiked = isProjectLiked(projectTitle);
    setLikeLoading((prev) => ({ ...prev, [projectTitle]: true }));
    try {
      const likeRef = doc(db, 'projectLikes', projectTitle);
      const likeDoc = await getDoc(likeRef);
      if (alreadyLiked) {
        // Unlike: decrement count, remove from localStorage
        if (likeDoc.exists() && likeDoc.data().count > 0) {
          await updateDoc(likeRef, { count: increment(-1) });
          setLikes((prev) => ({ ...prev, [projectTitle]: Math.max((prev[projectTitle] || 1) - 1, 0) }));
        }
        localStorage.removeItem(likedKey);
      } else {
        // Like: increment count, add to localStorage
        if (likeDoc.exists()) {
          await updateDoc(likeRef, { count: increment(1) });
          setLikes((prev) => ({ ...prev, [projectTitle]: (prev[projectTitle] || 0) + 1 }));
        } else {
          await setDoc(likeRef, { count: 1 });
          setLikes((prev) => ({ ...prev, [projectTitle]: 1 }));
        }
        localStorage.setItem(likedKey, 'true');
      }
    } catch (err) {
      alert('Failed to update like.');
    } finally {
      setLikeLoading((prev) => ({ ...prev, [projectTitle]: false }));
    }
  };

  const openIdeaModal = (projectTitle) => {
    setIdeaModalProject(projectTitle);
    setIdeaModalOpen(true);
  };
  const closeIdeaModal = () => {
    setIdeaModalOpen(false);
    setIdeaModalProject(null);
  };

  const openDetailModal = (project) => {
    setDetailModalProject(project);
    setDetailModalOpen(true);
  };
  const closeDetailModal = () => {
    setDetailModalOpen(false);
    setDetailModalProject(null);
  };

  // Define simple project names (case-insensitive)
  const simpleProjectNames = [
    'advancedcalculator',
    'sample-booklist',
    'tic-tac-toe-game',
  ];
  const isSimple = (project) => simpleProjectNames.includes(project.title.toLowerCase());
  const simpleProjects = projects.filter(isSimple);
  const advancedProjects = projects.filter((p) => !isSimple(p));

  const filteredProjects =
    filter === 'all'
      ? [...advancedProjects, ...simpleProjects]
      : filter === 'advanced'
      ? advancedProjects
      : simpleProjects;

  // Helper for planet position (polar to cartesian)
  const getPlanetStyle = (idx, total, radius, mobile) => {
    if (mobile) {
      return { position: 'relative', margin: '0 auto', marginBottom: '2rem' };
    }
    const angle = (2 * Math.PI * idx) / total - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return {
      position: 'absolute',
      left: `calc(50% + ${x}px - 6rem)`,
      top: `calc(50% + ${y}px - 6rem)`,
      width: '12rem',
      zIndex: 2,
    };
  };

  // Responsive check
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Animated background (stars)
  const stars = Array.from({ length: 40 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute rounded-full bg-white/30"
      style={{
        width: `${Math.random() * 2 + 1}px`,
        height: `${Math.random() * 2 + 1}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.7 + 0.2,
      }}
      animate={{
        y: [0, Math.random() * 20 - 10, 0],
        opacity: [0.2, 1, 0.2],
      }}
      transition={{ duration: 8 + Math.random() * 6, repeat: Infinity, ease: 'linear', delay: i * 0.1 }}
    />
  ));

  return (
    <section id="project" className="min-h-screen py-20 bg-gradient-to-br from-cream-50 via-amber-50 to-orange-100">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">{stars}</div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 mb-2 tracking-tight drop-shadow-lg">
            My Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore my latest works and contributions to the tech community.
          </p>
        </div>
        {/* Filter Bar */}
        <div className="flex justify-center gap-4 mb-10 relative">
          {['all', 'advanced', 'simple'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 shadow-sm border-2 ${filter === type ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-transparent' : 'bg-white text-amber-600 border-amber-200 hover:bg-amber-50'}`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
              {filter === type && (
                <motion.div layoutId="underline" className="h-1 w-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mt-2" />
              )}
            </button>
          ))}
        </div>
        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project, idx) => {
            let projectImage = null;
            if (project.title.toLowerCase() === 'unilink') projectImage = unilinkImage;
            else if (project.title.toLowerCase() === 'edurideexpress') projectImage = edurideImage;
            else if (project.title.toLowerCase() === 'advancedcalculator') projectImage = calculatorImage;
            else if (project.title.toLowerCase() === 'tic-tac-toe-game') projectImage = tictactoeImage;
            else if (project.title.toLowerCase() === 'sample-booklist') projectImage = sampleBookListImage;
            return (
              <motion.div
                key={project.id}
                className="group bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col items-center transition-all duration-300 border border-amber-100 relative"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.045, boxShadow: '0 8px 32px 0 rgba(255, 193, 7, 0.25), 0 1.5px 8px 0 rgba(255, 87, 34, 0.10)' }}
              >
                {projectImage && (
                  <motion.div className="relative w-full h-48 overflow-hidden"
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                  >
                    <img
                      src={projectImage}
                      alt={project.title}
                      className="object-cover w-full h-full rounded-t-2xl shadow-sm transition-transform duration-500"
                    />
                  </motion.div>
                )}
                <div className="flex-1 flex flex-col items-center justify-center w-full">
                  <h3 className="text-2xl font-bold text-gray-800 mt-6 mb-4 text-center group-hover:text-amber-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <motion.div
                    className="flex items-center justify-center gap-4 w-full mb-6"
                    initial={false}
                  >
                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center p-2 bg-amber-500 text-white rounded-full"
                      title="View on GitHub"
                      whileHover={{ scale: 1.18, boxShadow: '0 0 12px 2px #f59e42' }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <FaGithub className="w-5 h-5" />
                    </motion.a>
                    <motion.button
                      onClick={() => openIdeaModal(project.title)}
                      className="p-2 text-amber-500 hover:text-amber-600 bg-amber-100 rounded-full font-medium text-xs flex items-center"
                      title="Send Message / Share Idea"
                      whileHover={{ scale: 1.18, boxShadow: '0 0 12px 2px #fbbf24' }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <FaRegCommentDots className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
        {/* Modal for sharing idea */}
        {ideaModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-md mx-4 animate-fade-in">
              <button
                onClick={closeIdeaModal}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Share your idea for {ideaModalProject}</h3>
              <input
                type="text"
                className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 mb-4"
                placeholder="Type your idea..."
                value={ideaInputs[ideaModalProject] || ''}
                onChange={e => handleIdeaInputChange(ideaModalProject, e.target.value)}
                disabled={ideaStatus[ideaModalProject] === 'loading'}
              />
              <button
                onClick={() => handleIdeaSubmit(ideaModalProject)}
                className={`w-full px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-300 ${ideaStatus[ideaModalProject] === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={ideaStatus[ideaModalProject] === 'loading' || !(ideaInputs[ideaModalProject]?.trim())}
              >
                {ideaStatus[ideaModalProject] === 'loading' ? 'Sharing...' : 'Share Idea'}
              </button>
              {ideaStatus[ideaModalProject] === 'success' && (
                <div className="text-green-600 mt-2">Shared!</div>
              )}
              {ideaStatus[ideaModalProject] === 'error' && (
                <div className="text-red-600 mt-2">Failed!</div>
              )}
            </div>
          </div>
        )}
        {/* Modal for project details */}
        {detailModalOpen && detailModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg mx-4 animate-fade-in">
              <button
                onClick={closeDetailModal}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{detailModalProject.title}</h3>
              <div className="text-gray-700 text-base whitespace-pre-line">
                {/* Placeholder for project description, to be filled in by user */}
                Project description goes here. Please provide the details for this project.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Project;
