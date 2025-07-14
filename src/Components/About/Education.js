import React from 'react';
import { motion } from 'framer-motion';
import Aboutcard from './Aboutcard';

const Education = () => {
  const educationData = [
    {
      title: "Bachelor of Science in Computer Science",
      subTitle: "Addis Ababa University",
      result: "2022-2026",
      des: "focusing on software development. Participated in various Technology related Events and be part of the community."
    },
    {
      title: "Web Development",
      subTitle: "ALX Africa",
      result: "2025-2026",
      des: "Intensive 8 month program covering modern web development technologies including HTML, CSS, Javascript, React, Typescript, Figma, TailwindCSS and so on"
    },
    {
      title: "Data Analysis Fundamentals Certification",
      subTitle: "Ethiopian Udacity Program",
      result: "2025",
      des: "Comprehensive training in data analysis and statistical modeling"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {educationData.map((item, index) => (
        <Aboutcard
          key={index}
          title={item.title}
          subTitle={item.subTitle}
          result={item.result}
          des={item.des}
        />
      ))}
    </motion.div>
  );
};

export default Education;