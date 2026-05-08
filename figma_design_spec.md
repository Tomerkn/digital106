# Pixel-Perfect Design Specification: Digital Medicine (רפואה דיגיטלית)

This document provides exact technical values and CSS properties to ensure 100% accuracy when recreating the interface in Figma.

---

## 1. Core Visual Tokens (CSS Constants)

| Token | Value | Figma Property |
| :--- | :--- | :--- |
| **Background (Main)** | `#0A0A0A` | Fill |
| **Panel Background** | `#141414` | Fill |
| **Panel Hover** | `#222222` | Fill |
| **Border Color** | `#2D2D2D` | Stroke (1px Inside) |
| **Text Primary** | `#FFFFFF` | Fill |
| **Text Secondary** | `#9E9E9E` | Fill |
| **Accent Active** | `#00A3FF` | Fill / Stroke |
| **Accent Safe** | `#00C853` | Fill / Stroke |
| **Accent Critical** | `#D32F2F` | Fill / Stroke |
| **Gradient Start** | `#FF6B6B` | Linear Gradient (0%) |
| **Gradient End** | `#FF8E53` | Linear Gradient (100%) |

---

## 2. Typography (Assistant Font)

*   **View Titles:** `32px`, ExtraBold (800), Letter-spacing: `0.5px`. (e.g., "בינת הפקודות")
*   **Card Titles:** `18px`, Bold (700), Color: `white`.
*   **Body Text:** `15px`, Regular (400), Line-height: `1.6`.
*   **Pill Text:** `14px`, Bold (700).
*   **Badges:** `13px`, ExtraBold (800), Uppercase.
*   **Mono/Numeric:** Use `Assistant` Bold (700) - Avoid fallback to generic monospace.

---

## 3. Structural Dimensions & Spacing

*   **Global Padding:** `40px` (Main views).
*   **Sidebar Width:** `280px`.
*   **Card Padding:** `32px` all sides.
*   **Pill Row Height:** `56px` fixed (or `16px` top/bottom padding).
*   **Gaps:**
    *   Grid Gaps: `24px`.
    *   Section Gaps: `40px`.
    *   Icon-to-Text Gap: `12px` or `16px`.
*   **Corner Radii:**
    *   Cards: `16px`.
    *   Buttons/Pills/Inputs: `999px` (Full circle ends).

---

## 4. Specific Component Specs (CSS to Figma)

### The "CPRGO Save Button" (Gradient)
```css
background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
border-radius: 999px;
padding: 14px 28px;
box-shadow: 0 6px 16px rgba(255, 107, 107, 0.25);
color: #FFFFFF;
font-weight: 700;
```

### The "Pill Row" (Accordion Base)
```css
background-color: #1A1A1A; /* --bg-panel-light */
border: 1px solid #2D2D2D;
border-radius: 999px;
padding: 16px 24px;
display: flex;
align-items: center;
justify-content: space-between;
```

### The "Vital Box" (Dashboard)
```css
background-color: #141414;
border: 1px solid #2D2D2D;
padding: 20px;
border-radius: 16px;
text-align: center;
```
*   **Value Text:** `36px`, ExtraBold (800).
*   **Label Text:** `12px`, Bold (700), Color: `#9E9E9E`.

---

## 5. View Hierarchies

### Navigation Sidebar
1.  **Header (72px height):** "רפואה דיגיטלית" (26px Bold) + Wifi Icon (14px).
2.  **Nav Items:** 52px height, 16px horizontal padding. Active state: `#00A3FF` with 15% opacity background.
3.  **Profile Pill (Bottom):** 64px height, contains 32px avatar + 14px Name + 12px Role.

### Patient List Grid
*   **Card Header:** 20px Bold ID + 13px Bold Badge.
*   **Data Rows:** Icon (16px) + Value (15px Bold) + Label (13px Regular, aligned left).
*   **Footer Link:** 13px Bold, Left Aligned, 70% opacity.

---

---

## 6. Iconography (Lucide Set)
*   **Stroke Width:** `2px` for all icons.
*   **Sizes:**
    *   Global Icons: `20px`.
    *   Dashboard Large: `32px`.
    *   Inline Small: `16px`.

---

## 7. Standard Labels & Military Context
*   **Official Source Badge:** "דוקטרינה מאושרת (ע״פ פקודה 1982/ג)".
*   **Unit Profile:** "סרן תומר קנובלר" (Captain Tomer Knobler).
*   **System Name:** "רפואה דיגיטלית" (Digital Medicine).
*   **Module Name:** "בינת הפקודות" (AI Protocol Intelligence).
*   **AI Model Label:** "מודל ידע מבוסס AI"



