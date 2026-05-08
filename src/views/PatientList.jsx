import React, { useState } from 'react';
import { Camera, Upload, UserRound, Activity, Clock, ShieldAlert, Cloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './PatientList.css';

const PatientList = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [processType, setProcessType] = useState('scan'); // 'scan' | 'upload'
  const [progress, setProgress] = useState(0);
  const [processingState, setProcessingState] = useState('decoding'); // 'decoding' | 'indexing' | 'ready'

  const activePatients = [
    { id: 'alpha-01', name: 'אלפא-01', status: 'דחוף', time: 'T+00:14', hr: 135, injuries: 'דימום מסיבי' },
    { id: 'bravo-02', name: 'בראבו-02', status: 'יציב', time: 'T+01:20', hr: 82, injuries: 'רסיס בגפה' }
  ];

  const handleProcess = (type, targetPatientId) => {
    setProcessType(type);
    setIsProcessing(true);
    setProgress(0);
    setScanResult(null);

    // Simulate progress and states
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev < 40) setProcessingState('decoding');
        else if (prev < 90) setProcessingState('indexing');
        else setProcessingState('ready');

        if (prev >= 98) {
          clearInterval(interval);
          return 98;
        }
        return prev + Math.floor(Math.random() * 10) + 2;
      });
    }, 150);

    // Simulate OCR and AI association completion
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setIsProcessing(false);
      setScanResult(targetPatientId);
      setTimeout(() => {
        navigate(`/patient/${targetPatientId}/hub`);
      }, 1500);
    }, 2500);
  };

  const triggerFileUpload = () => {
    document.getElementById('file-upload').click();
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleProcess('upload', 'bravo-02');
    }
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
          <div className="ingestion-action" onClick={() => handleProcess('scan', 'alpha-01')}>
            <div className={`action-icon ${isProcessing && processType === 'scan' ? 'scanning-pulse' : ''}`}>
              <Camera size={32} className="text-active" />
            </div>
            <div className="action-text">
              <div className="action-title">סריקת טופס 106 (מצלמה)</div>
              <div className="action-subtitle">זיהוי מבוסס AI ושיוך אוטומטי לתיק הרפואי</div>
            </div>
          </div>

          <div className="ingestion-divider"></div>

          <div className="ingestion-action dropzone" onClick={triggerFileUpload}>
            <input 
              type="file" 
              id="file-upload" 
              style={{ display: 'none' }} 
              onChange={handleFileUpload} 
              accept=".pdf,.docx,.jpg,.png" 
            />
            <div className={`action-icon ${isProcessing && processType === 'upload' ? 'scanning-pulse' : ''}`}>
              <Upload size={32} className="text-secondary" />
            </div>
            <div className="action-text">
              <div className="action-title">העלאת קובץ דיגיטלי</div>
              <div className="action-subtitle">PDF / DOCX מהתקן מקומי</div>
            </div>
          </div>
        </div>

        {isProcessing && (
          <div className="scan-status active" style={{flexDirection: 'column', gap: '12px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
              <div className="loader"></div>
              <span>
                {processingState === 'decoding' && 'פענוח טופס... (AWS Textract)'}
                {processingState === 'indexing' && 'מסנכרן לידע מבצעי... (Vector DB)'}
                {processingState === 'ready' && 'מוכן לשאילתות!'}
              </span>
            </div>
            <div style={{width: '100%', background: 'var(--bg-panel-hover)', height: '4px', borderRadius: '2px', overflow: 'hidden'}}>
              <div style={{width: `${progress}%`, height: '100%', background: 'var(--color-active)', transition: 'width 0.3s ease'}}></div>
            </div>
            <div className="text-active" style={{fontSize: '12px', fontWeight: 800}}>{progress}%</div>
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
                <div className="patient-id">{patient.id}</div>
                <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                  <div className={`badge ${patient.status === 'דחוף' ? 'badge-critical' : 'badge-safe'}`}>
                    {patient.status}
                  </div>
                  <Cloud size={16} className={patient.id === 'alpha-01' ? 'text-safe' : 'text-secondary'} style={{opacity: patient.id === 'alpha-01' ? 1 : 0.5}} />
                </div>
              </div>
            
            <div className="patient-card-body">
              <div className="info-row">
                <Clock size={16} className="text-secondary" />
                <span>{patient.time}</span>
                <span className="text-secondary text-sm" style={{marginRight: 'auto'}}>זמן פציעה</span>
              </div>
              
              <div className="info-row">
                <Activity size={16} className="text-secondary" />
                <span className="text-active">{patient.hr} BPM</span>
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
