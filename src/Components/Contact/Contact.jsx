import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter, FaCheck, FaTimes, FaSpinner, FaHandshake, FaTelegramPlane } from 'react-icons/fa';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../api/idea'; // Import the db instance

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: false
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, success: false, error: false });

    try {
      // Add form data to Firestore
      await addDoc(collection(db, 'contactMessages'), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date().toISOString()
      });

      setFormStatus({ submitting: false, success: true, error: false });
      setFormData({ name: '', email: '', message: '' }); // Clear form on success

      // Reset success message after 3 seconds
      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, success: false }));
      }, 3000);

    } catch (error) {
      console.error('Network or other error:', error);
      setFormStatus({ submitting: false, success: false, error: true });
       setTimeout(() => {
        setFormStatus(prev => ({ ...prev, error: false }));
      }, 5000);
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      content: 'koreankuki16@gmail.com',
      link: 'mailto:koreankuki16@gmail.com'
    },
    {
      icon: <FaPhone />,
      title: 'Phone',
      content: '+251940117458',
      link: 'tel:+251940117458'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location',
      content: 'Addis Ababa, Ethiopia',
      link: '#'
    }
  ];

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/RikiKSein', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/ribkamuluyeabrha/', label: 'LinkedIn' },
    { icon: <FaTelegramPlane />, url: 'https://t.me/Its2004Tseine', label: 'Telegram' }
  ];

  return (
    <section id="contact" className="bg-white relative overflow-hidden min-h-screen">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Get in <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Animation Feature - Shaking Hands with small icons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex items-center justify-center p-6 bg-amber-50/50 rounded-xl shadow-inner"
            >
               {/* Central Shaking Hand Icon */}
               <motion.div
                 animate={{
                   rotate: [0, -15, 15, -15, 15, 0],
                   x: [0, -3, 3, -3, 3, 0]
                 }}
                 transition={{
                   duration: 1.8, // Adjusted duration slightly
                   repeat: Infinity,
                   ease: "easeInOut"
                 }}
               >
                 <FaHandshake className="text-amber-600 text-8xl" />
               </motion.div>

               {/* Small Icons Around Handshake */}
               {/* Email Icon */}
               <motion.div
                 className="absolute text-amber-700 text-2xl"
                 animate={{
                   y: [-20, -30, -20],
                   x: [0, -10, 0],
                   opacity: [0.8, 1, 0.8]
                 }}
                 transition={{
                   duration: 4,
                   repeat: Infinity,
                   ease: "easeInOut"
                 }}
                 style={{ top: '10%', left: '15%' }}
               >
                 <FaEnvelope />
               </motion.div>

               {/* Phone Icon */}
               <motion.div
                 className="absolute text-orange-600 text-2xl"
                 animate={{
                   y: [20, 30, 20],
                   x: [0, 10, 0],
                    opacity: [0.8, 1, 0.8]
                 }}
                 transition={{
                   duration: 4.5,
                   repeat: Infinity,
                   ease: "easeInOut",
                   delay: 0.5
                 }}
                 style={{ bottom: '10%', right: '15%' }}
               >
                 <FaPhone />
               </motion.div>

               {/* Location Icon */}
               <motion.div
                 className="absolute text-amber-700 text-2xl"
                  animate={{
                   x: [-20, -30, -20],
                   y: [0, 10, 0],
                    opacity: [0.8, 1, 0.8]
                 }}
                 transition={{
                   duration: 5,
                   repeat: Infinity,
                   ease: "easeInOut",
                   delay: 1
                 }}
                 style={{ top: '50%', left: '5%', transform: 'translateY(-50%)' }}
               >
                 <FaMapMarkerAlt />
               </motion.div>

                {/* Another Location Icon */}
               <motion.div
                 className="absolute text-orange-700 text-2xl"
                  animate={{
                   x: [20, 30, 20],
                   y: [0, -10, 0],
                    opacity: [0.8, 1, 0.8]
                 }}
                 transition={{
                   duration: 5.5,
                   repeat: Infinity,
                   ease: "easeInOut",
                   delay: 1.5
                 }}
                 style={{ top: '50%', right: '5%', transform: 'translateY(-50%)' }}
               >
                 <FaMapMarkerAlt />
               </motion.div>


            </motion.div>

            <div className="bg-white p-6 rounded-lg border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-amber-50 rounded-lg">
                    <FaEnvelope className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <a href="mailto:koreankuki16@gmail.com" className="text-gray-800 hover:text-amber-600">
                      koreankuki16@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-amber-50 rounded-lg">
                    <FaPhone className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <a href="tel:+251940117458" className="text-gray-800 hover:text-amber-600">
                      +251940117458
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-amber-50 rounded-lg">
                    <FaMapMarkerAlt className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="text-gray-800">Addis Ababa, Ethiopia</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Connect With Me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-amber-50 rounded-lg text-amber-600 hover:bg-amber-100 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Custom Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-lg border border-amber-100 shadow-sm hover:shadow-md transition-shadow space-y-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white border border-amber-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white border border-amber-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                  placeholder="Your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-white border border-amber-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                  placeholder="Your message"
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={formStatus.submitting}
                className={`w-full px-6 py-3 rounded-lg text-white font-medium transition-colors ${
                  formStatus.submitting ? 'bg-gray-400' : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {formStatus.submitting ? (
                  <FaSpinner className="animate-spin mx-auto" />
                ) : formStatus.success ? (
                  <FaCheck className="mx-auto" />
                ) : formStatus.error ? (
                  <FaTimes className="mx-auto" />
                ) : (
                  'Send Message'
                )}
              </motion.button>

              <AnimatePresence>
                {formStatus.success && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center text-green-600"
                  >
                    Message sent successfully!
                  </motion.p>
                )}
                {formStatus.error && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center text-red-600"
                  >
                    Failed to send message. Please try again.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 