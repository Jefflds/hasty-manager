import React from 'react';
import { Home, CreditCard, Wallet, LineChart, History, PieChart, Settings, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems: NavItem[] = [
    {
      name: 'Dashboard',
      path: '/',
      icon: <Home className="w-5 h-5" />,
    },
    {
      name: 'Contas',
      path: '/accounts',
      icon: <Wallet className="w-5 h-5" />,
    },
    {
      name: 'Cartões',
      path: '/credit-cards',
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      name: 'Investimentos',
      path: '/investments',
      icon: <LineChart className="w-5 h-5" />,
    },
    {
      name: 'Transações',
      path: '/transactions',
      icon: <History className="w-5 h-5" />,
    },
    {
      name: 'Relatórios',
      path: '/reports',
      icon: <PieChart className="w-5 h-5" />,
    },
    {
      name: 'Perfil',
      path: '/profile',
      icon: <User className="w-5 h-5" />,
    },
    {
      name: 'Configurações',
      path: '/settings',
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <aside
      className={`fixed z-10 top-16 bottom-0 left-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-0 -translate-x-full md:translate-x-0 md:w-16'
      }`}
    >
      <div className="h-full flex flex-col py-4 overflow-y-auto">
        <nav className="flex-1 space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center p-2 text-sm font-medium rounded-lg transition-colors
                  ${
                    isActive
                      ? 'bg-teal-100 text-teal-600 dark:bg-teal-900/20 dark:text-teal-500'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
                  }
                `}
              >
                <div
                  className={`
                    ${isActive ? 'text-teal-500 dark:text-teal-400' : 'text-gray-500 dark:text-gray-400'}
                    ${isOpen ? 'mr-3' : 'mx-auto'}
                  `}
                >
                  {item.icon}
                </div>
                {isOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;