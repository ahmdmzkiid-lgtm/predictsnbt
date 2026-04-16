// Mapping of Universities to their official website domains
// This is used to fetch their real logos via Clearbit Logo API or Google Favicon
const DOMAIN_MAP = {
  // === Top Universities ===
  "Universitas Indonesia": "ui.ac.id",
  "Universitas Gadjah Mada": "ugm.ac.id",
  "Institut Teknologi Bandung": "itb.ac.id",
  "Institut Pertanian Bogor": "ipb.ac.id",
  "Universitas Airlangga": "unair.ac.id",
  "Institut Teknologi Sepuluh Nopember": "its.ac.id",
  "Universitas Diponegoro": "undip.ac.id",
  "Universitas Padjadjaran": "unpad.ac.id",
  "Universitas Brawijaya": "ub.ac.id",
  "Universitas Hasanuddin": "unhas.ac.id",
  "Universitas Sumatera Utara": "usu.ac.id",
  "Universitas Sebelas Maret": "uns.ac.id",
  "Universitas Andalas": "unand.ac.id",
  "Universitas Sriwijaya": "unsri.ac.id",
  "Universitas Udayana": "unud.ac.id",

  // === Education Universities ===
  "Universitas Negeri Semarang": "unnes.ac.id",
  "Universitas Negeri Yogyakarta": "uny.ac.id",
  "Universitas Negeri Surabaya": "unesa.ac.id",
  "Universitas Negeri Malang": "um.ac.id",
  "Universitas Negeri Jakarta": "unj.ac.id",
  "Universitas Pendidikan Indonesia": "upi.edu",
  "Universitas Negeri Medan": "unimed.ac.id",
  "Universitas Negeri Padang": "unp.ac.id",
  "Universitas Negeri Makassar": "unm.ac.id",
  "Universitas Negeri Gorontalo": "ung.ac.id",

  // === Other Major Universities ===
  "Universitas Riau": "unri.ac.id",
  "Universitas Lampung": "unila.ac.id",
  "Universitas Syiah Kuala": "usk.ac.id",
  "Universitas Jenderal Soedirman": "unsoed.ac.id",
  "Universitas Jember": "unej.ac.id",
  "Universitas Sam Ratulangi": "unsrat.ac.id",
  "Universitas Tanjungpura": "untan.ac.id",
  "Universitas Lambung Mangkurat": "ulm.ac.id",
  "Universitas Mulawarman": "unmul.ac.id",
  "Universitas Sultan Ageng Tirtayasa": "untirta.ac.id",
  "Universitas Tadulako": "untad.ac.id",
  "Universitas Halu Oleo": "uho.ac.id",
  "Universitas Mataram": "unram.ac.id",
  "Universitas Nusa Cendana": "undana.ac.id",
  "Universitas Pattimura": "unpatti.ac.id",
  "Universitas Cenderawasih": "uncen.ac.id",
  "Universitas Jambi": "unja.ac.id",
  "Universitas Bengkulu": "unib.ac.id",
  "Universitas Palangka Raya": "upr.ac.id",
  "Universitas Pendidikan Ganesha": "undiksha.ac.id",
  "Universitas Pertamina": "universitaspertamina.ac.id",
  "Universitas Singaperbangsa Karawang": "unsika.ac.id",
  "Universitas Trunojoyo Madura": "trunojoyo.ac.id",
  "Universitas Tidar": "untidar.ac.id",
  "Universitas Malikussaleh": "unimal.ac.id",

  // === Politeknik ===
  "Politeknik Negeri Jakarta": "pnj.ac.id",
  "Politeknik Negeri Bandung": "polban.ac.id",
  "Politeknik Negeri Semarang": "polines.ac.id",
  "Politeknik Elektronika Negeri Surabaya": "pens.ac.id",
  "Politeknik Negeri Malang": "polinema.ac.id",
  "Politeknik Negeri Bali": "pnb.ac.id",

  // === Institut ===
  "Institut Teknologi Sumatera": "itera.ac.id",
  "Institut Teknologi Kalimantan": "itk.ac.id",
  "Institut Seni Indonesia Yogyakarta": "isi.ac.id",
  "Institut Seni Indonesia Surakarta": "isi-ska.ac.id",
  "Institut Seni Indonesia Denpasar": "isi-dps.ac.id",

  // === UPN Veteran ===
  "Universitas Pembangunan Nasional Veteran Jakarta": "upnvj.ac.id",
  "Universitas Pembangunan Nasional Veteran Jawa Timur": "upnjatim.ac.id",
  "Universitas Pembangunan Nasional Veteran Yogyakarta": "upnyk.ac.id",
};

/**
 * Get the logo URL for a university, or null if not available.
 * Using Clearbit Logo API which turns domain names into reliable high quality logos.
 */
export function getUniversityLogo(name) {
  const domain = DOMAIN_MAP[name];
  if (domain) {
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=256`;
  }
  return null;
}

/**
 * Get initials from a university name for fallback avatar.
 * e.g. "Universitas Indonesia" → "UI"
 */
export function getUniversityInitials(name) {
  const skipWords = new Set(['dan', 'of', 'the', '&']);
  return name
    .split(' ')
    .filter(w => !skipWords.has(w.toLowerCase()))
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 4);
}
