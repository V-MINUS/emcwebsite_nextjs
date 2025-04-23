'use client';

import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaInstagram, FaSoundcloud, FaSpotify } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-blue-500 text-xl" />
              <a href="mailto:info@emc.com" className="text-gray-300 hover:text-white">
                info@emc.com
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <FaPhone className="text-blue-500 text-xl" />
              <a href="tel:+353123456789" className="text-gray-300 hover:text-white">
                +353 123 456 789
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-blue-500 text-xl" />
              <span className="text-gray-300">
                Cork City, Ireland
              </span>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/emc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaFacebook className="text-2xl" />
              </a>
              <a
                href="https://instagram.com/emc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a
                href="https://soundcloud.com/emc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaSoundcloud className="text-2xl" />
              </a>
              <a
                href="https://spotify.com/emc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaSpotify className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
          {submitStatus && (
            <div className={`mb-4 p-4 rounded ${
              submitStatus.type === 'success' ? 'bg-green-800' : 'bg-red-800'
            }`}>
              {submitStatus.message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white h-32"
                required
                disabled={isSubmitting}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 