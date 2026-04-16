import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pixel-grid flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="font-pixel text-lg text-cyan-glow neon-text">SNBT</Link>
          <p className="text-gray-400 text-sm mt-2">Masuk ke akun kamu</p>
        </div>

        <div className="card">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-field"
                placeholder="nama@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50 disabled:cursor-wait">
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Belum punya akun?{' '}
            <Link to="/register" className="text-cyan-glow hover:underline">Daftar sekarang</Link>
          </p>
        </div>

        <div className="text-center text-xs text-gray-500 mt-6 space-y-2">
          <p>
            &copy; {new Date().getFullYear()} by <span className="text-cyan-glow font-semibold">ahmdmzki12</span>
          </p>
          <p className="flex items-center justify-center gap-2">
            <a href="https://instagram.com/ahmdmzki12" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-glow transition-colors">ig : ahmdmzki12</a>
            <span className="text-navy-600">|</span>
            <a href="https://tiktok.com/@efghijaki" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-glow transition-colors">tiktok : rinsocair</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
