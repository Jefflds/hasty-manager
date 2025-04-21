import React, { useState } from 'react';
import { Plus, CreditCard } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import Card from '../common/Card';
import Button from '../common/Button';
import { formatCurrency } from '../../utils/formatters';
import { calculateTotalCreditCardDebt, calculateTotalAvailableCredit } from '../../utils/calculations';
import CreditCardForm from './CreditCardForm';
import Modal from '../common/Modal';

const CreditCardsPage: React.FC = () => {
  const { creditCards } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCreditCard, setEditingCreditCard] = useState<string | null>(null);
  
  const totalDebt = calculateTotalCreditCardDebt(creditCards);
  const totalAvailableCredit = calculateTotalAvailableCredit(creditCards);
  
  const handleEdit = (creditCardId: string) => {
    setEditingCreditCard(creditCardId);
    setIsModalOpen(true);
  };
  
  const handleAdd = () => {
    setEditingCreditCard(null);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCreditCard(null);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cartões de Crédito</h1>
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={handleAdd}
        >
          Novo Cartão
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Fatura Atual</p>
            <h3 className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{formatCurrency(totalDebt)}</h3>
          </div>
        </Card>
        
        <Card>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Crédito Disponível</p>
            <h3 className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{formatCurrency(totalAvailableCredit)}</h3>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {creditCards.map(creditCard => (
          <div
            key={creditCard.id}
            className="relative p-6 rounded-xl shadow-md transition-all cursor-pointer bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden hover:shadow-lg"
            onClick={() => handleEdit(creditCard.id)}
            style={{ 
              background: `linear-gradient(135deg, ${creditCard.color || '#1F4287'} 0%, ${creditCard.color ? creditCard.color + '99' : '#0DB4B9'} 100%)` 
            }}
          >
            <div className="mb-8">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/80 text-sm">{creditCard.institution}</p>
                  <h4 className="text-xl font-semibold">{creditCard.name}</h4>
                </div>
                <CreditCard className="w-8 h-8 text-white/50" />
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-white/80 mb-1">Número do Cartão</p>
              <p className="font-mono">•••• •••• •••• {creditCard.lastFourDigits}</p>
            </div>
            
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-white/80 mb-1">Vencimento</p>
                <p className="font-semibold">Dia {creditCard.dueDate}</p>
              </div>
              <div>
                <p className="text-sm text-white/80 mb-1">Fechamento</p>
                <p className="font-semibold">Dia {creditCard.closingDate}</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex justify-between mb-2">
                <p className="text-sm text-white/80">Fatura Atual</p>
                <p className="font-semibold">{formatCurrency(creditCard.currentBalance)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-white/80">Limite</p>
                <p className="font-semibold">{formatCurrency(creditCard.limit)}</p>
              </div>
              
              <div className="mt-3 w-full bg-white/30 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-white h-full"
                  style={{ 
                    width: `${(creditCard.currentBalance / creditCard.limit) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
        
        <div
          className="p-4 border border-dashed rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer flex items-center justify-center h-48 bg-white dark:bg-gray-800 dark:border-gray-700"
          onClick={handleAdd}
        >
          <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
            <Plus className="w-8 h-8 mb-2" />
            <span className="text-sm font-medium">Adicionar Cartão</span>
          </div>
        </div>
      </div>
      
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCreditCard ? "Editar Cartão" : "Novo Cartão"}
      >
        <CreditCardForm 
          creditCardId={editingCreditCard} 
          onClose={handleCloseModal} 
        />
      </Modal>
    </div>
  );
};

export default CreditCardsPage;