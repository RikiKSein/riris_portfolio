import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart, FaTelegramPlane } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/RikiKSein', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/ribkamuluyeabrha/', label: 'LinkedIn' },
    // { icon: <FaTwitter />, url: '#', label: 'Twitter' }
    { icon: <FaTelegramPlane />, url: 'https://t.me/Its2004Tseine', label: 'Telegram' }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#project' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="bg-gradient-to-br from-cream-50 via-cream-100 to-cream-200 relative overflow-hidden py-4 text-gray-800">
      {/* Animated background elements - Mini Hearts */}
      <div className="absolute inset-0 overflow-hidden opacity-80">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-amber-500/20 text-lg"
            initial={{
              x: Math.random() * window.innerWidth * 1.5 - window.innerWidth * 0.25,
              y: Math.random() * window.innerHeight * 1.5 - window.innerHeight * 0.25,
              scale: Math.random() * 1 + 0.5,
              rotate: Math.random() * 360
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight * 1.5 - window.innerHeight * 0.25],
              x: [null, Math.random() * window.innerWidth * 1.5 - window.innerWidth * 0.25],
              scale: [null, Math.random() * 1 + 0.5],
              rotate: [null, Math.random() * 360 + 360]
            }}
            transition={{
              duration: Math.random() * 30 + 25,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <FaHeart />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4 pb-6 md:pr-6 md:border-r border-amber-200/30">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-gray-800"
            >
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                Ribka
              </span>
            </motion.h3>
            <p className="text-gray-800">
              Passionate about creating beautiful and functional web applications.
            </p>
            <div className="flex gap-4 pt-2">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-amber-600 transition-colors text-xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 pb-6 md:pr-6 md:border-r border-amber-200/30">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-800 hover:text-amber-600 transition-colors"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Contact Info</h4>
            <ul className="space-y-2 text-gray-800">
              <li>Addis Ababa, Ethiopia</li>
              <li>
                <a href="mailto:koreankuki16@gmail.com" className="hover:text-amber-600 transition-colors">
                  koreankuki16@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+251940117458" className="hover:text-amber-600 transition-colors">
                  +251940117458
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 pt-6 border-t border-amber-200/30 text-center text-gray-800"
        >
          <p>
            © {currentYear} Ribka Muluye. Made with{' '}
            <FaHeart className="inline-block text-red-500 animate-pulse" /> using React
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 