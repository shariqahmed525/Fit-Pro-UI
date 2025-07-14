import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import TrainerManagement from './components/TrainerManagement';
import PackageManagement from './components/PackageManagement';
import SalesTracking from './components/SalesTracking';
import Analytics from './components/Analytics';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'trainers':
        return <TrainerManagement />;
      case 'packages':
        return <PackageManagement />;
      case 'sales':
        return <SalesTracking />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">FitPro Admin Dashboard</h1>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {renderActiveSection()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;