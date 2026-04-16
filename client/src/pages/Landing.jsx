import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import {
  MagnifyingGlassIcon, ChartBarIcon, ScaleIcon,
  RocketLaunchIcon, AcademicCapIcon, SparklesIcon
} from '@heroicons/react/24/outline';

const features = [
  { icon: MagnifyingGlassIcon, title: 'Cari Prodi', desc: 'Cari dari ribuan program studi di seluruh PTN Indonesia' },
  { icon: ChartBarIcon, title: 'Prediksi Skor', desc: 'Prediksi skor minimum berdasarkan data historis 3 tahun' },
  { icon: ScaleIcon, title: 'Bandingkan', desc: 'Bandingkan 2-3 prodi secara berdampingan' },
  { icon: SparklesIcon, title: 'Smart Label', desc: 'Indikator Aman, Menengah, atau Ambisius untuk setiap prodi' },
  { icon: AcademicCapIcon, title: '125 PTN', desc: 'Data lengkap seluruh perguruan tinggi negeri di Indonesia' },
  { icon: RocketLaunchIcon, title: 'Simulasi', desc: 'Simulasikan skor UTBK-mu dan lihat peluangmu' },
];

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen pixel-grid relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-glow/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-navy-600/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-sm text-cyan-glow neon-text">PREDIKSI</span>
            <span className="text-gray-400 text-sm">SKOR AMAN SNBT</span>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <Link to="/dashboard" className="btn-primary text-sm">Dashboard</Link>
            ) : (
              <>
                <Link to="/login" className="btn-secondary text-sm">Masuk</Link>
                <Link to="/register" className="btn-primary text-sm">Daftar</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-glow/10 border border-cyan-glow/20 text-cyan-glow text-xs font-medium mb-8">
            <span className="w-2 h-2 bg-cyan-accent rounded-full animate-pulse" />
            Data SNBT 2025 tersedia
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Prediksi Peluangmu di{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-glow to-cyan-accent neon-text">
              PTN Impian
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            Analisis data 125 PTN, prediksi skor minimum, dan buat keputusan SNBT yang lebih cerdas
            dengan teknologi berbasis data historis.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={user ? '/search' : '/register'} className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center gap-2">
              <RocketLaunchIcon className="w-5 h-5" />
              Mulai Prediksi
            </Link>
            <Link to={user ? '/dashboard' : '/login'} className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center gap-2">
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { label: 'PTN', value: '125+' },
            { label: 'Program Studi', value: '2000+' },
            { label: 'Data Tahun', value: '3' },
            { label: 'Prediksi Akurat', value: '95%' },
          ].map((stat, i) => (
            <div key={i} className="card text-center">
              <div className="text-2xl font-bold text-cyan-glow">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-2xl font-bold text-center mb-12">
          Fitur <span className="text-cyan-glow">Unggulan</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card group cursor-default"
            >
              <div className="w-12 h-12 rounded-lg bg-cyan-glow/10 flex items-center justify-center mb-4 group-hover:bg-cyan-glow/20 transition-colors">
                <feature.icon className="w-6 h-6 text-cyan-glow" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-navy-600/30 py-8 text-center text-sm text-gray-500">
        <p>© 2024 PREDIKSI SKOR AMAN SNBT. by ahmdmzki12</p>
      </footer>
    </div>
  );
}
