'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaHome, FaTrophy, FaCalendarAlt, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        router.push('/admin/login');
        return;
      }

      setUser(session.user);
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const navItems = [
    { href: '/admin', icon: FaHome, label: 'Dashboard' },
    { href: '/admin/competitions', icon: FaTrophy, label: 'Competitions' },
    { href: '/admin/events', icon: FaCalendarAlt, label: 'Events' },
    { href: '/admin/users', icon: FaUsers, label: 'Users' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 dark:bg-gray-800 text-white">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-700">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <motion.li
                  key={item.href}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={item.href}
                    className="flex items-center p-2 rounded-lg hover:bg-gray-700"
                  >
                    <item.icon className="mr-3" />
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-700">
            <button
              onClick={handleSignOut}
              className="flex items-center w-full p-2 rounded-lg hover:bg-gray-700"
            >
              <FaSignOutAlt className="mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout; 