import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Activity, FileText, BookOpen, User, Wifi, LogOut, AlertTriangle } from 'lucide-react';

import Login from './views/Login';
import PatientList from './views/PatientList';
import PatientHub from './views/PatientHub';
import CasualtyCard from './views/CasualtyCard';
import DoctrineBase from './views/DoctrineBase';

import './App.css';

// Add handwriting font for Source Validation
const style = document.createElement('style');
style.innerHTML = "@import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');";
document.head.appendChild(style);

const Sidebar = (props) => {
  const location = useLocation();

  const isPatientRoute = location.pathname.startsWith('/patient/');
  const patientIdMatch = location.pathname.match(/\/patient\/([^\/]+)/);
  const patientId = patientIdMatch ? patientIdMatch[1] : null;

  const globalNavItems = [
    { path: '/', name: 'ניהול אירוע', icon: Shield },
    { path: '/doctrine', name: 'בינת הפקודות', icon: BookOpen },
  ];

  const patientNavItems = patientId ? [
    { path: `/patient/${patientId}/hub`, name: 'דשבורד פצוע', icon: Activity },
    { path: `/patient/${patientId}/card`, name: 'כרטיס רפואי', icon: FileText },
  ] : [];

  return (
    <div className="sidebar bg-panel border-panel">
      <Link to="/" className="sidebar-header" style={{textDecoration: 'none', display: 'block', color: 'inherit'}}>
        <div className="unit-badge">רפואה דיגיטלית</div>
        <div 
          className={`connection-status flex-center ${props.isOffline ? 'text-critical' : 'text-safe'}`} 
          style={{ justifyContent: 'flex-start', cursor: 'pointer' }}
          onClick={props.onToggleOffline}
        >
          <Wifi size={14} style={{ marginLeft: '6px' }} />
          <span>{props.isOffline ? 'מצב אופליין' : 'תקשורת מאובטחת'}</span>
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
            <div className="user-role">רופא</div>
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
  const [isOffline, setIsOffline] = useState(false);

  return (
    <div className="app-layout">
      {isOffline && (
        <div className="offline-banner">
          <AlertTriangle size={14} style={{marginLeft: '8px'}} />
          מצב אופליין - בינה מלאכותית מבוססת ידע מקומי בלבד
          <button onClick={() => setIsOffline(false)} style={{marginRight: 'auto', background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontWeight: 800}}>X</button>
        </div>
      )}
      <Sidebar onToggleOffline={() => setIsOffline(!isOffline)} isOffline={isOffline} />
      <main className="main-content" style={{marginTop: isOffline ? '32px' : '0'}}>
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
