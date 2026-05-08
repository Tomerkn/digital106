import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Activity, FileText, BookOpen, User, Wifi, LogOut } from 'lucide-react';

import Login from './views/Login';
import PatientList from './views/PatientList';
import PatientHub from './views/PatientHub';
import CasualtyCard from './views/CasualtyCard';
import DoctrineBase from './views/DoctrineBase';

import './App.css';

const Sidebar = () => {
  const location = useLocation();

  const isPatientRoute = location.pathname.startsWith('/patient/');
  const patientIdMatch = location.pathname.match(/\/patient\/([^\/]+)/);
  const patientId = patientIdMatch ? patientIdMatch[1] : null;

  const globalNavItems = [
    { path: '/', name: 'ניהול אירוע', icon: Shield },
    { path: '/doctrine', name: 'תורת רפואה', icon: BookOpen },
  ];

  const patientNavItems = patientId ? [
    { path: `/patient/${patientId}/hub`, name: 'דשבורד פצוע', icon: Activity },
    { path: `/patient/${patientId}/card`, name: 'כרטיס רפואי', icon: FileText },
  ] : [];

  return (
    <div className="sidebar bg-panel border-panel">
      <Link to="/" className="sidebar-header" style={{textDecoration: 'none', display: 'block', color: 'inherit'}}>
        <div className="unit-badge">רפואה דיגיטלית</div>
        <div className="connection-status flex-center text-safe" style={{ justifyContent: 'flex-start' }}>
          <Wifi size={14} style={{ marginLeft: '6px' }} />
          <span>תקשורת מאובטחת</span>
        </div>
      </Link>
      
      <div className="sidebar-nav">
        <div style={{padding: '0 20px', marginBottom: '8px', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)'}}>ראשי</div>
        {globalNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link 
              to={item.path} 
              key={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} className="nav-icon" />
              <span className="nav-text">{item.name}</span>
            </Link>
          );
        })}

        {patientId && (
          <>
            <div style={{height: '1px', background: 'var(--border-color)', margin: '16px 20px'}}></div>
            <div style={{padding: '0 20px', marginBottom: '8px', fontSize: '12px', fontWeight: 700, color: 'var(--text-active)'}}>
              פצוע נוכחי: {patientId === 'alpha-01' ? 'אלפא-01' : patientId}
            </div>
            {patientNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  to={item.path} 
                  key={item.path}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                >
                  <Icon size={20} className="nav-icon" />
                  <span className="nav-text">{item.name}</span>
                </Link>
              );
            })}
          </>
        )}
      </div>
      
      <div className="sidebar-footer">
        <div className="user-profile">
          <User size={32} className="avatar-icon text-active" />
          <div className="user-info flex-1">
            <div className="user-name">סרן תומר קנובלר</div>
            <div className="user-role">רופא משפחה / קרפ״ג</div>
          </div>
          <button className="logout-btn" onClick={() => window.location.reload()} title="התנתק">
            <LogOut size={18} className="text-secondary hover:text-critical transition" />
          </button>
        </div>
      </div>
    </div>
  );
};

const AppLayout = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<PatientList />} />
          <Route path="/patient/:id/hub" element={<PatientHub />} />
          <Route path="/patient/:id/card" element={<CasualtyCard />} />
          <Route path="/doctrine" element={<DoctrineBase />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
