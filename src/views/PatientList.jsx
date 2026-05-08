import React, { useState } from 'react';
import { Camera, Upload, UserRound, Activity, Clock, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './PatientList.css';

const PatientList = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const activePatients = [
    { id: 'alpha-01', name: 'אלפא-01', status: 'דחוף', time: 'T+00:14', hr: 135, injuries: 'דימום מסיבי' },
    { id: 'bravo-02', name: 'בראבו-02', status: 'יציב', time: 'T+01:20', hr: 82, injuries: 'רסיס בגפה' }
  ];

  const handleScan = () => {
    setIsScanning(true);
    // Simulate OCR and AI association
    setTimeout(() => {
      setIsScanning(false);
      setScanResult('alpha-01');
      setTimeout(() => {
        navigate('/patient/alpha-01/hub');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="view-container">
      <div className="view-header" style={{ marginBottom: '24px' }}>
        <div>
          <h1 className="view-title">ניהול אירוע</h1>
          <div className="text-secondary" style={{ marginTop: '8px', fontSize: '14px' }}>
            העלאת טפסים ושיוך אוטומטי לפצועים
          </div>
        </div>
      </div>

      {/* Auto-Ingestion Section */}
      <div className="card ingestion-panel" style={{ marginBottom: '40px', padding: '24px' }}>
        <div className="ingestion-flex">
          <div className="ingestion-action" onClick={handleScan}>
            <div className={`action-icon ${isScanning ? 'scanning-pulse' : ''}`}>
              <Camera size={32} className="text-active" />
            </div>
            <div className="action-text">
              <div className="action-title">סריקת טופס 106 (מצלמה)</div>
              <div className="action-subtitle">זיהוי מבוסס AI ושיוך אוטומטי לתיק הרפואי</div>
            </div>
          </div>

          <div className="ingestion-divider"></div>

          <div className="ingestion-action dropzone">
            <div className="action-icon">
              <Upload size={32} className="text-secondary" />
            </div>
            <div className="action-text">
              <div className="action-title">העלאת קובץ דיגיטלי</div>
              <div className="action-subtitle">PDF / DOCX מהתקן מקומי</div>
            </div>
          </div>
        </div>

        {isScanning && (
          <div className="scan-status active">
            <div className="loader"></div>
            <span>מפענח טקסט (OCR) ומשייך לפצוע מתאים...</span>
          </div>
        )}
        
        {scanResult && (
          <div className="scan-status success">
            <Activity size={18} />
            <span>זוהה טופס עבור פצוע: {scanResult}. מעביר לתיק...</span>
          </div>
        )}
      </div>

      {/* Patients List */}
      <div className="card-title text-active">
        <UserRound size={18} /> פצועים בטיפול פעיל ({activePatients.length})
      </div>

      <div className="patients-grid">
        {activePatients.map(patient => (
          <div 
            key={patient.id} 
            className="patient-card"
            onClick={() => navigate(`/patient/${patient.id}/hub`)}
          >
            <div className="patient-card-header">
              <div className="patient-id">{patient.name}</div>
              <div className={`badge ${patient.status === 'דחוף' ? 'badge-critical' : 'badge-safe'}`}>
                {patient.status}
              </div>
            </div>
            
            <div className="patient-card-body">
              <div className="info-row">
                <Clock size={16} className="text-secondary" />
                <span className="font-mono">{patient.time}</span>
                <span className="text-secondary text-sm" style={{marginRight: 'auto'}}>זמן פציעה</span>
              </div>
              
              <div className="info-row">
                <Activity size={16} className="text-secondary" />
                <span className="font-mono text-active">{patient.hr} BPM</span>
                <span className="text-secondary text-sm" style={{marginRight: 'auto'}}>דופק אחרון</span>
              </div>

              <div className="info-row">
                <ShieldAlert size={16} className="text-secondary" />
                <span style={{fontWeight: 600}}>{patient.injuries}</span>
              </div>
            </div>
            
            <div className="patient-card-footer text-active">
              למעבר לתיק הפצוע &larr;
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;
