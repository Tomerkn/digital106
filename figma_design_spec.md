# Design Specification: Digital Medicine (רפואה דיגיטלית)

This document provides a comprehensive breakdown of the tactical medical interface to enable precise recreation in Figma.

---

## 1. Design System & Tokens

### Color Palette (High Contrast / Dark Mode)
*   **Background (Deep):** `#0A0A0A` (Deep Charcoal/Black)
*   **Panel Background:** `#141414` (Lighter Charcoal)
*   **Panel Hover:** `#222222`
*   **Border/Stroke:** `#2D2D2D`
*   **Primary Accent (Active):** `#00A3FF` (Electric Blue)
*   **Safe/Success:** `#00C853` (Forest Green)
*   **Critical/Alert:** `#D32F2F` (Saturated Red)
*   **Primary Gradient (Buttons):** Linear `135deg` from `#FF6B6B` to `#FF8E53` (CPRGO Orange/Coral)

### Typography
*   **Font Family:** `Assistant` (Google Fonts) - High legibility Hebrew Sans-serif.
*   **Weights:** Regular (400), SemiBold (600), Bold (700), ExtraBold (800).
*   **Base Sizes:** Body (15px/16px), Card Title (18px), View Title (32px).

### Shape & Geometry
*   **Corner Radius:** `16px` for standard cards/panels.
*   **Pill Radius:** `9999px` (fully rounded) for buttons, inputs, and action rows.
*   **Shadows:** Soft, deep shadows for depth (`0 8px 24px rgba(0,0,0,0.6)`).

---

## 2. Global Layout Structure

### Layout: Sidebar + Main Content
*   **Sidebar Width:** `280px`.
*   **Sidebar Style:** Dark gradient background, left border separator.
*   **Sidebar Header:** System Logo ("רפואה דיגיטלית" Badge) + Secure Connection Status.
*   **Sidebar Nav:** Vertical list of pill-shaped links with Lucide icons.
*   **Sidebar Footer:** User Profile pill containing Name ("סרן תומר קנובלר"), Role ("רופא"), Avatar, and Logout button.

---

## 3. Screen-by-Screen Flow

### Screen 1: Login Gateway
*   **Layout:** Centered modal card on deep background.
*   **Header:** Shield Icon + "רפואה דיגיטלית" Title + "הזדהות מטפל" Subtitle.
*   **Inputs:** Number input for ID, Searchable Dropdown for Unit selection.
*   **Button:** Full-width Gradient Pill Button: "כניסה למערכת".

### Screen 2: Patient List (ניהול אירוע)
*   **Ingestion Panel (Top):** Large card with two massive actionable areas:
    1.  **OCR Scan:** Camera icon + "סריקת טופס 106".
    2.  **Upload:** Upload icon + "העלאת קובץ דיגיטלי".
*   **Status Bar:** Inline loader animation ("מנתח קובץ...").
*   **Patient Grid (Bottom):** Cards for active patients.
    *   **Header:** Patient ID (e.g., "אלפא-01") + Status Badge (Critical/Safe).
    *   **Body:** Grid of metrics: T-Time (Injury time), HR (Last Pulse), Primary Injury.
    *   **Footer:** "למעבר לתיק הפצוע ←" (Active Blue).

### Screen 3: Patient Dashboard (דשבורד פצוע - מ.נ.מ.ט)
*   **MIST Grid:** 4-card layout mapping to Mechanism, Injuries, Signs, Treatments.
*   **Sign/Vitals Card:** 4-box grid (Heart Rate, BP, SpO2, Resp Rate) with large numbers and colored trend indicators (↑/↓).
*   **Treatment/Injury Lists:** Pill-shaped rows with icons and chevrons (interactive/expandable feel).
*   **AI Assistant (Bottom):** Chat-style interface. AI response bubble highlighted with source validation badge.

### Screen 4: Medical Card (כרטיס רפואי)
*   **Timeline View:** Vertical list with time-stamps and colored dots (Actions vs Meds).
*   **Medication Table:** Clean table with "View Source" buttons for each entry.
*   **Source Validation Overlay:** Semi-transparent overlay showing a "crop" of the original hand-written document next to the OCR verification.
*   **Action Button (Top Right):** Gradient "סנכרון סופי לתיק רפואי (EHR)".

### Screen 5: Doctrine Base (תורת רפואה)
*   **Split View:** Sidebar list of search results vs. Document Viewer.
*   **Search Bar:** Large top input with Lucide search icon.
*   **Document Viewer:** High-contrast reading mode with highlighted "AI Summary" box (Bordered with Primary Blue).

---

## 4. Key Interactive Components

1.  **The "CPRGO Pill Row":** A container with `16px 24px` padding, fully rounded, with a chevron-down on the left and primary data on the right.
2.  **The "Active Pulse":** A ring animation around icons when processing (OCR/Sync).
3.  **Contextual Sidebar:** When path is `/patient/:id/*`, the sidebar adds a new section: "Current Patient: [ID]" with specific sub-links.
