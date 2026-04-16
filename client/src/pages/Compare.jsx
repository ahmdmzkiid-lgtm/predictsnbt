import { useState } from 'react';
import api from '../api/axios';
import { motion } from 'framer-motion';
import LevelBadge from '../components/LevelBadge';
import { MagnifyingGlassIcon, XMarkIcon, ScaleIcon } from '@heroicons/react/24/outline';

export default function Compare() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selected, setSelected] = useState([]);
  const [compareData, setCompareData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  const search = async (q) => {
    if (!q || q.length < 2) { setSearchResults([]); return; }
    setSearching(true);
    try {
      const res = await api.get(`/majors/search?q=${q}&limit=10`);
      setSearchResults(res.data.data);
    } catch (err) { console.error(err); }
    finally { setSearching(false); }
  };

  const addSelection = (major) => {
    if (selected.length >= 3) return;
    if (selected.find(s => s.id === major.id)) return;
    setSelected([...selected, major]);
    setSearchQuery('');
    setSearchResults([]);
  };

  const removeSelection = (id) => {
    setSelected(selected.filter(s => s.id !== id));
    setCompareData(null);
  };

  const doCompare = async () => {
    if (selected.length < 2) return;
    setLoading(true);
    try {
      const res = await api.post('/compare', { majorIds: selected.map(s => s.id) });
      setCompareData(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const getBest = (field) => {
    if (!compareData) return null;
    if (field === 'minScore') return compareData.reduce((a, b) => a[field] < b[field] ? a : b).id;
    if (field === 'capacity') return compareData.reduce((a, b) => a[field] > b[field] ? a : b).id;
    if (field === 'ratio') return compareData.reduce((a, b) => a[field] < b[field] ? a : b).id;
    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Bandingkan Prodi</h1>
        <p className="text-gray-400 text-sm mt-1">Bandingkan 2-3 program studi secara berdampingan</p>
      </div>

      {/* Search to add */}
      <div className="card">
        <label className="block text-sm text-gray-400 mb-2">Tambah prodi (maks 3)</label>
        <div className="relative">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); search(e.target.value); }}
            placeholder="Cari prodi untuk dibandingkan..."
            className="input-field pl-10"
            disabled={selected.length >= 3}
          />
        </div>

        {/* Search dropdown */}
        {searchResults.length > 0 && (
          <div className="mt-2 bg-navy-700 rounded-lg border border-navy-600/50 max-h-60 overflow-y-auto">
            {searchResults.map(r => (
              <button
                key={r.id}
                onClick={() => addSelection(r)}
                className="w-full text-left px-4 py-3 hover:bg-navy-600/50 transition-colors border-b border-navy-600/30 last:border-0"
              >
                <p className="font-medium text-sm">{r.name}</p>
                <p className="text-xs text-gray-400">{r.university} — {r.category}</p>
              </button>
            ))}
          </div>
        )}

        {/* Selected chips */}
        <div className="flex flex-wrap gap-2 mt-3">
          {selected.map(s => (
            <span key={s.id} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-glow/10 border border-cyan-glow/30 text-sm">
              {s.name}
              <button onClick={() => removeSelection(s.id)} className="ml-1 hover:text-red-400">
                <XMarkIcon className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>

        {selected.length >= 2 && (
          <button onClick={doCompare} disabled={loading} className="btn-primary mt-4 flex items-center gap-2">
            <ScaleIcon className="w-5 h-5" />
            {loading ? 'Memuat...' : 'Bandingkan'}
          </button>
        )}
      </div>

      {/* Comparison grid */}
      {compareData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${compareData.length}, minmax(0, 1fr))` }}
        >
          {compareData.map((item, i) => {
            const bestScore = getBest('minScore');
            const bestCapacity = getBest('capacity');
            const bestRatio = getBest('ratio');

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`card ${item.id === bestScore ? 'border-cyan-glow/50 shadow-neon' : ''}`}
              >
                {item.id === bestScore && (
                  <div className="text-xs text-cyan-glow font-pixel mb-3">⭐ RECOMMENDED</div>
                )}
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{item.university} — {item.city}</p>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Kategori</span>
                    <span className="text-sm font-medium">{item.category}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Akreditasi</span>
                    <span className="text-sm font-medium">{item.accreditation}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Skor Minimum</span>
                    <span className={`text-sm font-bold ${item.id === bestScore ? 'text-cyan-glow' : ''}`}>{item.minScore.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Daya Tampung</span>
                    <span className={`text-sm font-bold ${item.id === bestCapacity ? 'text-emerald-400' : ''}`}>{item.capacity}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Peminat</span>
                    <span className="text-sm font-medium">{item.applicants.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Keketatan</span>
                    <span className={`text-sm font-bold ${item.id === bestRatio ? 'text-emerald-400' : ''}`}>{item.ratio}:1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Level</span>
                    <LevelBadge level={item.level} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">UKT</span>
                    <span className="text-sm font-medium">Rp {(item.estimatedUkt / 1000000).toFixed(1)}jt</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
