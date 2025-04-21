import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const RecentTransactions: React.FC = () => {
  const { transactions, accounts } = useApp();
  
  // Sort transactions by date (newest first) and take the 5 most recent
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  const getAccountName = (accountId: string): string => {
    const account = accounts.find(a => a.id === accountId);
    return account ? account.name : 'Conta Desconhecida';
  };
  
  if (recentTransactions.length === 0) {
    return <p className="text-sm text-gray-500 dark:text-gray-400">Nenhuma transação registrada.</p>;
  }
  
  return (
    <div className="space-y-3">
      {recentTransactions.map(transaction => (
        <div 
          key={transaction.id} 
          className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
        >
          <div className="flex items-center">
            <div className={`p-2 rounded-lg mr-3 ${transaction.type === 'income' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
              {transaction.type === 'income' ? (
                <ArrowUpRight className={`w-4 h-4 ${transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
              ) : (
                <ArrowDownRight className={`w-4 h-4 ${transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{transaction.description}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {getAccountName(transaction.accountId)} • {formatDate(transaction.date)}
              </p>
            </div>
          </div>
          <span className={`font-medium ${transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
          </span>
        </div>
      ))}
      
      <button className="w-full text-center text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 mt-2">
        Ver todas as transações
      </button>
    </div>
  );
};

export default RecentTransactions;