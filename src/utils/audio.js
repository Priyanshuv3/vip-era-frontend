export function calculateRMS(dataArray) {
  let sum = 0;
  for (let i = 0; i < dataArray.length; i++) {
    const v = dataArray[i] / 128.0;
    sum += Math.abs(v - 1);
  }
  return sum / dataArray.length;
}

export function calculateZeroCrossings(dataArray) {
  let zeroCrossings = 0;
  for (let i = 1; i < dataArray.length; i++) {
    if ((dataArray[i - 1] - 128) * (dataArray[i] - 128) < 0) zeroCrossings++;
  }
  return zeroCrossings;
}

export function calculateBlowScore(dataArray) {
  const rmsVal = calculateRMS(dataArray);
  const zeroCrossings = calculateZeroCrossings(dataArray);
  return Math.min(100, Math.floor(rmsVal * 300 + zeroCrossings * 0.05));
}
