import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Account, CreditCard, Investment, Transaction, Category } from '../types';

interface AppContextType {
  // Data
  accounts: Account[];
  creditCards: CreditCard[];
  investments: Investment[];
  transactions: Transaction[];
  categories: Category[];
  
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  // Account operations
  addAccount: (account: Omit<Account, 'id'>) => void;
  updateAccount: (account: Account) => void;
  deleteAccount: (id: string) => void;
  
  // Credit card operations
  addCreditCard: (creditCard: Omit<CreditCard, 'id'>) => void;
  updateCreditCard: (creditCard: CreditCard) => void;
  deleteCreditCard: (id: string) => void;
  
  // Investment operations
  addInvestment: (investment: Omit<Investment, 'id'>) => void;
  updateInvestment: (investment: Investment) => void;
  deleteInvestment: (id: string) => void;
  
  // Transaction operations
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  
  // Category operations
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Sample data
const initialAccounts: Account[] = [
  {
    id: '1',
    name: 'Conta Corrente',
    type: 'checking',
    balance: 2500,
    currency: 'BRL',
    institution: 'Nubank',
    color: '#9c44dc'
  },
  {
    id: '2',
    name: 'Poupança',
    type: 'savings',
    balance: 15000,
    currency: 'BRL',
    institution: 'Banco do Brasil',
    color: '#ffef36'
  }
];

const initialCreditCards: CreditCard[] = [
  {
    id: '1',
    name: 'Nubank Platinum',
    institution: 'Nubank',
    lastFourDigits: '4567',
    limit: 5000,
    dueDate: 10,
    closingDate: 3,
    currentBalance: 1250,
    availableCredit: 3750,
    color: '#9c44dc'
  }
];

const initialInvestments: Investment[] = [
  {
    id: '1',
    name: 'Tesouro Direto',
    type: 'fixedIncome',
    initialAmount: 10000,
    currentAmount: 10550,
    currency: 'BRL',
    purchaseDate: '2023-01-15',
    returnRate: 5.5,
    color: '#0DB4B9'
  },
  {
    id: '2',
    name: 'Bitcoin',
    type: 'crypto',
    initialAmount: 5000,
    currentAmount: 7500,
    currency: 'BRL',
    purchaseDate: '2022-12-01',
    returnRate: 50,
    color: '#F7931A'
  }
];

const initialTransactions: Transaction[] = [
  {
    id: '1',
    accountId: '1',
    type: 'income',
    amount: 5000,
    description: 'Salário',
    category: 'Renda',
    date: '2023-04-05'
  },
  {
    id: '2',
    accountId: '1',
    type: 'expense',
    amount: 1200,
    description: 'Aluguel',
    category: 'Moradia',
    date: '2023-04-10'
  },
  {
    id: '3',
    accountId: '2',
    type: 'expense',
    amount: 350,
    description: 'Supermercado',
    category: 'Alimentação',
    date: '2023-04-15'
  }
];

const initialCategories: Category[] = [
  { id: '1', name: 'Alimentação', type: 'expense', color: '#FF9800' },
  { id: '2', name: 'Moradia', type: 'expense', color: '#4CAF50' },
  { id: '3', name: 'Transporte', type: 'expense', color: '#2196F3' },
  { id: '4', name: 'Renda', type: 'income', color: '#9C27B0' },
  { id: '5', name: 'Investimentos', type: 'both', color: '#F44336' }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local storage keys
  const STORAGE_PREFIX = 'finance_tracker_';
  const ACCOUNTS_KEY = `${STORAGE_PREFIX}accounts`;
  const CREDIT_CARDS_KEY = `${STORAGE_PREFIX}credit_cards`;
  const INVESTMENTS_KEY = `${STORAGE_PREFIX}investments`;
  const TRANSACTIONS_KEY = `${STORAGE_PREFIX}transactions`;
  const CATEGORIES_KEY = `${STORAGE_PREFIX}categories`;
  const DARK_MODE_KEY = `${STORAGE_PREFIX}dark_mode`;
  
  // State
  const [accounts, setAccounts] = useState<Account[]>(() => {
    const savedAccounts = localStorage.getItem(ACCOUNTS_KEY);
    return savedAccounts ? JSON.parse(savedAccounts) : initialAccounts;
  });
  
  const [creditCards, setCreditCards] = useState<CreditCard[]>(() => {
    const savedCreditCards = localStorage.getItem(CREDIT_CARDS_KEY);
    return savedCreditCards ? JSON.parse(savedCreditCards) : initialCreditCards;
  });
  
  const [investments, setInvestments] = useState<Investment[]>(() => {
    const savedInvestments = localStorage.getItem(INVESTMENTS_KEY);
    return savedInvestments ? JSON.parse(savedInvestments) : initialInvestments;
  });
  
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedTransactions = localStorage.getItem(TRANSACTIONS_KEY);
    return savedTransactions ? JSON.parse(savedTransactions) : initialTransactions;
  });
  
  const [categories, setCategories] = useState<Category[]>(() => {
    const savedCategories = localStorage.getItem(CATEGORIES_KEY);
    return savedCategories ? JSON.parse(savedCategories) : initialCategories;
  });
  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedDarkMode = localStorage.getItem(DARK_MODE_KEY);
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });
  
  // Save to localStorage on state changes
  useEffect(() => {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  }, [accounts]);
  
  useEffect(() => {
    localStorage.setItem(CREDIT_CARDS_KEY, JSON.stringify(creditCards));
  }, [creditCards]);
  
  useEffect(() => {
    localStorage.setItem(INVESTMENTS_KEY, JSON.stringify(investments));
  }, [investments]);
  
  useEffect(() => {
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
  }, [transactions]);
  
  useEffect(() => {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  }, [categories]);
  
  useEffect(() => {
    localStorage.setItem(DARK_MODE_KEY, JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  // Theme toggle
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  
  // Account operations
  const addAccount = (account: Omit<Account, 'id'>) => {
    const newAccount = { ...account, id: uuidv4() };
    setAccounts([...accounts, newAccount]);
  };
  
  const updateAccount = (account: Account) => {
    setAccounts(accounts.map(a => a.id === account.id ? account : a));
  };
  
  const deleteAccount = (id: string) => {
    setAccounts(accounts.filter(a => a.id !== id));
  };
  
  // Credit card operations
  const addCreditCard = (creditCard: Omit<CreditCard, 'id'>) => {
    const newCreditCard = { ...creditCard, id: uuidv4() };
    setCreditCards([...creditCards, newCreditCard]);
  };
  
  const updateCreditCard = (creditCard: CreditCard) => {
    setCreditCards(creditCards.map(c => c.id === creditCard.id ? creditCard : c));
  };
  
  const deleteCreditCard = (id: string) => {
    setCreditCards(creditCards.filter(c => c.id !== id));
  };
  
  // Investment operations
  const addInvestment = (investment: Omit<Investment, 'id'>) => {
    const newInvestment = { ...investment, id: uuidv4() };
    setInvestments([...investments, newInvestment]);
  };
  
  const updateInvestment = (investment: Investment) => {
    setInvestments(investments.map(i => i.id === investment.id ? investment : i));
  };
  
  const deleteInvestment = (id: string) => {
    setInvestments(investments.filter(i => i.id !== id));
  };
  
  // Transaction operations
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: uuidv4() };
    setTransactions([...transactions, newTransaction]);
  };
  
  const updateTransaction = (transaction: Transaction) => {
    setTransactions(transactions.map(t => t.id === transaction.id ? transaction : t));
  };
  
  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };
  
  // Category operations
  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory = { ...category, id: uuidv4() };
    setCategories([...categories, newCategory]);
  };
  
  const updateCategory = (category: Category) => {
    setCategories(categories.map(c => c.id === category.id ? category : c));
  };
  
  const deleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };
  
  return (
    <AppContext.Provider
      value={{
        accounts,
        creditCards,
        investments,
        transactions,
        categories,
        isDarkMode,
        toggleDarkMode,
        addAccount,
        updateAccount,
        deleteAccount,
        addCreditCard,
        updateCreditCard,
        deleteCreditCard,
        addInvestment,
        updateInvestment,
        deleteInvestment,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        addCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};