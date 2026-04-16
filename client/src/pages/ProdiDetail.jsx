import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { motion } from 'framer-motion';

import LevelBadge from '../components/LevelBadge';
import { CardSkeleton } from '../components/SkeletonLoader';
import UniversityAvatar from '../components/UniversityAvatar';
import { BookmarkIcon, ArrowLeftIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';
import { getSubtesForMajor } from '../utils/subtesPrioritas';



export default function ProdiDetail() {
  const { id } = useParams();
  const [major, setMajor] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [simScore, setSimScore] = useState('');
  const [similarMajors, setSimilarMajors] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [majorRes, predRes, bkRes, simRes] = await Promise.all([
          api.get(`/majors/${id}`),
          api.get(`/predict/${id}`),
          api.get('/bookmarks'),
          api.get(`/majors/${id}/similar`),
        ]);
        setMajor(majorRes.data);
        setPrediction(predRes.data);
        setBookmarked(bkRes.data.some(b => b.majorId === parseInt(id)));
        setSimilarMajors(simRes.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    load();
  }, [id]);

  const toggleBookmark = async () => {
    try {
      if (bookmarked) {
        await api.delete(`/bookmarks/${id}`);
      } else {
        await api.post(`/bookmarks/${id}`);
      }
      setBookmarked(!bookmarked);
    } catch (err) { console.error(err); }
  };

  if (loading) {
    return <div className="grid gap-6 md:grid-cols-2"><CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton /></div>;
  }

  if (!major) return <p className="text-gray-400">Prodi tidak ditemukan.</p>;



  const simResult = simScore ? (
    parseFloat(simScore) >= (prediction?.predicted.totalScore || 0)
      ? { text: 'Peluang Tinggi ✅', color: 'text-emerald-400' }
      : parseFloat(simScore) >= (prediction?.predicted.totalScore || 0) * 0.9
      ? { text: 'Peluang Sedang ⚠️', color: 'text-yellow-400' }
      : { text: 'Perlu Effort Lebih 💪', color: 'text-red-400' }
  ) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4 sm:gap-5 items-start">
          <UniversityAvatar name={major.university.name} size={64} className="hidden sm:flex shadow-neon-strong" />
          <div>
            <Link to="/search" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-cyan-glow mb-3">
              <ArrowLeftIcon className="w-4 h-4" /> Kembali
            </Link>
            <div className="flex items-center gap-3 mb-1">
              <UniversityAvatar name={major.university.name} size={36} className="sm:hidden shadow-sm" />
              <h1 className="text-2xl font-bold">{major.degree} {major.name}</h1>
            </div>
            <p className="text-gray-400">{major.university.name} — {major.university.city}, {major.university.province}</p>
          </div>
        </div>
        <button onClick={toggleBookmark} className="p-3 rounded-xl bg-navy-700/50 hover:bg-navy-600/50 transition-colors">
          {bookmarked ? <BookmarkSolid className="w-6 h-6 text-neon-yellow" /> : <BookmarkIcon className="w-6 h-6 text-gray-400" />}
        </button>
      </div>

      {/* Info cards row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Skor Aman', value: prediction?.predicted.totalScore.toFixed(1), sub: <LevelBadge level={prediction?.level || 'Aman'} /> },
          { label: 'Daya Tampung', value: prediction?.predictedCapacity },
          { label: 'Akreditasi', value: major.accreditation },
          (() => {
            const pct = prediction?.predictedCapacity && prediction?.predictedApplicants
              ? (prediction.predictedCapacity / prediction.predictedApplicants) * 100 : null;
            const keketatanLabel = pct !== null
              ? pct < 4 ? { text: 'Sangat Ketat', color: 'text-red-400' }
              : pct < 7 ? { text: 'Lumayan Ketat', color: 'text-yellow-400' }
              : { text: 'Ketat', color: 'text-emerald-400' }
              : null;
            return {
              label: 'Keketatan',
              value: pct !== null ? `${pct.toFixed(1)}%` : '-',
              sub: keketatanLabel ? <span className={`text-[11px] font-semibold ${keketatanLabel.color}`}>{keketatanLabel.text}</span> : null,
            };
          })(),
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card text-center">
            <p className="text-xs text-gray-400">{item.label}</p>
            <p className="text-xl font-bold mt-1 text-cyan-glow">{item.value}</p>
            {item.sub && <div className="mt-2">{item.sub}</div>}
          </motion.div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="bg-navy-800/40 border border-red-500/20 rounded-lg px-4 py-3 relative overflow-hidden flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50"></div>
        <h3 className="text-red-400 font-semibold flex items-center gap-1.5 text-xs whitespace-nowrap">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Disclaimer
        </h3>
        <div className="text-[11px] text-gray-400 leading-snug">
          Hasil prediksi pada aplikasi ini adalah estimasi berbasis data historis dan bukan keakuratan mutlak 100%. Keputusan lulus sepenuhnya berada pada kewenangan panitia SNBT.
        </div>
      </div>

      {/* Subtes Pendukung */}
      <div className="card">
        <h2 className="font-semibold mb-4">Subtes Pendukung</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {getSubtesForMajor(major.name).map((subtes, i) => (
            <div key={i} className="bg-navy-700/50 hover:bg-navy-600/50 transition-colors rounded-lg p-4 text-center flex flex-col justify-center items-center gap-1 border border-navy-600/30">
              <span className="px-2 py-0.5 rounded-md bg-cyan-900/40 text-cyan-glow text-[10px] font-bold tracking-wider uppercase">
                Prioritas {i + 1}
              </span>
              <p className="text-sm font-semibold text-gray-200 mt-1 leading-snug">{subtes}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rekomendasi Prodi - Same accreditation, lower score */}
      {similarMajors.length > 0 && (
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-semibold text-lg">Rekomendasi Prodi Serupa</h2>
              <p className="text-xs text-gray-400 mt-1">Akreditasi <span className="text-cyan-glow font-semibold">{major.accreditation}</span> · Skor lebih rendah</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-cyan-900/30 text-cyan-glow text-[10px] font-bold tracking-wider border border-cyan-glow/20">
              {similarMajors.length} PRODI
            </span>
          </div>
          <div className="grid gap-3">
            {similarMajors.map((sm, i) => (
              <motion.div
                key={sm.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={`/prodi/${sm.id}`}
                  className="group flex items-center gap-4 bg-navy-700/40 hover:bg-navy-700/70 border border-navy-600/30 hover:border-cyan-glow/30 rounded-xl p-4 transition-all duration-300"
                >
                  {/* Avatar & Rank */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-sm font-bold text-cyan-glow/50">{i + 1}</span>
                    <UniversityAvatar name={sm.university} size={40} className="shadow-sm" />
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-100 group-hover:text-cyan-glow transition-colors truncate">
                      {sm.degree} {sm.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{sm.university} · {sm.universityCity}</p>
                  </div>
                  {/* Score + Badge */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-100 font-mono">{sm.minScore.toFixed(1)}</p>
                      <p className="text-[10px] text-gray-500">Skor Min</p>
                    </div>
                    <LevelBadge level={sm.level} />
                    <ArrowTopRightOnSquareIcon className="w-4 h-4 text-gray-500 group-hover:text-cyan-glow transition-colors" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Score Simulator */}
      <div className="card">
        <h2 className="font-semibold mb-4">Simulasi Skor UTBK</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1 w-full">
            <input
              type="number"
              placeholder="Masukkan total skor UTBK-mu..."
              value={simScore}
              onChange={e => setSimScore(e.target.value)}
              className="input-field"
            />
          </div>
          {simResult && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={`text-lg font-bold ${simResult.color}`}>
              {simResult.text}
            </motion.div>
          )}
        </div>
        {simScore && prediction && (
          <div className="mt-3 text-sm text-gray-400">
            Skor prediksi minimum: <span className="text-cyan-glow font-semibold">{prediction.predicted.totalScore.toFixed(1)}</span> | Skor kamu: <span className="font-semibold">{simScore}</span> | Selisih: <span className={parseFloat(simScore) >= prediction.predicted.totalScore ? 'text-emerald-400' : 'text-red-400'}>{(parseFloat(simScore) - prediction.predicted.totalScore).toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Info grid */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="card">
          <p className="text-xs text-gray-400">Gelar</p>
          <p className="font-semibold mt-1">{major.degree}</p>
        </div>
        <div className="card">
          <p className="text-xs text-gray-400">Kategori</p>
          <p className="font-semibold mt-1">{major.category}</p>
        </div>
        <div className="card">
          <p className="text-xs text-gray-400">Rasio Keketatan</p>
          <p className="font-semibold mt-1">{major.latestRatio}:1</p>
        </div>
      </div>


    </div>
  );
}
