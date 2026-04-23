export const fmtFCFA = (n) => {
  if (Math.abs(n) >= 1e9) return (n / 1e9).toFixed(2) + "Md";
  if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(2) + "M";
  if (Math.abs(n) >= 1e3) return (n / 1e3).toFixed(0) + "k";
  return Math.round(n).toString();
};

export const fmtFCFAfull = (n) =>
  new Intl.NumberFormat("fr-FR").format(Math.round(n));

export function projectDCA({ monthly, years, annualRate }) {
  const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
  const data = [];
  let value = 0;
  let invested = 0;
  for (let m = 0; m <= years * 12; m++) {
    if (m > 0) {
      value = value * (1 + monthlyRate) + monthly;
      invested += monthly;
    }
    if (m % 12 === 0) {
      data.push({
        year: m / 12,
        invested,
        value: Math.round(value),
        gain: Math.round(value - invested),
        monthlyDividend: Math.round((value * 0.08) / 12),
      });
    }
  }
  return data;
}
