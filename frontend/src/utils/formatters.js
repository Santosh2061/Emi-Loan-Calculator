export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(value);

export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

export const stripCommas = (value) => String(value).replace(/,/g, '');

export const formatAmountWithCommas = (value) => {
  const digits = String(value).replace(/\D/g, '');
  if (!digits) return '';
  return Number(digits).toLocaleString('en-IN');
};

export const parseAmount = (value) => {
  const cleaned = stripCommas(value).trim();
  if (!cleaned) return NaN;
  return Number(cleaned);
};

export const sanitizeInterestInput = (value) => {
  let cleaned = String(value).replace(/[^\d.]/g, '');
  const parts = cleaned.split('.');
  if (parts.length > 2) {
    cleaned = `${parts[0]}.${parts.slice(1).join('')}`;
  }
  return cleaned;
};

export const sanitizeYearsInput = (value) => String(value).replace(/\D/g, '');
