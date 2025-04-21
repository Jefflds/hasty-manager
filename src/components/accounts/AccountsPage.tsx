import React, { useState } from 'react';
import { Plus, Wallet } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import Card from '../common/Card';
import Button from '../common/Button';
import { formatCurrency } from '../../utils/formatters';
import { calculateTotalBalance } from '../../utils/calculations';
import AccountForm from './AccountForm';
import Modal from '../common/Modal';

const AccountsPage: React.FC = () => {
  const { accounts } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<string | null>(null);
  
  const totalBalance = calculateTotalBalance(accounts);
  
  const handleEdit = (accountId: string) => {
    setEditingAccount(accountId);
    setIsModalOpen(true);
  };
  
  const handleAdd = () => {
    setEditingAccount(null);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAccount(null);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contas</h1>
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={handleAdd}
        >
          Nova Conta
        </Button>
      </div>
      
      <Card>
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Saldo Total</p>
          <h3 className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{formatCurrency(totalBalance)}</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {accounts.map(account => (
            <div
              key={account.id}
              className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer bg-white dark:bg-gray-800 dark:border-gray-700"
              onClick={() => handleEdit(account.id)}
            >
              <div className="flex items-center mb-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                  style={{ backgroundColor: account.color || '#0DB4B9' }}
                >
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{account.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{account.institution}</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Saldo</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(account.balance)}</span>
                </div>
                <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-teal-500 h-full"
                    style={{ 
                      width: `${account.balance > 0 ? Math.min(100, (account.balance / (totalBalance || 1)) * 100) : 0}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
          
          <div
            className="p-4 border border-dashed rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer flex items-center justify-center h-32 bg-white dark:bg-gray-800 dark:border-gray-700"
            onClick={handleAdd}
          >
            <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
              <Plus className="w-8 h-8 mb-2" />
              <span className="text-sm font-medium">Adicionar Conta</span>
            </div>
          </div>
        </div>
      </Card>
      
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingAccount ? "Editar Conta" : "Nova Conta"}
      >
        <AccountForm 
          accountId={editingAccount} 
          onClose={handleCloseModal} 
        />
      </Modal>
    </div>
  );
};

export default AccountsPage;