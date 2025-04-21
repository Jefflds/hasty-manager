// Account Types
export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'investment' | 'other';
  balance: number;
  currency: string;
  institution: string;
  color?: string;
}

// Credit Card Types
export interface CreditCard {
  id: string;
  name: string;
  institution: string;
  lastFourDigits: string;
  limit: number;
  dueDate: number; // Day of month
  closingDate: number; // Day of month
  currentBalance: number;
  availableCredit: number;
  color?: string;
}

export interface CreditCardExpense {
  id: string;
  cardId: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  installments?: {
    current: number;
    total: number;
  };
}

// Investment Types
export interface Investment {
  id: string;
  name: string;
  type: 'stock' | 'crypto' | 'fixedIncome' | 'realEstate' | 'other';
  initialAmount: number;
  currentAmount: number;
  currency: string;
  purchaseDate: string;
  returnRate: number; // Annual percentage
  notes?: string;
  color?: string;
}

// Transaction Types
export interface Transaction {
  id: string;
  accountId: string;
  type: 'income' | 'expense' | 'transfer';
  amount: number;
  description: string;
  category: string;
  date: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense' | 'both';
  color: string;
  icon?: string;
}