import Papa from 'papaparse';

const units: { [key: string]: number } = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
};

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

export const getRelativeTimeFromNow = (date: Date): string | undefined => {
  const elapsed = new Date(date).getTime() - Date.now();

  for (const u in units) {
    if (Math.abs(elapsed) > units[u] || u === 'second') {
      return rtf.format(Math.round(elapsed / units[u]), u as Intl.RelativeTimeFormatUnit);
    }
  }
};

export const exportToCSVAndDownload = (data: any[], filename: string) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    console.error('No data to export');
    return;
  }
  // generate csv content using papaparse
  const csvContent = Papa.unparse(data);

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
