// Currency formatter
export const formatCurrency = (amount: number, currency = 'BRL'): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  }).format(amount);
};

// Date formatter
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR').format(date);
};

// Percentage formatter
export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
};

// Generate a random color
export const generateRandomColor = (): string => {
  const colors = [
    '#0DB4B9', // Teal
    '#1F4287', // Blue
    '#FFD700', // Gold
    '#7E57C2', // Purple
    '#26A69A', // Green
    '#EF5350', // Red
    '#FF9800', // Orange
    '#42A5F5', // Light Blue
  ];
  
  return colors[Math.floor(Math.random() * colors.length)];
};

// Truncate text with ellipsis
export const truncateText = (text: string, maxLength = 25): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};