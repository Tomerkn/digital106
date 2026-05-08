import React, { useState } from 'react';
import { Search, Filter, Clock, Pill, Save, CheckCircle, Eye } from 'lucide-react';
import './CasualtyCard.css';

const CasualtyCard = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h1 className="view-title">כרטיס רפואי <span className="text-secondary" style={{marginRight: '16px'}}>העברה לדרג ב׳</span></h1>
          <div style={{marginTop: '8px', display: 'flex', gap: '16px'}}>
            <span className="badge badge-safe">סטטוס: יציב</span>
            <span className="badge badge-active">מזהה: אלפא-01</span>
          </div>
        </div>
        <div>
          <button className="btn btn-gradient">
            <Save size={18} /> <span style={{marginRight: '8px'}}>סנכרון סופי לתיק רפואי (EHR)</span>
          </button>
        </div>
      </div>

      <div className="search-bar">
        <div className="input-with-icon">
          <Search size={18} className="search-icon text-secondary" />
          <input type="text" className="input-field doc-search-input" placeholder="חפש התערבויות, תרופות, או הערות..." />
        </div>
        <button className="btn btn-outline" style={{padding: '0 24px'}}>
          <Filter size={18} /> <span style={{marginRight: '8px'}}>סנן</span>
        </button>
      </div>

      <div className="card-grid">
        <div className="card timeline-card">
          <div className="card-title">
            <Clock size={18} /> ציר זמן כרונולוגי
          </div>
          <div className="timeline">
            {[
              { time: '14:05', event: 'נקודת פציעה. פיצוץ מטען חבלה.', type: 'info' },
              { time: '14:07', event: 'זוהה דימום מסיבי בבטן ימנית תחתונה וברגל ימין.', type: 'alert' },
              { time: '14:09', event: 'הונח חסם עורקים (CAT) ברגל ימין.', type: 'action' },
              { time: '14:15', event: 'תחבושת המוסטטית (Combat Gauze) נדחסה לפצע בבטן.', type: 'action' },
              { time: '14:20', event: '1 גרם הקסאקפרון (TXA) ניתן דרך הוריד.', type: 'meds' },
              { time: '14:35', event: 'ניתנה פנטניל 800mcg מתחת ללשון.', type: 'meds' },
              { time: '14:50', event: 'הפצוע הועלה לפינוי מוסק (MEDEVAC).', type: 'info' }
            ].map((item, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-time">{item.time}</div>
                <div className={`timeline-dot dot-${item.type}`}></div>
                <div className="timeline-content">
                  {item.event}
                </div>
                <button 
                  className="btn-icon view-source-btn" 
                  onClick={() => setShowOverlay(true)}
                  title="הצג מסמך מקור"
                >
                  <Eye size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card medications-card">
          <div className="card-title">
            <Pill size={18} /> יומן תרופות
          </div>
          <table className="med-table">
            <thead>
              <tr>
                <th>תרופה</th>
                <th>מינון</th>
                <th>דרך מתן</th>
                <th>זמן</th>
                <th>מקור</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{fontWeight: 'bold'}}>הקסאקפרון</td>
                <td>1g</td>
                <td>וריד</td>
                <td className="font-mono">14:20</td>
                <td>
                  <button onClick={() => setShowOverlay(true)} className="link-btn">
                    <Eye size={14} style={{marginLeft: '4px'}} /> הצג
                  </button>
                </td>
              </tr>
              <tr>
                <td style={{fontWeight: 'bold'}}>פנטניל</td>
                <td>800mcg</td>
                <td>מתחת ללשון</td>
                <td className="font-mono">14:35</td>
                <td>
                  <button onClick={() => setShowOverlay(true)} className="link-btn">
                    <Eye size={14} style={{marginLeft: '4px'}} /> הצג
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {showOverlay && (
        <div className="overlay" onClick={() => setShowOverlay(false)}>
          <div className="overlay-content" onClick={e => e.stopPropagation()}>
            <div className="overlay-header">
              <h3>אימות מסמך מקור</h3>
              <button className="btn btn-outline" onClick={() => setShowOverlay(false)}>סגור</button>
            </div>
            <div className="document-fragment">
              <div className="text-secondary" style={{marginBottom: '16px', fontSize: '14px'}}>מקטע מטופס מקורי (טופס 101)</div>
              <div className="fragment-image">
                [ תצוגה מקדימה לכתב יד ]<br/><br/>
                <span className="text-active" style={{direction: 'ltr', display: 'inline-block'}}>TXA 1g IV @ 1420</span><br/>
                <span className="text-active" style={{direction: 'ltr', display: 'inline-block'}}>Fent 800mcg OTFC @ 1435</span>
              </div>
              <div className="ocr-confidence">
                <CheckCircle size={18} style={{marginLeft: '8px'}} /> רמת ודאות סריקה: 98.4%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CasualtyCard;
