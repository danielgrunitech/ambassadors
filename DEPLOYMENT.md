# מדריך פריסה לאינטרנט: Vercel & Google Sheets

מדריך קצר זה מסביר כיצד להעלות את אתר שגרירי Google Gemini ישראל לרשת תוך 5 דקות, ולחבר אותו לטבלת Google Sheets שתקלוט את כל המועמדויות אוטומטית.

---

## 1. חיבור ל-Google Sheets (איסוף מועמדויות ומיילים)

1. פתחו גיליון Google Sheets חדש: [sheets.new](https://sheets.new)
2. תנו לגיליון שם, לדוגמה: `Gemini Ambassador Israel 2026 - Submissions`
3. בתפריט העליון לחצו על: **תוספים (Extensions)** -> **Apps Script**
4. מחקו את הטקסט הקיים, והדביקו את כל התוכן מהקובץ [google-sheets-script.js](./google-sheets-script.js)
5. לחצו למעלה על **פריסה (Deploy)** -> **פריסה חדשה (New deployment)**
6. בחרו בסוג: **אפליקציית אינטרנט (Web app)**
7. הגדירו:
   - **בצע כ (Execute as)**: "אני" (Me)
   - **למי יש גישה (Who has access)**: "כל אחד" (Anyone) - *חשוב כדי שמועמדים יוכלו לשלוח ללא צורך בהתחברות*.
8. לחצו על **Deploy**, אשרו הרשאות לחשבון שלכם, והעתיקו את כתובת ה-Web app URL (מתחילה ב-`https://script.google.com/macros/s/.../exec`).
9. הדביקו את הכתובת באתר שלכם:
   - לחצו על סמל הניהול בראש האתר -> לחצו על כפתור **"Google Sheets Webhook"** -> הדביקו ולחצו **"שמור הגדרה"**!

> **בונוס אוטומטי**: הסקריפט כולל גם שליחת מייל אישור חגיגי אוטומטי מ-Gmail למועמד מיד עם הגשת הטופס!

---

## 2. העלאה לאוויר ב-Vercel (Hosting)

### אפשרות א': הרצה ישירה מהטרמינל (הכי מהיר)
פתחו את הטרמינל במחשב והריצו:
```bash
cd /Users/danielsagiv/.gemini/antigravity/scratch/gemini-ambassador-israel
npx vercel
```
1. אם זו פעם ראשונה, הוא יבקש להתחבר לחשבון ה-Vercel שלכם בדפדפן.
2. אישרו את ברירות המחדל (Enter בכל השאלות).
3. תוך 30 שניות תקבלו קישור ציבורי ישיר לאתר שלכם! (לדוגמה: `https://gemini-ambassador-israel.vercel.app`).

### אפשרות ב': חיבור דרך GitHub (מומלץ לעדכונים שוטפים)
1. צרו מאגר (Repository) חדש ב-GitHub.
2. דחפו את הקוד:
   ```bash
   git remote add origin https://github.com/YOUR_USER/gemini-ambassador-israel.git
   git branch -M main
   git push -u origin main
   ```
3. היכנסו ל-[vercel.com/new](https://vercel.com/new), בחרו את המאגר ולחצו **Deploy**.
