import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaEnvelope, FaCode, FaCoffee, FaBook, FaMusic, FaGamepad, FaPalette, FaTimes, FaFilm, FaReact, FaJs, FaHtml5, FaCss3Alt, FaNodeJs, FaPython, FaDatabase, FaFigma, FaPaintBrush, FaRegObjectUngroup, FaRegChartBar, FaServer } from 'react-icons/fa';
import Aboutcard from './Aboutcard';

const About = () => {
  const [currentStatus, setCurrentStatus] = useState(0);
  const [activeDetail, setActiveDetail] = useState(null);
  const [hoveredItemId, setHoveredItemId] = useState(null);

  const statuses = [
    { icon: <FaCode />, text: "Coding something awesome", color: "from-blue-500 to-purple-500" },
    { icon: <FaCoffee />, text: "Taking a coffee break", color: "from-amber-500 to-orange-500" },
    { icon: <FaBook />, text: "Learning new technologies", color: "from-green-500 to-teal-500" },
    { icon: <FaMusic />, text: "Listening to music", color: "from-pink-500 to-red-500" },
    { icon: <FaFilm />, text: "Watching K-Dramas", color: "from-purple-500 to-indigo-500" },
    { icon: <FaPalette />, text: "Designing UI/UX", color: "from-orange-500 to-amber-500" }
  ];

  const educationData = [
    {
      id: 'edu1',
      type: 'education',
      title: "Information System Degree",
      subTitle: "Addis Ababa University",
      result: "2022-2026",
      des: "focusing on software development. Participated in various Technology related Events and be part of the community."
    },
    {
      id: 'edu2',
      type: 'education',
      title: "Web Development Bootcamp",
      subTitle: "ALX Africa",
      result: "2025-2026",
      des: "Intensive 8 month program covering modern web development technologies including HTML, CSS, Javascript, React, Typescript, Figma, TailwindCSS and so on"
    },
    {
      id: 'edu3',
      type: 'education',
      title: "Graphics Design Bootcamp",
      subTitle: "GDG Bootcamp",
      result: "2024",
      des: "Comprehensive training in graphic design and design tools including Adobe Creative Suite and Adobe Illustrator and Canva."
    },
    {
      id: 'edu4',
      type: 'education',
      title:'Data Analysis Fundamentals',
      subtile:'Udacity Ethiopia',
      result: "2025",
      des:"Comprehensive training in data analysis and statistical modeling"

    }
  ];

  const interestsData = [
    {
      id: 'int1',
      type: 'interest',
      title: "Cooking",
      des: "Trying out new recipes and experimenting with different cuisines is a fun and creative outlet."
    },
    {
      id: 'int2',
      type: 'interest',
      title: "K-Dramas",
      des: "I love immersing myself in the compelling narratives and diverse genres of Korean dramas."
    },
    {
      id: 'int3',
      type: 'interest',
      title: "Languages",
      des: "I am passionate about learning new languages and exploring different cultures through linguistic studies."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatus((prev) => (prev + 1) % statuses.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const categorizedSkills = {
    "Website Development": [
      { name: 'React', icon: <FaReact /> },
      { name: 'JavaScript', icon: <FaJs /> },
      { name: 'HTML5', icon: <FaHtml5 /> },
      { name: 'CSS3', icon: <FaCss3Alt /> },
      { name: 'Node.js', icon: <FaNodeJs /> },
      { name: 'Tailwind CSS', icon: <FaCss3Alt /> },
    ],
    "Graphics Design": [
      { name: 'Figma', icon: <FaFigma /> },
      { name: 'Photoshop', icon: <FaPaintBrush /> },
      { name: 'Illustrator', icon: <FaRegObjectUngroup /> },
      { name: 'Canva', icon: <FaRegChartBar /> },
    ],
    "Database Management": [
      { name: 'SQL', icon: <FaDatabase /> },
      { name: 'MongoDB', icon: <FaDatabase /> },
      { name: 'PostgreSQL', icon: <FaServer /> },
      { name: 'MySQL', icon: <FaDatabase /> },
      { name: 'SQLite', icon: <FaDatabase /> },
    ],
     "Programming Languages": [
      { name: 'Java', icon: <FaCode /> },
      { name: 'C++', icon: <FaCode /> },
    ]
  };

  const closeDetailPopup = () => {
    setActiveDetail(null);
  };

  const handleMouseEnterItemForTooltip = (itemId) => {
    setHoveredItemId(itemId);
  };

  const handleMouseLeaveItemForTooltip = () => {
    setHoveredItemId(null);
  };

  return (
    <section id="about" className="min-h-screen py-20 bg-gradient-to-b from-cream-50 via-cream-100 to-cream-200 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/5 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 2 + 1,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              scale: [null, Math.random() * 2 + 1],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            About <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full" />
        </motion.div>

        {/* Current Status Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-4">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`p-4 rounded-full bg-gradient-to-r ${statuses[currentStatus].color} text-white shadow-lg`}
            >
              {statuses[currentStatus].icon}
            </motion.div>
            <motion.div
              key={currentStatus}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-medium text-gray-700"
            >
              {statuses[currentStatus].text}
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content - Who am I? & Skills side-by-side, Education & Interests below Who am I? */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Personal Info, Education & Interests Boxes */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 flex flex-col"
          >
            <div className="bg-cream-50/80 backdrop-blur-sm rounded-2xl p-8 border border-amber-100 h-auto lg:h-[300px]">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Who am I?</h3>
              <p className="text-gray-600 mb-4">
                I'm a passionate Full Stack Developer with a strong foundation in web development
                and a keen eye for creating beautiful, functional user experiences. I love turning
                complex problems into simple, beautiful, and intuitive solutions.
              </p>
              <p className="text-gray-600">
                With expertise in modern web technologies and a commitment to clean code,
                I strive to build applications that are not only visually appealing but also
                performant and maintainable.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="/assets/Images-Used/My_CV.png"
                download
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload />
                <span>Download CV</span>
              </motion.a>
              <motion.a
                href="#contact"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-amber-500 text-amber-600 font-medium hover:bg-amber-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEnvelope />
                <span>Contact Me</span>
              </motion.a>
            </div>

            {/* Education and Interests - Small Interactive Boxes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-cream-50/80 backdrop-blur-sm rounded-2xl p-8 border border-amber-100 mt-6 h-auto lg:h-[300px] overflow-hidden relative"
            >
              {/* Animated Hearts Background */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-amber-500/20"
                    initial={{
                      x: Math.random() * 100 - 50 + '%',
                      y: Math.random() * 100 - 50 + '%',
                      scale: 0,
                      rotate: Math.random() * 360
                    }}
                    animate={{
                      x: [
                        Math.random() * 100 - 50 + '%',
                        Math.random() * 100 - 50 + '%',
                        Math.random() * 100 - 50 + '%'
                      ],
                      y: [
                        Math.random() * 100 - 50 + '%',
                        Math.random() * 100 - 50 + '%',
                        Math.random() * 100 - 50 + '%'
                      ],
                      scale: [0, 1, 0],
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 4 + Math.random() * 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.5
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-12 h-12"
                      fill="currentColor"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </motion.div>
                ))}
              </div>

               {/* Separated Education Section */}
               <div className="relative z-10">
                 <h3 className="text-2xl font-bold text-gray-800 mb-4">Education</h3>
                 <div className="flex flex-wrap gap-3 mb-6">
                   {educationData.map((item) => (
                     <motion.div
                       key={item.id}
                       className={`relative p-3 rounded-lg text-sm font-medium cursor-pointer transition-colors ${activeDetail && activeDetail.id === item.id ? 'bg-orange-500 text-white' : 'bg-amber-100 text-gray-800 hover:bg-amber-200'}`}
                       onClick={() => setActiveDetail(activeDetail && activeDetail.id === item.id ? null : item)}
                       onMouseEnter={() => handleMouseEnterItemForTooltip(item.id)}
                       onMouseLeave={handleMouseLeaveItemForTooltip}
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                     >
                       {item.title}
                       <AnimatePresence>
                         {hoveredItemId === item.id && (
                           <motion.div
                             initial={{ opacity: 0, y: -5 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: -5 }}
                             transition={{ duration: 0.2 }}
                             className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-md whitespace-nowrap z-20"
                           >
                             Click to know more
                           </motion.div>
                         )}
                       </AnimatePresence>
                     </motion.div>
                   ))}
                 </div>
               </div>

               {/* Separated Interests Section */}
               <div>
                 <h3 className="text-2xl font-bold text-gray-800 mb-4">Interests</h3>
                  <div className="flex flex-wrap gap-3">
                   {interestsData.map((item) => (
                     <motion.div
                       key={item.id}
                       className={`relative p-3 rounded-lg text-sm font-medium cursor-pointer transition-colors ${activeDetail && activeDetail.id === item.id ? 'bg-orange-500 text-white' : 'bg-amber-100 text-gray-800 hover:bg-amber-200'}`}
                       onClick={() => setActiveDetail(activeDetail && activeDetail.id === item.id ? null : item)}
                       onMouseEnter={() => handleMouseEnterItemForTooltip(item.id)}
                       onMouseLeave={handleMouseLeaveItemForTooltip}
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                     >
                       {item.title}
                       <AnimatePresence>
                         {hoveredItemId === item.id && (
                           <motion.div
                             initial={{ opacity: 0, y: -5 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: -5 }}
                             transition={{ duration: 0.2 }}
                             className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-md whitespace-nowrap z-20"
                           >
                             Click to know more
                           </motion.div>
                         )}
                       </AnimatePresence>
                     </motion.div>
                   ))}
                 </div>
               </div>

              {/* Detail Text Area (Centered Popover with Blur) - Triggered by Click */}
              <AnimatePresence>
                {activeDetail && (
                  <motion.div
                    key="detail-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
                    onClick={closeDetailPopup}
                  />
                )}
              </AnimatePresence>

              <AnimatePresence>
                {activeDetail && (
                  <motion.div
                    key={activeDetail.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="fixed bottom-4 right-4 z-50 p-8 bg-gradient-to-br from-white to-cream-100 rounded-xl border-2 border-orange-500 shadow-2xl max-w-sm w-11/12 md:max-w-md lg:max-w-lg max-h-[95vh] overflow-y-auto"
                  >
                    <button
                      onClick={closeDetailPopup}
                      className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                    >
                      <FaTimes size={20} />
                    </button>
                    <h4 className="text-2xl font-bold text-gray-800 mb-3">{activeDetail.title}</h4>
                    {activeDetail.subTitle && <p className="text-base text-gray-600 mb-2">{activeDetail.subTitle}</p>}
                    {activeDetail.result && <p className="text-base text-gray-600 mb-2">Result: {activeDetail.result}</p>}
                    <p className="text-gray-700 mt-4 text-lg leading-relaxed">{activeDetail.des}</p>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </motion.div>

          {/* Right Column - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
             <div className="bg-cream-50/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-amber-100 h-auto lg:h-[700px]">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">My Skills</h3>
              <div className="space-y-4">
                {/* Display skills grouped by category with icons */}
                {Object.keys(categorizedSkills).map((category, categoryIndex) => (
                  <motion.div 
                    key={category} 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
                  >
                    <motion.h4 
                      className="text-xl font-semibold text-gray-700 mb-1"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: categoryIndex * 0.2 + 0.1 }}
                    >
                      {category}
                    </motion.h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5">
                      {/* Corrected rendering logic to map through skills within each category */}
                      {categorizedSkills[category].map((skill, skillIndex) => (
                        <motion.div 
                          key={skill.name} 
                          className="flex items-center gap-2 text-gray-800 p-2 rounded-lg hover:bg-amber-50 transition-colors cursor-pointer"
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.3, 
                            delay: categoryIndex * 0.2 + skillIndex * 0.1 
                          }}
                          whileHover={{ 
                            scale: 1.05, 
                            rotate: 1,
                            transition: { duration: 0.2 }
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.span 
                            className="text-amber-600 text-xl"
                            animate={{ 
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, -5, 0]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "reverse",
                              ease: "easeInOut"
                            }}
                          >
                            {skill.icon}
                          </motion.span>
                          <span className="text-lg">{skill.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default About;
