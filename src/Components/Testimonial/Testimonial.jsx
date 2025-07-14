import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaHeart, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const testimonials = [
    {
      name: "Mihret Daniel",
      role: "Best Friend",
      relationship: "Childhood Friend",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      rating: 5,
      text: "Ribka is not just a talented developer, but an amazing friend who brings creativity and joy to everything she does. Her passion for coding is inspiring!"
    },
    {
      name: "Arsema",
      role: "College Friend",
      relationship: "Study Buddy",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      rating: 5,
      text: "I've known Ribka since college, and her dedication to learning and growing as a developer is remarkable. She's always there to help and share knowledge!"
    },
    {
      name: "Fetiha",
      role: "Project Partner",
      relationship: "Tech Enthusiast Friend",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: 5,
      text: "Working with Ribka on projects has been a blast! Her attention to detail and creative solutions make her an incredible developer and friend."
    },
    {
      name: "Ribka",
      role: "High School Best Friend",
      relationship: "High School Best Friend",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      rating: 4,
      text: "Ribka is a great person to be around, always positive and ready to take on new challenges!"
    },
    {
      name: "Melat Mamushet",
      role: "Friend",
      relationship: "Another Friend",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
      rating: 5,
      text: "Talented and dedicated! Ribka is a pleasure to collaborate with."
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    visible.push(testimonials[currentIndex]);
    if (testimonials.length > 1) {
      visible.push(testimonials[(currentIndex + 1) % testimonials.length]);
    }
    return visible;
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <section id="testimonials" className="bg-gradient-to-b from-cream-50 via-cream-100 to-cream-200 relative overflow-hidden min-h-screen">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
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

      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-amber-500/20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 1 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <FaHeart size={24} />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            What My <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">Friends</span> Say About Me
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            The people who know me best share their thoughts
          </p>
        </motion.div>

        {/* Testimonial Cards Container */}
        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {visibleTestimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border-2 border-amber-100 shadow-xl"
                  style={{
                    transform: `perspective(1000px) rotateX(${(mousePosition.y - window.innerHeight / 2) * 0.015}deg) rotateY(${(mousePosition.x - window.innerWidth / 2) * 0.015}deg)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  <div className="flex items-center mb-6">
                    <motion.div 
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center text-amber-600 shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <FaQuoteLeft className="text-3xl" />
                    </motion.div>
                    <div className="ml-6">
                      <h3 className="text-2xl font-semibold text-gray-800">{testimonial.name}</h3>
                      <p className="text-base text-gray-600">{testimonial.role}</p>
                      <p className="text-base text-amber-600">{testimonial.relationship}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed italic">{testimonial.text}</p>
                  <div className="flex justify-center mt-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaHeart className="text-amber-500 mx-1 text-xl" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <motion.button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 text-amber-600 hover:from-amber-100 hover:to-orange-100 transition-colors shadow-lg"
              whileHover={{ scale: 1.1, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChevronLeft size={20} />
            </motion.button>
            <motion.button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 text-amber-600 hover:from-amber-100 hover:to-orange-100 transition-colors shadow-lg"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChevronRight size={20} />
            </motion.button>
          </div>

          {/* Dots indicator - showing dots for each testimonial for simplicity */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex || (testimonials.length > 1 && index === (currentIndex + 1) % testimonials.length) ? 'bg-amber-500' : 'bg-amber-200'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial; 