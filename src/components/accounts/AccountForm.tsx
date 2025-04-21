import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import Button from '../common/Button';
import Input from '../common/Input';
import { generateRandomColor } from '../../utils/formatters';

interface AccountFormProps {
  accountId: string | null;
  onClose: () => void;
}

const AccountForm: React.FC<AccountFormProps> = ({ accountId, onClose }) => {
  const { accounts, addAccount, updateAccount, deleteAccount } = useApp();
  const isEditing = !!accountId;
  
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    type: 'checking',
    balance: 0,
    currency: 'BRL',
    color: generateRandomColor(),
  });
  
  useEffect(() => {
    if (accountId) {
      const account = accounts.find(a => a.id === accountId);
      if (account) {
        setFormData({
          name: account.name,
          institution: account.institution,
          type: account.type,
          balance: account.balance,
          currency: account.currency,
          color: account.color || generateRandomColor(),
        });
      }
    }
  }, [accountId, accounts]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) : value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && accountId) {
      updateAccount({
        id: accountId,
        ...formData,
      });
    } else {
      addAccount(formData);
    }
    
    onClose();
  };
  
  const handleDelete = () => {
    if (isEditing && accountId && window.confirm('Tem certeza que deseja excluir esta conta?')) {
      deleteAccount(accountId);
      onClose();
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          id="name"
          name="name"
          label="Nome da Conta"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <Input
          id="institution"
          name="institution"
          label="Instituição"
          value={formData.institution}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
        <div className="mb-4">
          <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Tipo de Conta
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          >
            <option value="checking">Conta Corrente</option>
            <option value="savings">Poupança</option>
            <option value="investment">Investimento</option>
            <option value="other">Outros</option>
          </select>
        </div>
        
        <Input
          id="balance"
          name="balance"
          type="number"
          label="Saldo"
          value={formData.balance}
          onChange={handleChange}
          step="0.01"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
        <div className="mb-4">
          <label htmlFor="currency" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Moeda
          </label>
          <select
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          >
            <option value="BRL">Real Brasileiro (BRL)</option>
            <option value="USD">Dólar Americano (USD)</option>
            <option value="EUR">Euro (EUR)</option>
            <option value="GBP">Libra Esterlina (GBP)</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Cor
          </label>
          <div className="flex items-center">
            <input
              type="color"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-10 h-10 border-0 rounded-lg p-0 cursor-pointer"
            />
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="ml-2 w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        {isEditing ? (
          <Button 
            type="button" 
            variant="danger" 
            onClick={handleDelete}
          >
            Excluir
          </Button>
        ) : (
          <div></div>
        )}
        
        <div className="flex gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="primary"
          >
            {isEditing ? 'Atualizar' : 'Adicionar'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AccountForm;