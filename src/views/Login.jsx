import React, { useState } from 'react';
import { Shield, ChevronDown } from 'lucide-react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [code, setCode] = useState('');
  const [facility, setFacility] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon-wrapper">
            <Shield size={32} className="text-primary" />
          </div>
          <h2 className="login-title">רפואה דיגיטלית</h2>
          <div className="login-subtitle">הזדהות מטפל בשטח</div>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input 
              type="text" 
              className="input-field login-input" 
              placeholder="הזן מספר אישי (7 ספרות)"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group select-wrapper">
            <select 
              className="input-field login-input select-field" 
              value={facility}
              onChange={(e) => setFacility(e.target.value)}
              required
            >
              <option value="" disabled>בחר מתקן / יחידה</option>
              <option value="unit1">תאג״ד 51</option>
              <option value="unit2">פלס״ר צנחנים</option>
              <option value="unit3">יחידה 669</option>
              <option value="unit4">בי״ח שדה - אוגדה 36</option>
            </select>
            <ChevronDown size={18} className="select-icon" />
          </div>
          
          <div className="form-group select-wrapper">
            <select className="input-field login-input select-field" defaultValue="">
              <option value="" disabled>תפקיד</option>
              <option value="doc">רופא</option>
              <option value="medic">פרמדיק</option>
              <option value="combat_medic">חובש קרבי</option>
            </select>
            <ChevronDown size={18} className="select-icon" />
          </div>

          <button type="submit" className="btn btn-gradient login-submit">
            כניסה למערכת
          </button>
        </form>
        
        <div className="login-footer">
          גירסה 2.3.1.2 | מאושר לשימוש בשטח ע״י מקרפ״ר
        </div>
      </div>
    </div>
  );
};

export default Login;
