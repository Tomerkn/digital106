import React from 'react';
import { Camera, Upload, CheckCircle, FileText, Database } from 'lucide-react';
import './CasualtyIngestion.css';

const CasualtyIngestion = () => {
  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h1 className="view-title">קליטת פצועים</h1>
          <div className="identity-header">
            <CheckCircle size={16} className="text-safe" />
            <span>זהות אומתה: סמ״ר כהן, י. | רפואה טקטית</span>
          </div>
        </div>
        <div className="sync-status">
          <Database size={16} className="text-active" />
          <span>סנכרון ענן מאובטח: פעיל</span>
        </div>
      </div>

      <div className="ingestion-grid">
        <div className="card ingestion-card ocr-card">
          <div className="card-content">
            <div className="icon-wrapper">
              <Camera size={64} className="text-active" />
            </div>
            <h2 className="ingestion-title text-active">סריקה חכמה (OCR)</h2>
            <p className="ingestion-desc">
              השתמש במצלמת הטאבלט כדי לסרוק ולפענח כרטיסי פצוע באופן מיידי לתוך המערכת.
            </p>
            <button className="btn btn-active" style={{ width: '100%' }}>התחל סריקה</button>
          </div>
        </div>

        <div className="card ingestion-card upload-card">
          <div className="card-title">
            <Upload size={18} /> העלאה דיגיטלית
          </div>
          <p className="text-secondary" style={{ marginBottom: '24px', fontSize: '14px' }}>
            בחר מהתקן מקומי או כונני רשת מאובטחים. פורמטים נתמכים: PDF, DOCX.
          </p>
          
          <div className="file-list">
            {[1, 2, 3].map((item) => (
              <div key={item} className="file-item">
                <div className="file-item-right">
                  <FileText size={24} className="file-icon text-secondary" />
                  <div>
                    <div className="file-name">דוח_פצוע_00{item}.pdf</div>
                    <div className="file-meta">1.2 MB • היום, 14:0{item}</div>
                  </div>
                </div>
                <button className="btn btn-outline btn-sm">ייבא</button>
              </div>
            ))}
          </div>
          
          <div className="drop-zone">
            <Upload size={32} style={{ marginBottom: '16px' }} />
            <div className="drop-zone-text">לחץ לחיפוש קבצים במכשיר</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasualtyIngestion;
