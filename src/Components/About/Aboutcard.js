import React from 'react';
import { motion } from 'framer-motion';

const Aboutcard = ({title, subTitle, result, des}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.02 }
  };

  const dotVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1 },
    hover: { scale: 1.2 }
  };

  return (
    <motion.div 
      className="w-full group flex"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <div className="w-10 h-[6px] bgOpacity mt-16 relative">
        <motion.span 
          className="absolute w-5 h-5 rounded-full -top-2 -left-3 flex justify-center items-center bg-gradient-to-r from-amber-500 to-amber-600 bg-opacity-60 shadow-lg"
          variants={dotVariants}
        >
          <motion.span 
            className="w-3 h-3 rounded-full bg-gray-200 inline-flex group-hover:bg-amber-400 duration-300"
            variants={dotVariants}
          />
        </motion.span>
      </div>
      <motion.div 
        className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 duration-300 rounded-xl p-6 lgl:px-10 flex flex-col justify-center gap-6 lgl:gap-10 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        whileHover={{ 
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
        }}
      >
        <div className="flex flex-col lgl:flex-row justify-between gap-4 lgl:gap-0 lgl:items-center">
          <div>
            <motion.h3 
              className="text-xl md:text-2xl font-bold text-gray-200 group-hover:text-amber-400 duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {title}
            </motion.h3>
            <motion.p 
              className="text-sm mt-2 text-gray-400 group-hover:text-gray-300 duration-300"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              {subTitle}
            </motion.p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <p className="px-4 py-2 text-amber-400 bg-amber-900/30 hover:bg-amber-900/50 rounded-lg flex justify-center items-center shadow-md text-sm font-medium transform hover:scale-105 transition-transform duration-300">
              {result}
            </p>
          </motion.div>
        </div>
        <motion.p 
          className="text-sm md:text-base font-medium text-gray-400 group-hover:text-gray-300 duration-300 leading-relaxed"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          {des}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Aboutcard;
