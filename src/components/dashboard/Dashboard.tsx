import React from 'react';
import { BarChart3, TrendingUp, CreditCard, Wallet, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import Card from '../common/Card';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { 
  calculateTotalBalance, 
  calculateTotalCreditCardDebt, 
  calculateTotalInvestments,
  calculateIncome,
  calculateExpenses
} from '../../utils/calculations';
import BalanceCard from './BalanceCard';
import RecentTransactions from './RecentTransactions';

const Dashboard: React.FC = () => {
  const { accounts, creditCards, investments, transactions } = useApp();
  
  const totalBalance = calculateTotalBalance(accounts);
  const totalCreditCardDebt = calculateTotalCreditCardDebt(creditCards);
  const totalInvestments = calculateTotalInvestments(investments);
  const netWorth = totalBalance + totalInvestments - totalCreditCardDebt;
  
  // Calculate transactions for current month
  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString();
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString();
  
  const monthlyIncome = calculateIncome(transactions, firstDayOfMonth, lastDayOfMonth);
  const monthlyExpenses = calculateExpenses(transactions, firstDayOfMonth, lastDayOfMonth);
  
  // Previous month
  const firstDayOfPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1).toISOString();
  const lastDayOfPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).toISOString();
  
  const prevMonthlyIncome = calculateIncome(transactions, firstDayOfPrevMonth, lastDayOfPrevMonth);
  const prevMonthlyExpenses = calculateExpenses(transactions, firstDayOfPrevMonth, lastDayOfPrevMonth);
  
  // Calculate percentage changes
  const incomeChange = prevMonthlyIncome ? ((monthlyIncome - prevMonthlyIncome) / prevMonthlyIncome) * 100 : 0;
  const expensesChange = prevMonthlyExpenses ? ((monthlyExpenses - prevMonthlyExpenses) / prevMonthlyExpenses) * 100 : 0;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <span className="text-sm text-gray-500 dark:text-gray-400">{new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</span>
      </div>
      
      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-teal-100">Patrimônio Líquido</p>
              <h3 className="mt-1 text-2xl font-semibold">{formatCurrency(netWorth)}</h3>
            </div>
            <div className="p-2 bg-white/20 rounded-lg">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Saldo em Contas</p>
              <h3 className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{formatCurrency(totalBalance)}</h3>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900/30">
              <Wallet className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Fatura de Cartões</p>
              <h3 className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{formatCurrency(totalCreditCardDebt)}</h3>
            </div>
            <div className="p-2 bg-red-100 rounded-lg dark:bg-red-900/30">
              <CreditCard className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Investimentos</p>
              <h3 className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{formatCurrency(totalInvestments)}</h3>
            </div>
            <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900/30">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Monthly income/expense */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Receitas do Mês</p>
              <h3 className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{formatCurrency(monthlyIncome)}</h3>
            </div>
            <div className={`flex items-center ${incomeChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {incomeChange >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
              <span className="text-sm font-medium">{formatPercentage(Math.abs(incomeChange))}</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full" style={{ width: `${Math.min(100, (monthlyIncome / (monthlyIncome + 1000)) * 100)}%` }}></div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Despesas do Mês</p>
              <h3 className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{formatCurrency(monthlyExpenses)}</h3>
            </div>
            <div className={`flex items-center ${expensesChange <= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {expensesChange <= 0 ? <ArrowDownRight className="w-4 h-4 mr-1" /> : <ArrowUpRight className="w-4 h-4 mr-1" />}
              <span className="text-sm font-medium">{formatPercentage(Math.abs(expensesChange))}</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full" style={{ width: `${Math.min(100, (monthlyExpenses / (monthlyIncome || 1)) * 100)}%` }}></div>
          </div>
        </Card>
      </div>
      
      {/* Accounts & Recent Transactions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card title="Contas">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {accounts.map(account => (
                <BalanceCard key={account.id} account={account} />
              ))}
            </div>
          </Card>
        </div>
        
        <div>
          <Card title="Transações Recentes">
            <RecentTransactions />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;