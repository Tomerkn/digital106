import React, { useState } from 'react';
import { Activity, AlertTriangle, ShieldAlert, Crosshair, Send, MessageSquare, ChevronDown } from 'lucide-react';
import './PatientHub.css';

const PatientHub = () => {
  const [chatInput, setChatInput] = useState('');

  return (
    <div className="view-container view-flex">
      <div className="view-header">
        <div>
          <h1 className="view-title">דשבורד פצוע <span className="text-secondary" style={{marginRight: '16px'}}>דו״ח מ.נ.מ.ט</span></h1>
          <div style={{marginTop: '8px', display: 'flex', gap: '16px'}}>
            <span className="badge badge-critical">דחיפות פינוי: דחוף</span>
            <span className="badge badge-active">מזהה: אלפא-01</span>
          </div>
        </div>
        <div style={{textAlign: 'left'}}>
          <div className="timer-text">T+00:14:32</div>
          <div className="timer-label">זמן מפציעה</div>
        </div>
      </div>

      <div className="mist-grid">
        {/* M - Mechanism */}
        <div className="card">
          <div className="card-title">
            <ShieldAlert size={18} className="text-active" /> (מ) מנגנון פציעה
          </div>
          <div className="mist-content">
            <div className="mist-value">פיצוץ מטען / רסיסים</div>
            <div className="mist-detail">
              <p>• מרחק: כ-5 מטרים</p>
              <p>• מיגון: חדר לפלג גוף תחתון (בטן)</p>
              <p>• סביבה: לש״ב/שטח סגור</p>
            </div>
          </div>
        </div>

        {/* I - Injuries */}
        <div className="card border-critical-card" style={{borderRadius: 'var(--radius)'}}>
          <div className="card-title text-critical">
            <Crosshair size={18} /> (נ) פציעות
          </div>
          <div className="mist-content" style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            <div className="pill-row" style={{marginBottom: 0, padding: '12px 20px'}}>
              <div className="pill-row-content">
                <span className="text-critical" style={{fontWeight: 800}}>דימום מסיבי</span>
                <span className="text-secondary">גפה תחתונה ימין (עורק הירך)</span>
              </div>
              <ChevronDown size={18} className="text-muted" />
            </div>
            <div className="pill-row" style={{marginBottom: 0, padding: '12px 20px'}}>
              <div className="pill-row-content">
                <span className="text-active" style={{fontWeight: 800}}>פציעה חודרת</span>
                <span className="text-secondary">בטן, ימין תחתונה</span>
              </div>
              <ChevronDown size={18} className="text-muted" />
            </div>
          </div>
        </div>

        {/* S - Signs/Vitals */}
        <div className="card vitals-card">
          <div className="card-title">
            <Activity size={18} className="text-active" /> (מ) מדדים
          </div>
          <div className="vitals-grid">
            <div className="vital-box">
              <div className="vital-label">דופק</div>
              <div className="vital-value text-critical">135</div>
              <div className="vital-trend">↑ טכיקרדיה</div>
            </div>
            <div className="vital-box">
              <div className="vital-label">לחץ דם</div>
              <div className="vital-value text-critical">85/50</div>
              <div className="vital-trend">↓ תת-לחץ דם</div>
            </div>
            <div className="vital-box">
              <div className="vital-label">סטורציה</div>
              <div className="vital-value text-safe">94%</div>
              <div className="vital-trend">← יציב</div>
            </div>
            <div className="vital-box">
              <div className="vital-label">נשימות</div>
              <div className="vital-value text-active">24</div>
              <div className="vital-trend">↑ מוגבר</div>
            </div>
          </div>
        </div>

        {/* T - Treatments */}
        <div className="card">
          <div className="card-title">
            <AlertTriangle size={18} className="text-safe" /> (ט) טיפול
          </div>
          <div className="treatment-list">
            <div className="pill-row" style={{marginBottom: '0', padding: '12px 20px'}}>
              <div className="pill-row-content">
                <span className="badge badge-safe" style={{direction: 'ltr'}}>T+02:00</span>
                <span style={{fontWeight: 600}}>הנחת חסם עורקים (CAT) - רגל ימין</span>
              </div>
              <ChevronDown size={18} className="text-muted" />
            </div>
            <div className="pill-row" style={{marginBottom: '0', padding: '12px 20px'}}>
              <div className="pill-row-content">
                <span className="badge badge-safe" style={{direction: 'ltr'}}>T+05:30</span>
                <span style={{fontWeight: 600}}>הקסאקפרון (TXA) 1g דרך הוריד</span>
              </div>
              <ChevronDown size={18} className="text-muted" />
            </div>
            <div className="pill-row" style={{marginBottom: '0', padding: '12px 20px'}}>
              <div className="pill-row-content">
                <span className="badge badge-safe" style={{direction: 'ltr'}}>T+12:00</span>
                <span style={{fontWeight: 600}}>פנטניל 800mcg (סוכריה)</span>
              </div>
              <ChevronDown size={18} className="text-muted" />
            </div>
          </div>
        </div>
      </div>

      <div className="ai-chat-section">
        <div className="card chat-card">
          <div className="card-title" style={{borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '0'}}>
            <MessageSquare size={18} className="text-active" /> סייע פרוטוקולים מבוסס AI
          </div>
          
          <div className="chat-messages">
            <div className="message ai-message">
              <div className="message-sender">מערכת</div>
              <div className="message-bubble">רשומות הפצוע סונכרנו. ממתין לשאילתות פרוטוקול רפואי.</div>
            </div>
            <div className="message user-message" style={{marginTop: '16px', textAlign: 'left'}}>
              <div className="message-sender">אני</div>
              <div className="message-bubble user-bubble">מה המינון הכולל של מורפיום שניתן?</div>
            </div>
            <div className="message ai-message" style={{marginTop: '16px'}}>
              <div className="message-sender">מערכת <span className="text-safe" style={{marginRight: '8px'}}>✓ מאומת</span></div>
              <div className="message-bubble border-safe">
                <strong>אפס (0 מ״ג) מורפיום ניתן.</strong><br/><br/>
                הערה: הפצוע קיבל <strong>פנטניל 800mcg (סוכריה)</strong> ב- T+12:00. <br/>
                בדיקת התוויות נגד: הפצוע במצב של תת-לחץ דם (85/50). הימנע מנרקוטיקה נוספת; מומלץ מתן קטמין 50mg IM/IN במידה ונדרש שיכוך כאבים נוסף ע״פ הנחיות TCCC.
              </div>
            </div>
          </div>
          
          <div className="chat-input-area">
            <input 
              type="text" 
              className="input-field" 
              placeholder="חפש נתוני פצוע או פרוטוקולי TCCC..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button className="btn btn-active" style={{padding: '0 24px'}}>
              <Send size={18} style={{ transform: 'scaleX(-1)' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHub;
