export default function LevelBadge({ level }) {
  const cls = level === 'Aman' ? 'badge-aman' : level === 'Menengah' ? 'badge-menengah' : 'badge-ambisius';
  return <span className={cls}>{level}</span>;
}
