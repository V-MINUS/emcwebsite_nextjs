'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaCalendarAlt, FaUsers, FaMusic, FaPlus } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface Activity {
  id: string;
  type: 'competition' | 'event' | 'user' | 'entry';
  title: string;
  timestamp: string;
}

interface ChartData {
  name: string;
  value: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminDashboard = () => {
  const router = useRouter();
  const [stats, setStats] = useState({
    competitions: 0,
    events: 0,
    users: 0,
    entries: 0
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<{
    entriesByDay: ChartData[];
    userGrowth: ChartData[];
    competitionStats: ChartData[];
  }>({
    entriesByDay: [],
    userGrowth: [],
    competitionStats: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [
        { count: competitionsCount },
        { count: eventsCount },
        { count: usersCount },
        { count: entriesCount }
      ] = await Promise.all([
        supabase.from('competitions').select('*', { count: 'exact', head: true }),
        supabase.from('events').select('*', { count: 'exact', head: true }),
        supabase.from('users').select('*', { count: 'exact', head: true }),
        supabase.from('entries').select('*', { count: 'exact', head: true })
      ]);

      setStats({
        competitions: competitionsCount || 0,
        events: eventsCount || 0,
        users: usersCount || 0,
        entries: entriesCount || 0
      });
    };

    const fetchActivities = async () => {
      const { data: competitions } = await supabase
        .from('competitions')
        .select('id, title, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      const { data: events } = await supabase
        .from('events')
        .select('id, title, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      const { data: users } = await supabase
        .from('users')
        .select('id, email, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      const { data: entries } = await supabase
        .from('entries')
        .select('id, track_title, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      const allActivities = [
        ...(competitions?.map(c => ({
          id: c.id,
          type: 'competition' as const,
          title: `New Competition: ${c.title}`,
          timestamp: c.created_at
        })) || []),
        ...(events?.map(e => ({
          id: e.id,
          type: 'event' as const,
          title: `New Event: ${e.title}`,
          timestamp: e.created_at
        })) || []),
        ...(users?.map(u => ({
          id: u.id,
          type: 'user' as const,
          title: `New User: ${u.email}`,
          timestamp: u.created_at
        })) || []),
        ...(entries?.map(e => ({
          id: e.id,
          type: 'entry' as const,
          title: `New Entry: ${e.track_title}`,
          timestamp: e.created_at
        })) || [])
      ];

      setActivities(allActivities.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ).slice(0, 5));
      setLoading(false);
    };

    const fetchChartData = async () => {
      // Get entries by day for the last 7 days
      const { data: entriesData } = await supabase
        .from('entries')
        .select('created_at')
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      const entriesByDay = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return {
          name: date.toLocaleDateString('en-US', { weekday: 'short' }),
          value: entriesData?.filter(
            entry => new Date(entry.created_at).toDateString() === date.toDateString()
          ).length || 0
        };
      }).reverse();

      // Get user growth for the last 30 days
      const { data: usersData } = await supabase
        .from('users')
        .select('created_at')
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

      const userGrowth = Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return {
          name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          value: usersData?.filter(
            user => new Date(user.created_at).toDateString() === date.toDateString()
          ).length || 0
        };
      }).reverse();

      // Get competition statistics
      const { data: competitionsData } = await supabase
        .from('competitions')
        .select('status, entries!inner(count)')
        .group('status');

      const competitionStats = competitionsData?.map(comp => ({
        name: comp.status,
        value: comp.entries[0].count
      })) || [];

      setChartData({
        entriesByDay,
        userGrowth,
        competitionStats
      });
    };

    fetchStats();
    fetchActivities();
    fetchChartData();

    // Set up real-time subscriptions
    const competitionsSubscription = supabase
      .channel('competitions_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'competitions' }, () => {
        fetchStats();
        fetchActivities();
        fetchChartData();
      })
      .subscribe();

    const eventsSubscription = supabase
      .channel('events_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'events' }, () => {
        fetchStats();
        fetchActivities();
        fetchChartData();
      })
      .subscribe();

    const usersSubscription = supabase
      .channel('users_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, () => {
        fetchStats();
        fetchActivities();
        fetchChartData();
      })
      .subscribe();

    const entriesSubscription = supabase
      .channel('entries_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'entries' }, () => {
        fetchStats();
        fetchActivities();
        fetchChartData();
      })
      .subscribe();

    return () => {
      competitionsSubscription.unsubscribe();
      eventsSubscription.unsubscribe();
      usersSubscription.unsubscribe();
      entriesSubscription.unsubscribe();
    };
  }, []);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'competition':
        router.push('/admin/competitions/new');
        break;
      case 'event':
        router.push('/admin/events/new');
        break;
      case 'users':
        router.push('/admin/users');
        break;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'competition':
        return <FaTrophy className="text-blue-500" />;
      case 'event':
        return <FaCalendarAlt className="text-green-500" />;
      case 'user':
        return <FaUsers className="text-purple-500" />;
      case 'entry':
        return <FaMusic className="text-yellow-500" />;
    }
  };

  const statCards = [
    {
      icon: FaTrophy,
      title: 'Active Competitions',
      value: stats.competitions,
      color: 'bg-blue-500'
    },
    {
      icon: FaCalendarAlt,
      title: 'Upcoming Events',
      value: stats.events,
      color: 'bg-green-500'
    },
    {
      icon: FaUsers,
      title: 'Total Users',
      value: stats.users,
      color: 'bg-purple-500'
    },
    {
      icon: FaMusic,
      title: 'Total Entries',
      value: stats.entries,
      color: 'bg-yellow-500'
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {statCards.map((card, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`${card.color} p-6 rounded-lg text-white shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">{card.title}</p>
                <p className="text-3xl font-bold">{card.value}</p>
              </div>
              <card.icon className="text-4xl opacity-80" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Entries by Day Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4">Entries by Day</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.entriesByDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* User Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4">User Growth</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Competition Stats Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg lg:col-span-1"
        >
          <h2 className="text-xl font-semibold mb-4">Competition Stats</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData.competitionStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.competitionStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg lg:col-span-2"
        >
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button
              onClick={() => handleQuickAction('competition')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <FaPlus className="mr-2" />
              Create New Competition
            </button>
            <button
              onClick={() => handleQuickAction('event')}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <FaPlus className="mr-2" />
              Add New Event
            </button>
            <button
              onClick={() => handleQuickAction('users')}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <FaUsers className="mr-2" />
              Manage Users
            </button>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
              >
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-gray-500">{formatTimeAgo(activity.timestamp)}</p>
                </div>
                {getActivityIcon(activity.type)}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminDashboard; 