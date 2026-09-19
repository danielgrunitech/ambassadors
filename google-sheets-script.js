/**
 * Google Apps Script לקליטת מועמדויות שגרירי Google Gemini ישראל 2026
 * 
 * הוראות התקנה ב-Google Sheets (לוקח 2 דקות):
 * 1. פתח גוגל שיט חדש (sheets.new) ותן לו שם, למשל: "Gemini Ambassador Israel 2026 - Submissions"
 * 2. בתפריט העליון לחץ על: תוספים (Extensions) -> Apps Script
 * 3. מחק את מה שכתוב שם, והדבק את כל הקוד הזה במקומו.
 * 4. לחץ על "Deploy" (פריסה) בפינה הימנית/שמאלית למעלה -> "New deployment" (פריסה חדשה).
 * 5. בחר סוג (Select type): "Web app" (אפליקציית אינטרנט).
 * 6. בהגדרות:
 *    - Execute as: "Me" (אני)
 *    - Who has access: "Anyone" (כולם / כל אחד - כולל אנונימי, כדי שסטודנטים יוכלו לשלוח את הטופס ללא צורך בהתחברות).
 * 7. לחץ על "Deploy", אשר הרשאות לחשבון הגוגל שלך, והעתק את ה-"Web app URL" (מתחיל ב-https://script.google.com/macros/s/...).
 * 8. הדבק את ה-URL הזה בקובץ .env או בפרויקט (משתנה VITE_GOOGLE_SHEETS_WEBHOOK_URL).
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse incoming data (supports both JSON payload and FormData)
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter;
    }

    // Set up headers if first time
    var headers = [
      "Timestamp",
      "Candidate ID",
      "שם מלא",
      "אימייל",
      "טלפון",
      "עיר",
      "מוסד אקדמי",
      "תואר",
      "תחום לימודים",
      "שנת לימוד",
      "LinkedIn",
      "מדוע רוצה להיות שגריר/ה?",
      "שימוש נוכחי ב-Gemini",
      "פיצ'ר אהוב ב-Gemini",
      "חוזקות נבחרות",
      "ניסיון ויוזמות עבר",
      "כישורים טכניים",
      "רעיון לאירוע ראשון בקמפוס",
      "אסטרטגיה לקהל לא-טכנולוגי",
      "היקף שעות שבועי",
      "סרטון היכרות (Pitch)"
    ];

    if (sheet.getLastRow() === 0) {
      var headerRange = sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length)
        .setBackground("#1A73E8")
        .setFontColor("#FFFFFF")
        .setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    var timestamp = new Date();
    var strengthsStr = Array.isArray(data.primaryStrengths) ? data.primaryStrengths.join(", ") : (data.primaryStrengths || "");
    var techSkillsStr = Array.isArray(data.technicalSkills) ? data.technicalSkills.join(", ") : (data.technicalSkills || "");
    var institutionStr = data.institution === "מוסד אקדמי אחר..." && data.customInstitution ? data.customInstitution : data.institution;

    var newRow = [
      timestamp,
      data.id || ("IL-GEMINI-2026-" + Math.floor(1000 + Math.random() * 9000)),
      data.fullName || "",
      data.email || "",
      data.phone || "",
      data.city || "",
      institutionStr || "",
      data.degree || "",
      data.fieldOfStudy || "",
      data.currentYear || "",
      data.linkedInUrl || "",
      data.whyAmbassador || "",
      data.currentGeminiUsage || "",
      data.favoriteGeminiFeature || "",
      strengthsStr,
      data.pastLeadershipExperience || "",
      techSkillsStr,
      data.proposedFirstEvent || "",
      data.nonTechOutreachStrategy || "",
      data.weeklyCommitmentHours || "",
      data.videoPitchUrl || ""
    ];

    sheet.appendRow(newRow);

    // Optional: Send automated confirmation email to candidate
    if (data.email && data.email.indexOf("@") > -1) {
      try {
        var subject = "אישור קבלת מועמדות | שגרירי Google Gemini בישראל 2026";
        var body = "שלום " + (data.fullName || "") + ",\n\n" +
          "שמחנו לקבל את מועמדותך לתוכנית שגרירי Google Gemini בישראל לשנת 2026!\n\n" +
          "מספר המועמדות שלך למעקב: " + (data.id || "התקבל") + "\n" +
          "מוסד לימודים: " + institutionStr + "\n\n" +
          "צוות התוכנית בוחן את הפניות בימים אלה. מועמדים מתאימים יוזמנו לשיחת היכרות קצרה (Zoom).\n\n" +
          "בהצלחה רבה!\n" +
          "צוות תוכנית שגרירי Google Gemini ישראל 2026";
        
        MailApp.sendEmail(data.email, subject, body);
      } catch (mailErr) {
        Logger.log("Email auto-response error: " + mailErr.toString());
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      id: data.id
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
