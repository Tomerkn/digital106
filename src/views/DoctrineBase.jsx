import React, { useState } from 'react';
import { Search, Book, FileText, CheckCircle, BrainCircuit } from 'lucide-react';
import './DoctrineBase.css';

const DoctrineBase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const results = [
    { id: 1, title: 'הנחיות TCCC: דימום מסיבי', match: '99.2%', section: 'סעיף 2.א' },
    { id: 2, title: 'טיפול ממושך בשטח (PFC): המרת חסם עורקים', match: '94.5%', section: 'פרק 4' },
    { id: 3, title: 'פרוטוקול שיכוך כאב (תת-לחץ דם)', match: '88.7%', section: 'סעיף 6.ב' },
  ];

  const [selectedDoc, setSelectedDoc] = useState(results[0]);

  return (
    <div className="view-container doctrine-container">
      <div className="view-header">
        <div>
          <h1 className="view-title">תורת רפואה <span className="text-secondary" style={{marginRight: '16px'}}>מודול ידע מבוסס AI</span></h1>
          <div style={{marginTop: '8px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '14px'}}>
            <BrainCircuit size={16} className="text-active" /> חיפוש וקטורי פעיל
          </div>
        </div>
      </div>

      <div className="search-bar" style={{marginBottom: '24px'}}>
        <div className="input-with-icon" style={{width: '100%'}}>
          <Search size={20} className="search-icon text-active" style={{right: '16px', left: 'auto'}} />
          <input 
            type="text" 
            className="input-field doc-search" 
            placeholder="חפש בפרוטוקולי רפואה צבאית (לדוגמה: 'כללי הנחת חסם עורקים', 'מינון קטמין')..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="doctrine-grid">
        <div className="card results-card">
          <div className="card-title">
            <Book size={18} /> תוצאות חיפוש
          </div>
          
          <div className="results-list">
            {results.map((res) => (
              <div 
                key={res.id} 
                className={`result-item ${selectedDoc.id === res.id ? 'active' : ''}`}
                onClick={() => setSelectedDoc(res)}
              >
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                  <div style={{fontWeight: 'bold', fontSize: '14px'}}>{res.title}</div>
                  <div className="badge badge-safe" style={{direction: 'ltr'}}>{res.match}</div>
                </div>
                <div style={{fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <FileText size={12} /> {res.section}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card viewer-card">
          <div className="card-title" style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}><FileText size={18} /> מציג מסמכים</div>
            <div className="text-active font-mono" style={{fontSize: '12px'}}>{selectedDoc.title}</div>
          </div>
          
          <div className="document-page">
            <div className="badge badge-safe" style={{position: 'absolute', top: '16px', left: '16px'}}>תורה רשמית</div>
            <h2 className="doc-header">הנחיות לטיפול בפצועי פח״ע/מלחמה (TCCC)</h2>
            
            <h3 className="doc-subheader">2. דימום מסיבי</h3>
            <p className="doc-paragraph">
              א. הערך קיומו של דימום בלתי מזוהה ושלוט בכל מקורות הדימום. אם טרם בוצע, השתמש בחסם עורקים לגפיים המומלץ על ידי CoTCCC לשליטה בדימום חיצוני מסכן חיים שמתאים אנטומית לשימוש בחסם עורקים, או בכל קטיעה טראומטית. הנח ישירות על העור 5-8 ס״מ מעל מקור הדימום.
            </p>
            
            <p className="doc-paragraph">
              ב. עבור דימום ניתן לדחיסה (חיצוני) שאינו מתאים לשימוש בחסם עורקים לגפיים, או כתוספת להסרת חסם עורקים, השתמש בתחבושת המוסטטית (לדוגמה Combat Gauze) תוך הפעלת לחץ ישיר למשך 3 דקות לפחות.
            </p>
            
            <div className="rag-highlight">
              <div style={{fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px'}} className="text-active">
                <CheckCircle size={16} /> הדגשת מערכת AI
              </div>
              <p style={{fontSize: '14px', margin: 0}}>
                בהתבסס על שאלתך, ההוראה הרלוונטית ביותר היא <strong>להניח את חסם העורקים ישירות על העור 5-8 ס״מ מעל מקור הדימום</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctrineBase;
