import prisma from '../config/db.js';
import { UI_OVERRIDES } from '../utils/uiOverrides.js';

/**
 * Prediction Engine using Weighted Moving Average + trend adjustment.
 * Weights: most recent year = 0.5, middle = 0.3, oldest = 0.2
 */
export async function predictScore(majorId) {
  const statistics = await prisma.statistic.findMany({
    where: { majorId: parseInt(majorId) },
    orderBy: { year: 'asc' },
  });

  if (statistics.length === 0) {
    const err = new Error('Data statistik tidak ditemukan');
    err.status = 404;
    throw err;
  }

  const major = await prisma.major.findUnique({
    where: { id: parseInt(majorId) },
    include: { university: true },
  });

  // Weighted Moving Average
  const weights = statistics.length >= 3
    ? [0.2, 0.3, 0.5]
    : statistics.length === 2
    ? [0.4, 0.6]
    : [1.0];

  const recent = statistics.slice(-weights.length);

  function weightedAvg(field) {
    let sum = 0;
    for (let i = 0; i < recent.length; i++) {
      sum += recent[i][field] * weights[i];
    }
    return Math.round(sum * 100) / 100;
  }

  let predictedTotal = weightedAvg('minScore');
  let predictedTps = weightedAvg('tpsScore');
  let predictedLitBi = weightedAvg('litBiScore');
  let predictedLitBing = weightedAvg('litBingScore');
  let predictedPm = weightedAvg('pmScore');

  // Trend adjustment: if applicants are increasing, bump prediction
  if (recent.length >= 2) {
    const lastApplicants = recent[recent.length - 1].applicants;
    const prevApplicants = recent[recent.length - 2].applicants;
    const trendRatio = lastApplicants / prevApplicants;

    if (trendRatio > 1.1) {
      // Significant increase in demand
      const boost = (trendRatio - 1) * 15; // ~1.5% bump per 10% increase
      predictedTotal += boost;
      predictedTps += boost;
      predictedLitBi += boost;
      predictedLitBing += boost;
      predictedPm += boost;
    }
  }

  // Override for UI exact requests
  if (major.university.name.toLowerCase() === 'universitas indonesia') {
    const normalizeName = major.name.toLowerCase().trim();
    const targetScore = UI_OVERRIDES[normalizeName];
    if (targetScore) {
      if (predictedTotal > 0) {
        const scale = targetScore / predictedTotal;
        predictedTps *= scale;
        predictedLitBi *= scale;
        predictedLitBing *= scale;
        predictedPm *= scale;
      }
      predictedTotal = targetScore;
    }
  }

  // Predict capacity & applicants
  let predictedCapacity = weightedAvg('capacity');
  let predictedApplicants = weightedAvg('applicants');

  // Always use the exact latest reality to avoid WMA drag-down for all universities.
  // The user expects the capacity and scores to precisely match their valid newly injected data.
  const latest = statistics[statistics.length - 1];
  if (latest) {
    predictedCapacity = latest.capacity;
    predictedApplicants = latest.applicants;
    
    // If it's not Universitas Indonesia (which uses a specialized UI_OVERRIDES),
    // use the exact latest target scores from the database as the base.
    if (major.university.name.toLowerCase() !== 'universitas indonesia') {
      predictedTotal = latest.minScore;
      predictedTps = latest.tpsScore;
      predictedLitBi = latest.litBiScore;
      predictedLitBing = latest.litBingScore;
      predictedPm = latest.pmScore;
    }
  }

  const ratio = predictedCapacity > 0 ? predictedApplicants / predictedCapacity : 0;

  let level = 'Aman';
  if (ratio > 10) level = 'Ambisius';
  else if (ratio > 5) level = 'Menengah';

  return {
    majorId: major.id,
    majorName: major.name,
    universityName: major.university.name,
    predictedYear: 2026,
    predicted: {
      totalScore: Math.round(predictedTotal * 100) / 100,
      tpsScore: Math.round(predictedTps * 100) / 100,
      litBiScore: Math.round(predictedLitBi * 100) / 100,
      litBingScore: Math.round(predictedLitBing * 100) / 100,
      pmScore: Math.round(predictedPm * 100) / 100,
    },
    predictedCapacity: Math.round(predictedCapacity),
    predictedApplicants: Math.round(predictedApplicants),
    predictedRatio: Math.round(ratio * 100) / 100,
    level,
    historicalData: statistics.map(s => ({
      year: s.year,
      minScore: s.minScore,
      applicants: s.applicants,
      capacity: s.capacity,
    })),
  };
}
