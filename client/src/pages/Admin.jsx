import { useState, useEffect } from 'react';
import api from '../api/axios';
import { motion } from 'framer-motion';
import { PlusIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

const tabs = ['Universitas', 'Prodi', 'Statistik'];

export default function Admin() {
  const [activeTab, setActiveTab] = useState(0);
  const [universities, setUniversities] = useState([]);
  const [majors, setMajors] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null); // { type: 'add' | 'edit', data }
  const [selectedUni, setSelectedUni] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');

  // Form state
  const [form, setForm] = useState({});

  const loadUniversities = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/universities');
      setUniversities(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const loadMajors = async (uniId) => {
    setLoading(true);
    try {
      const url = uniId ? `/admin/majors?universityId=${uniId}` : '/admin/majors';
      const res = await api.get(url);
      setMajors(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const loadStats = async (majorId) => {
    setLoading(true);
    try {
      const res = await api.get(`/admin/statistics/${majorId}`);
      setStats(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadUniversities(); }, []);
  useEffect(() => { if (activeTab === 1) loadMajors(selectedUni); }, [activeTab, selectedUni]);
  useEffect(() => { if (activeTab === 2 && selectedMajor) loadStats(selectedMajor); }, [activeTab, selectedMajor]);

  const handleSave = async () => {
    try {
      if (activeTab === 0) {
        if (modal.type === 'add') await api.post('/admin/universities', form);
        else await api.put(`/admin/universities/${form.id}`, form);
        loadUniversities();
      } else if (activeTab === 1) {
        if (modal.type === 'add') await api.post('/admin/majors', form);
        else await api.put(`/admin/majors/${form.id}`, form);
        loadMajors(selectedUni);
      } else {
        if (modal.type === 'add') await api.post('/admin/statistics', form);
        else await api.put(`/admin/statistics/${form.id}`, form);
        loadStats(selectedMajor);
      }
      setModal(null);
    } catch (err) { alert(err.response?.data?.error || 'Error saving'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus?')) return;
    try {
      if (activeTab === 0) { await api.delete(`/admin/universities/${id}`); loadUniversities(); }
      else if (activeTab === 1) { await api.delete(`/admin/majors/${id}`); loadMajors(selectedUni); }
      else { await api.delete(`/admin/statistics/${id}`); loadStats(selectedMajor); }
    } catch (err) { alert(err.response?.data?.error || 'Error deleting'); }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">⚙️ Admin Panel</h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-navy-800/50 rounded-lg p-1">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all ${
              activeTab === i ? 'bg-cyan-glow text-navy-900' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Universitas Tab */}
      {activeTab === 0 && (
        <div>
          <div className="flex justify-between mb-4">
            <p className="text-sm text-gray-400">{universities.length} universitas</p>
            <button onClick={() => { setForm({ name: '', city: '', province: '' }); setModal({ type: 'add' }); }} className="btn-primary text-sm flex items-center gap-1">
              <PlusIcon className="w-4 h-4" /> Tambah
            </button>
          </div>
          <div className="overflow-x-auto rounded-xl border border-navy-600/50">
            <table className="w-full text-sm">
              <thead><tr className="bg-navy-800/80 border-b border-navy-600/50">
                <th className="text-left px-4 py-3">Nama</th>
                <th className="text-left px-4 py-3">Kota</th>
                <th className="text-left px-4 py-3">Provinsi</th>
                <th className="px-4 py-3 w-24">Aksi</th>
              </tr></thead>
              <tbody>
                {universities.map(u => (
                  <tr key={u.id} className="border-b border-navy-600/30 hover:bg-navy-700/30">
                    <td className="px-4 py-3">{u.name}</td>
                    <td className="px-4 py-3 text-gray-400">{u.city}</td>
                    <td className="px-4 py-3 text-gray-400">{u.province}</td>
                    <td className="px-4 py-3 flex gap-1 justify-center">
                      <button onClick={() => { setForm(u); setModal({ type: 'edit' }); }} className="p-1.5 hover:bg-navy-600/50 rounded"><PencilIcon className="w-4 h-4 text-cyan-glow" /></button>
                      <button onClick={() => handleDelete(u.id)} className="p-1.5 hover:bg-red-500/20 rounded"><TrashIcon className="w-4 h-4 text-red-400" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Prodi Tab */}
      {activeTab === 1 && (
        <div>
          <div className="flex flex-wrap gap-3 mb-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs text-gray-400 mb-1">Filter PTN</label>
              <select value={selectedUni} onChange={e => setSelectedUni(e.target.value)} className="input-field">
                <option value="">Semua PTN</option>
                {universities.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
            </div>
            <button onClick={() => { setForm({ name: '', universityId: selectedUni || '', category: 'SAINTEK', accreditation: 'B', degree: 'S1', estimatedUkt: 5000000 }); setModal({ type: 'add' }); }} className="btn-primary text-sm flex items-center gap-1">
              <PlusIcon className="w-4 h-4" /> Tambah Prodi
            </button>
          </div>
          <div className="overflow-x-auto rounded-xl border border-navy-600/50">
            <table className="w-full text-sm">
              <thead><tr className="bg-navy-800/80 border-b border-navy-600/50">
                <th className="text-left px-4 py-3">Prodi</th>
                <th className="text-left px-4 py-3">PTN</th>
                <th className="text-left px-4 py-3">Kategori</th>
                <th className="text-left px-4 py-3">Akreditasi</th>
                <th className="px-4 py-3 w-24">Aksi</th>
              </tr></thead>
              <tbody>
                {majors.slice(0, 50).map(m => (
                  <tr key={m.id} className="border-b border-navy-600/30 hover:bg-navy-700/30">
                    <td className="px-4 py-3">{m.name}</td>
                    <td className="px-4 py-3 text-gray-400">{m.university?.name}</td>
                    <td className="px-4 py-3 text-gray-400">{m.category}</td>
                    <td className="px-4 py-3">{m.accreditation}</td>
                    <td className="px-4 py-3 flex gap-1 justify-center">
                      <button onClick={() => { setForm(m); setModal({ type: 'edit' }); }} className="p-1.5 hover:bg-navy-600/50 rounded"><PencilIcon className="w-4 h-4 text-cyan-glow" /></button>
                      <button onClick={() => handleDelete(m.id)} className="p-1.5 hover:bg-red-500/20 rounded"><TrashIcon className="w-4 h-4 text-red-400" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Statistik Tab */}
      {activeTab === 2 && (
        <div>
          <div className="flex flex-wrap gap-3 mb-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs text-gray-400 mb-1">Pilih Prodi (Major ID)</label>
              <input type="number" placeholder="Major ID" value={selectedMajor} onChange={e => setSelectedMajor(e.target.value)} className="input-field" />
            </div>
            <button onClick={() => { setForm({ majorId: selectedMajor, year: 2026, minScore: 0, applicants: 0, capacity: 0, tpsScore: 0, litBiScore: 0, litBingScore: 0, pmScore: 0 }); setModal({ type: 'add' }); }} className="btn-primary text-sm flex items-center gap-1">
              <PlusIcon className="w-4 h-4" /> Tambah Stats
            </button>
          </div>
          {stats.length > 0 && (
            <div className="overflow-x-auto rounded-xl border border-navy-600/50">
              <table className="w-full text-sm">
                <thead><tr className="bg-navy-800/80 border-b border-navy-600/50">
                  <th className="text-left px-4 py-3">Tahun</th>
                  <th className="text-left px-4 py-3">Skor Min</th>
                  <th className="text-left px-4 py-3">Peminat</th>
                  <th className="text-left px-4 py-3">Kapasitas</th>
                  <th className="px-4 py-3 w-24">Aksi</th>
                </tr></thead>
                <tbody>
                  {stats.map(s => (
                    <tr key={s.id} className="border-b border-navy-600/30 hover:bg-navy-700/30">
                      <td className="px-4 py-3">{s.year}</td>
                      <td className="px-4 py-3">{s.minScore}</td>
                      <td className="px-4 py-3">{s.applicants}</td>
                      <td className="px-4 py-3">{s.capacity}</td>
                      <td className="px-4 py-3 flex gap-1 justify-center">
                        <button onClick={() => { setForm(s); setModal({ type: 'edit' }); }} className="p-1.5 hover:bg-navy-600/50 rounded"><PencilIcon className="w-4 h-4 text-cyan-glow" /></button>
                        <button onClick={() => handleDelete(s.id)} className="p-1.5 hover:bg-red-500/20 rounded"><TrashIcon className="w-4 h-4 text-red-400" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setModal(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card max-w-lg w-full max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">{modal.type === 'add' ? 'Tambah' : 'Edit'} {tabs[activeTab]}</h3>
              <button onClick={() => setModal(null)}><XMarkIcon className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3">
              {Object.keys(form).filter(k => k !== 'id' && k !== 'university' && k !== 'statistics' && k !== 'bookmarks' && k !== 'majors').map(key => (
                <div key={key}>
                  <label className="block text-xs text-gray-400 mb-1">{key}</label>
                  {key === 'category' ? (
                    <select value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} className="input-field">
                      <option value="SAINTEK">SAINTEK</option>
                      <option value="SOSHUM">SOSHUM</option>
                      <option value="CAMPURAN">CAMPURAN</option>
                    </select>
                  ) : (
                    <input
                      type={typeof form[key] === 'number' ? 'number' : 'text'}
                      value={form[key]}
                      onChange={e => setForm({ ...form, [key]: typeof form[key] === 'number' ? parseFloat(e.target.value) || 0 : e.target.value })}
                      className="input-field"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setModal(null)} className="btn-secondary flex-1">Batal</button>
              <button onClick={handleSave} className="btn-primary flex-1">Simpan</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
