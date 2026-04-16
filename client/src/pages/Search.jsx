import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { motion } from 'framer-motion';
import LevelBadge from '../components/LevelBadge';
import SkeletonLoader from '../components/SkeletonLoader';
import UniversityAvatar from '../components/UniversityAvatar';
import { MagnifyingGlassIcon, FunnelIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Search() {
  const [results, setResults] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Filter state
  const [query, setQuery] = useState('');
  const [university, setUniversity] = useState('');
  const [category, setCategory] = useState('');
  const [province, setProvince] = useState('');
  const [accreditation, setAccreditation] = useState('');
  const [degree, setDegree] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('name');
  const [order, setOrder] = useState('asc');

  // Debounce search
  const [queryDebounceTimer, setQueryDebounceTimer] = useState(null);
  const [univDebounceTimer, setUnivDebounceTimer] = useState(null);

  const fetchFilters = async () => {
    try {
      const res = await api.get('/majors/filters');
      setFilters(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchResults = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.set('q', query);
      if (university) params.set('university', university);
      if (category) params.set('category', category);
      if (province) params.set('province', province);
      if (accreditation) params.set('accreditation', accreditation);
      if (degree) params.set('degree', degree);
      params.set('page', page);
      params.set('limit', 20);
      params.set('sort', sort);
      params.set('order', order);

      const res = await api.get(`/majors/search?${params}`);
      setResults(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [query, university, category, province, accreditation, page, sort, order]);

  useEffect(() => { fetchFilters(); }, []);
  useEffect(() => { fetchResults(); }, [fetchResults]);

  const handleQueryChange = (val) => {
    if (queryDebounceTimer) clearTimeout(queryDebounceTimer);
    const timer = setTimeout(() => {
      setQuery(val);
      setPage(1);
    }, 300);
    setQueryDebounceTimer(timer);
  };

  const handleUniversityChange = (val) => {
    if (univDebounceTimer) clearTimeout(univDebounceTimer);
    const timer = setTimeout(() => {
      setUniversity(val);
      setPage(1);
    }, 300);
    setUnivDebounceTimer(timer);
  };
  const handleSort = (col) => {
    if (sort === col) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSort(col);
      setOrder('asc');
    }
    setPage(1);
  };

  const SortIcon = ({ col }) => {
    if (sort !== col) return null;
    return order === 'asc' ? <ChevronUpIcon className="w-4 h-4 inline" /> : <ChevronDownIcon className="w-4 h-4 inline" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Cari Program Studi</h1>
        <p className="text-gray-400 text-sm mt-1">Cari dari ribuan prodi di seluruh PTN Indonesia</p>
      </div>

      {/* Search bars */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Cari Universitas..."
            onChange={e => handleUniversityChange(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Cari Prodi..."
            onChange={e => handleQueryChange(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <button onClick={() => setShowFilters(!showFilters)} className="btn-secondary flex items-center gap-2 justify-center">
          <FunnelIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Filter</span>
        </button>
      </div>

      {/* Filters */}
      {showFilters && filters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="card grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          <div>
            <label className="block text-xs text-gray-400 mb-1">Jenjang</label>
            <select value={degree} onChange={e => { setDegree(e.target.value); setPage(1); }} className="input-field">
              <option value="">Semua</option>
              {filters.degrees?.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Kategori</label>
            <select value={category} onChange={e => { setCategory(e.target.value); setPage(1); }} className="input-field">
              <option value="">Semua</option>
              {filters.categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Provinsi</label>
            <select value={province} onChange={e => { setProvince(e.target.value); setPage(1); }} className="input-field">
              <option value="">Semua</option>
              {filters.provinces.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Akreditasi</label>
            <select value={accreditation} onChange={e => { setAccreditation(e.target.value); setPage(1); }} className="input-field">
              <option value="">Semua</option>
              {filters.accreditations.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
        </motion.div>
      )}

      {/* Results count */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-400">
          {loading ? 'Memuat...' : `${pagination.total?.toLocaleString() || 0} prodi ditemukan`}
        </p>
        <p className="text-sm text-gray-500">
          Halaman {pagination.page || 1} / {pagination.totalPages || 1}
        </p>
      </div>

      {/* Table */}
      {loading ? (
        <SkeletonLoader rows={8} cols={6} />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-navy-600/50">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy-800/80 border-b border-navy-600/50">
                <th className="text-left px-4 py-3 cursor-pointer hover:text-cyan-glow transition-colors" onClick={() => handleSort('university')}>
                  PTN <SortIcon col="university" />
                </th>
                <th className="text-left px-4 py-3 cursor-pointer hover:text-cyan-glow transition-colors" onClick={() => handleSort('name')}>
                  Prodi <SortIcon col="name" />
                </th>
                <th className="text-left px-4 py-3 cursor-pointer hover:text-cyan-glow transition-colors" onClick={() => handleSort('minScore')}>
                  Skor Min <SortIcon col="minScore" />
                </th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Daya Tampung</th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">Peminat</th>
                <th className="text-left px-4 py-3">Level</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <motion.tr
                  key={r.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="border-b border-navy-600/30 hover:bg-navy-700/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <UniversityAvatar name={r.university} size={32} />
                      <div>
                        <p className="font-medium text-gray-200">{r.university}</p>
                        <p className="text-xs text-gray-500">{r.province}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Link to={`/prodi/${r.id}`} className="text-cyan-glow hover:underline font-medium">
                      {r.name}
                    </Link>
                    <p className="text-xs text-gray-500">{r.degree} • {r.category} • {r.accreditation}</p>
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-200">{r.minScore.toFixed(1)}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-400">{r.capacity}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-gray-400">{r.applicants.toLocaleString()}</td>
                  <td className="px-4 py-3"><LevelBadge level={r.level} /></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!loading && pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page <= 1}
            className="btn-secondary px-4 py-2 text-sm disabled:opacity-30"
          >
            ← Prev
          </button>
          {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
            const start = Math.max(1, Math.min(page - 2, pagination.totalPages - 4));
            const p = start + i;
            if (p > pagination.totalPages) return null;
            return (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  p === page ? 'bg-cyan-glow text-navy-900 font-bold' : 'bg-navy-700/50 hover:bg-navy-600/50'
                }`}
              >
                {p}
              </button>
            );
          })}
          <button
            onClick={() => setPage(Math.min(pagination.totalPages, page + 1))}
            disabled={page >= pagination.totalPages}
            className="btn-secondary px-4 py-2 text-sm disabled:opacity-30"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
