import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Account } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface BalanceCardProps {
  account: Account;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ account }) => {
  return (
    <div 
      className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer bg-white dark:bg-gray-800 dark:border-gray-700 flex items-center justify-between"
    >
      <div className="flex items-center">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
          style={{ backgroundColor: account.color || '#0DB4B9' }}
        >
          <span className="text-white font-medium">
            {account.institution.substring(0, 1)}
          </span>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white">{account.name}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">{account.institution}</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="mr-2 text-right">
          <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(account.balance)}</span>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
};

export default BalanceCard;