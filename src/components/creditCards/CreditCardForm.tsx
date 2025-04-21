import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import Button from '../common/Button';
import Input from '../common/Input';
import { generateRandomColor } from '../../utils/formatters';

interface CreditCardFormProps {
  creditCardId: string | null;
  onClose: () => void;
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({ creditCardId, onClose }) => {
  const { creditCards, addCreditCard, updateCreditCard, deleteCreditCard } = useApp();
  const isEditing = !!creditCardId;
  
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    lastFourDigits: '',
    limit: 0,
    dueDate: 1,
    closingDate: 1,
    currentBalance: 0,
    availableCredit: 0,
    color: generateRandomColor(),
  });
  
  useEffect(() => {
    if (creditCardId) {
      const creditCard = creditCards.find(c => c.id === creditCardId);
      if (creditCard) {
        setFormData({
          name: creditCard.name,
          institution: creditCard.institution,
          lastFourDigits: creditCard.lastFourDigits,
          limit: creditCard.limit,
          dueDate: creditCard.dueDate,
          closingDate: creditCard.closingDate,
          currentBalance: creditCard.currentBalance,
          availableCredit: creditCard.availableCredit,
          color: creditCard.color || generateRandomColor(),
        });
      }
    }
  }, [creditCardId, creditCards]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    const newValue = type === 'number' ? parseFloat(value) : value;
    
    setFormData(prev => {
      const updated = {
        ...prev,
        [name]: newValue,
      };
      
      // Auto-calculate available credit when limit or current balance changes
      if (name === 'limit' || name === 'currentBalance') {
        updated.availableCredit = updated.limit - updated.currentBalance;
      }
      
      return updated;
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && creditCardId) {
      updateCreditCard({
        id: creditCardId,
        ...formData,
      });
    } else {
      addCreditCard(formData);
    }
    
    onClose();
  };
  
  const handleDelete = () => {
    if (isEditing && creditCardId && window.confirm('Tem certeza que deseja excluir este cartão?')) {
      deleteCreditCard(creditCardId);
      onClose();
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          id="name"
          name="name"
          label="Nome do Cartão"
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
        <Input
          id="lastFourDigits"
          name="lastFourDigits"
          label="Últimos 4 dígitos"
          value={formData.lastFourDigits}
          onChange={handleChange}
          maxLength={4}
          required
        />
        
        <Input
          id="limit"
          name="limit"
          type="number"
          label="Limite"
          value={formData.limit}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
        <Input
          id="dueDate"
          name="dueDate"
          type="number"
          label="Dia de Vencimento"
          value={formData.dueDate}
          onChange={handleChange}
          min="1"
          max="31"
          required
        />
        
        <Input
          id="closingDate"
          name="closingDate"
          type="number"
          label="Dia de Fechamento"
          value={formData.closingDate}
          onChange={handleChange}
          min="1"
          max="31"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
        <Input
          id="currentBalance"
          name="currentBalance"
          type="number"
          label="Fatura Atual"
          value={formData.currentBalance}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
        />
        
        <Input
          id="availableCredit"
          name="availableCredit"
          type="number"
          label="Crédito Disponível"
          value={formData.availableCredit}
          onChange={handleChange}
          step="0.01"
          min="0"
          disabled
        />
      </div>
      
      <div className="mt-4">
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

export default CreditCardForm;