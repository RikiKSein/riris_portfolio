import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaArrowDown, FaTelegramPlane } from 'react-icons/fa';
import idCardImage1 from '../../assets/Images-Used/logo_image/idcardimage.jpg';
import idCardImage2 from '../../assets/Images-Used/logo_image/idcardimage2.jpg';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTitle, setCurrentTitle] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(cursorY, [-100, 100], [30, -30]);
  const rotateY = useTransform(cursorX, [-100, 100], [-30, 30]);

  const titles = [
    "UI/UX Designer",
    "Frontend Developer",
    "Graphics Designer"
  ];

  const images = [idCardImage1, idCardImage2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(imageInterval);
  }, [images.length]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / 25;
      const y = (clientY - innerHeight / 2) / 25;
      setMousePosition({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/RikiKSein', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/ribkamuluyeabrha/', label: 'LinkedIn' },
    // { icon: <FaTwitter />, url: '#', label: 'Twitter' },
    { icon: <FaTelegramPlane />, url: 'https://t.me/Its2004Tseine', label: 'Telegram' }
  ];

  return (
    <section id="home" className="h-[130vh] relative overflow-hidden bg-gradient-to-b from-cream-50 via-cream-100 to-cream-200">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-500/10 rounded-full"
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

      {/* Floating cursor effect */}
      <motion.div
        className="fixed w-8 h-8 rounded-full bg-amber-500/20 backdrop-blur-sm pointer-events-none z-50"
        style={{
          x: cursorX,
          y: cursorY,
          rotateX,
          rotateY,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative min-h-screen flex items-center justify-center">
        <div className="text-center space-y-8">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 flex flex-col items-center"
          >
            {/* ID Card and Social Icons Container (Side-by-Side) */}
            <div className="flex items-center justify-center space-x-8 mb-12">
              {/* ID Card and Strap Container */}
              <div className="flex flex-col items-center">
                {/* Strap Element */}
                <motion.div
                  initial={{ opacity: 0, y: -200 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  className="w-4 h-32 bg-orange-500 mb-[-1rem] z-10 border border-orange-600"
                ></motion.div>

                {/* Photo Container (ID Card) */}
                <motion.div
                  initial={{ opacity: 0, y: -200, rotate: -10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotate: [-10, 10, -10, 0] // Swing left, right, then settle
                  }}
                  transition={{
                    duration: 1.2, // Longer duration for swing
                    delay: 0.4,
                    ease: "easeOut",
                    rotate: { duration: 1.5, ease: "easeInOut" } // Separate transition for rotate
                  }}
                  className="w-80 h-64 bg-white rounded-lg shadow-xl overflow-hidden border-[5px] border-orange-500 flex"
                >
                  {/* Image Section */}
                  <div className="w-full h-full overflow-hidden flex items-center justify-center bg-gray-100">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={images[currentImageIndex]}
                        alt="Ribka Muluye"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full h-full object-cover object-top"
                      />
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>

              {/* Social Links (Beside Card) */}
              <motion.div 
                className="flex flex-col gap-6 justify-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-amber-600 transition-colors text-2xl"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Text below card */}
            <div className="space-y-2">
              <motion.h1
                className="text-5xl md:text-6xl font-bold text-gray-800"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                  Ribka Muluye
                </span>
              </motion.h1>
            </div>

            {/* Rotating titles appear here */}
            <div className="h-16 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentTitle}
                  className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-orange-500 to-gray-800 bg-clip-text text-transparent"
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {titles[currentTitle]}
                </motion.h2>
              </AnimatePresence>
            </div>

            <motion.div 
              className="flex gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.a
                href="#contact"
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
              <motion.a
                href="#project"
                className="px-8 py-3 rounded-lg border border-amber-500 text-amber-600 font-medium hover:bg-amber-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
      </div>
    </section>
  );
};

export default Home; 