import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { motion } from 'framer-motion';
import {
  AcademicCapIcon, BookmarkIcon, ChartBarIcon, MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import LevelBadge from '../components/LevelBadge';

export default function Dashboard() {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [stats, setStats] = useState({ total: 0, universities: 0, bookmarks: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [bkRes, searchRes] = await Promise.all([
          api.get('/bookmarks'),
          api.get('/majors/search?page=1&limit=1'),
        ]);
        setBookmarks(bkRes.data);
        setStats({
          total: searchRes.data.pagination.total,
          bookmarks: bkRes.data.length,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const statCards = [
    { label: 'Total Prodi', value: stats.total, icon: AcademicCapIcon, color: 'from-cyan-glow to-blue-500' },
    { label: 'Bookmark', value: stats.bookmarks, icon: BookmarkIcon, color: 'from-cyan-accent to-emerald-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold">
          Selamat datang, <span className="text-cyan-glow">{user?.name}</span> 👋
        </h1>
        <p className="text-gray-400 mt-1">Mulai analisis peluang SNBT-mu hari ini.</p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-6 h-6 text-navy-900" />
            </div>
            <div>
              <p className="text-2xl font-bold">{loading ? '...' : stat.value.toLocaleString()}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/search" className="card group flex items-center gap-3 hover:border-cyan-glow/50">
          <MagnifyingGlassIcon className="w-8 h-8 text-cyan-glow" />
          <div>
            <p className="font-semibold group-hover:text-cyan-glow transition-colors">Cari Prodi</p>
            <p className="text-xs text-gray-400">Cari program studi impianmu</p>
          </div>
        </Link>
        <Link to="/compare" className="card group flex items-center gap-3 hover:border-cyan-glow/50">
          <ChartBarIcon className="w-8 h-8 text-cyan-accent" />
          <div>
            <p className="font-semibold group-hover:text-cyan-accent transition-colors">Bandingkan</p>
            <p className="text-xs text-gray-400">Bandingkan beberapa prodi</p>
          </div>
        </Link>
        <Link to="/search" className="card group flex items-center gap-3 hover:border-cyan-glow/50">
          <BookmarkIcon className="w-8 h-8 text-neon-yellow" />
          <div>
            <p className="font-semibold group-hover:text-neon-yellow transition-colors">Bookmark</p>
            <p className="text-xs text-gray-400">{bookmarks.length} prodi tersimpan</p>
          </div>
        </Link>
      </div>

      {/* Bookmarked Prodi */}
      {bookmarks.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">📌 Prodi Tersimpan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookmarks.slice(0, 4).map((bk, i) => (
              <motion.div
                key={bk.bookmarkId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/prodi/${bk.majorId}`} className="card block hover:border-cyan-glow/40">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{bk.majorName}</p>
                      <p className="text-sm text-gray-400">{bk.university}</p>
                    </div>
                    <span className="text-cyan-glow font-semibold">{bk.minScore}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
