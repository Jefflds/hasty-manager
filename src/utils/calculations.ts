import { Account, CreditCard, Investment, Transaction } from '../types';

// Calculate total balance across all accounts
export const calculateTotalBalance = (accounts: Account[]): number => {
  return accounts.reduce((total, account) => total + account.balance, 0);
};

// Calculate total credit card debt
export const calculateTotalCreditCardDebt = (creditCards: CreditCard[]): number => {
  return creditCards.reduce((total, card) => total + card.currentBalance, 0);
};

// Calculate total available credit
export const calculateTotalAvailableCredit = (creditCards: CreditCard[]): number => {
  return creditCards.reduce((total, card) => total + card.availableCredit, 0);
};

// Calculate total investments value
export const calculateTotalInvestments = (investments: Investment[]): number => {
  return investments.reduce((total, investment) => total + investment.currentAmount, 0);
};

// Calculate investment return percentage
export const calculateInvestmentReturn = (investment: Investment): number => {
  if (investment.initialAmount === 0) return 0;
  
  const returnPercentage = ((investment.currentAmount - investment.initialAmount) / investment.initialAmount) * 100;
  return parseFloat(returnPercentage.toFixed(2));
};

// Calculate total income for a given period
export const calculateIncome = (transactions: Transaction[], startDate: string, endDate: string): number => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  
  return transactions
    .filter(tx => tx.type === 'income' && new Date(tx.date).getTime() >= start && new Date(tx.date).getTime() <= end)
    .reduce((total, tx) => total + tx.amount, 0);
};

// Calculate total expenses for a given period
export const calculateExpenses = (transactions: Transaction[], startDate: string, endDate: string): number => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  
  return transactions
    .filter(tx => tx.type === 'expense' && new Date(tx.date).getTime() >= start && new Date(tx.date).getTime() <= end)
    .reduce((total, tx) => total + tx.amount, 0);
};

// Calculate net savings (income - expenses) for a period
export const calculateNetSavings = (transactions: Transaction[], startDate: string, endDate: string): number => {
  const income = calculateIncome(transactions, startDate, endDate);
  const expenses = calculateExpenses(transactions, startDate, endDate);
  return income - expenses;
};