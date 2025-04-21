import React, { useState } from 'react';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import Card from '../common/Card';
import Button from '../common/Button';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { calculateTotalInvestments, calculateInvestmentReturn } from '../../utils/calculations';
import InvestmentForm from './InvestmentForm';
import Modal from '../common/Modal';

const InvestmentsPage: React.FC = () => {
  const { investments } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState<string | null>(null);
  
  const totalInvestments = calculateTotalInvestments(investments);
  
  const handleEdit = (investmentId: string) => {
    setEditingInvestment(investmentId);
    setIsModalOpen(true);
  };
  
  const handleAdd = () => {
    setEditingInvestment(null);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingInvestment(null);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Investimentos</h1>
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={handleAdd}
        >
          Novo Investimento
        </Button>
      </div>
      
      <Card>
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Investido</p>
          <h3 className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{formatCurrency(totalInvestments)}</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {investments.map(investment => {
            const returnPercent = calculateInvestmentReturn(investment);
            const isPositive = returnPercent >= 0;
            
            return (
              <div
                key={investment.id}
                className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer bg-white dark:bg-gray-800 dark:border-gray-700"
                onClick={() => handleEdit(investment.id)}
              >
                <div className="flex items-center mb-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                    style={{ backgroundColor: investment.color || '#0DB4B9' }}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-5 h-5 text-white" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{investment.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{investment.type}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Valor Atual</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(investment.currentAmount)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Investimento Inicial</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {formatCurrency(investment.initialAmount)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Rendimento</span>
                    <span className={`font-medium ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {isPositive ? '+' : ''}{formatPercentage(returnPercent)}
                    </span>
                  </div>
                  
                  <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`${isPositive ? 'bg-green-500' : 'bg-red-500'} h-full`}
                      style={{ 
                        width: `${Math.min(100, Math.abs(returnPercent))}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
          
          <div
            className="p-4 border border-dashed rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer flex items-center justify-center h-48 bg-white dark:bg-gray-800 dark:border-gray-700"
            onClick={handleAdd}
          >
            <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
              <Plus className="w-8 h-8 mb-2" />
              <span className="text-sm font-medium">Adicionar Investimento</span>
            </div>
          </div>
        </div>
      </Card>
      
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingInvestment ? "Editar Investimento" : "Novo Investimento"}
      >
        <InvestmentForm 
          investmentId={editingInvestment} 
          onClose={handleCloseModal} 
        />
      </Modal>
    </div>
  );
};

export default InvestmentsPage;