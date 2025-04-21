import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import Button from '../common/Button';
import Input from '../common/Input';
import { generateRandomColor } from '../../utils/formatters';

interface InvestmentFormProps {
  investmentId: string | null;
  onClose: () => void;
}

const InvestmentForm: React.FC<InvestmentFormProps> = ({ investmentId, onClose }) => {
  const { investments, addInvestment, updateInvestment, deleteInvestment } = useApp();
  const isEditing = !!investmentId;
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'fixedIncome',
    initialAmount: 0,
    currentAmount: 0,
    currency: 'BRL',
    purchaseDate: new Date().toISOString().split('T')[0],
    returnRate: 0,
    notes: '',
    color: generateRandomColor(),
  });
  
  useEffect(() => {
    if (investmentId) {
      const investment = investments.find(i => i.id === investmentId);
      if (investment) {
        setFormData({
          name: investment.name,
          type: investment.type,
          initialAmount: investment.initialAmount,
          currentAmount: investment.currentAmount,
          currency: investment.currency,
          purchaseDate: investment.purchaseDate,
          returnRate: investment.returnRate,
          notes: investment.notes || '',
          color: investment.color || generateRandomColor(),
        });
      }
    }
  }, [investmentId, investments]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) : value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && investmentId) {
      updateInvestment({
        id: investmentId,
        ...formData,
      });
    } else {
      addInvestment(formData);
    }
    
    onClose();
  };
  
  const handleDelete = () => {
    if (isEditing && investmentId && window.confirm('Tem certeza que deseja excluir este investimento?')) {
      deleteInvestment(investmentId);
      onClose();
    }
  };
  
  // Calculate return rate automatically when initialAmount and currentAmount change
  useEffect(() => {
    if (formData.initialAmount > 0 && formData.currentAmount > 0) {
      const returnRate = ((formData.currentAmount - formData.initialAmount) / formData.initialAmount) * 100;
      setFormData(prev => ({
        ...prev,
        returnRate: parseFloat(returnRate.toFixed(2))
      }));
    }
  }, [formData.initialAmount, formData.currentAmount]);
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          id="name"
          name="name"
          label="Nome do Investimento"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <div className="mb-4">
          <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Tipo de Investimento
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          >
            <option value="fixedIncome">Renda Fixa</option>
            <option value="stock">Ações</option>
            <option value="crypto">Criptomoedas</option>
            <option value="realEstate">Imóveis</option>
            <option value="other">Outros</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
        <Input
          id="initialAmount"
          name="initialAmount"
          type="number"
          label="Valor Inicial"
          value={formData.initialAmount}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
        />
        
        <Input
          id="currentAmount"
          name="currentAmount"
          type="number"
          label="Valor Atual"
          value={formData.currentAmount}
          onChange={handleChange}
          step="0.01"
          min="0"
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
            <option value="BTC">Bitcoin (BTC)</option>
          </select>
        </div>
        
        <Input
          id="purchaseDate"
          name="purchaseDate"
          type="date"
          label="Data de Compra"
          value={formData.purchaseDate}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
        <Input
          id="returnRate"
          name="returnRate"
          type="number"
          label="Taxa de Retorno (%)"
          value={formData.returnRate}
          onChange={handleChange}
          step="0.01"
        />
        
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
      
      <div className="mt-4">
        <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
          Notas
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        ></textarea>
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

export default InvestmentForm;