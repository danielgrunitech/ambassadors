/**
 * Google Apps Script לקליטת מועמדויות שגרירי Google Gemini ישראל 2026
 * עם מנגנוני הגנה מתקדמים נגד ספאם (Anti-Spam) ומניעת כפילויות (Deduplication)
 * 
 * מה חדש במנגנון האבטחה:
 * 1. מניעת כפילויות קשיחה (One Submission Per Person):
 *    בודק האם כתובת המייל או מספר הטלפון כבר קיימים בגיליון. אם כן - חוסם ולא מאפשר הוספת שורה כפולה!
 * 2. מלכודת בוטים (Honeypot Protection):
 *    חוסם באופן שקט בוטים וסורקי אבטחה שממלאים שדות נסתרים.
 * 3. נעילת עריכה סימולטנית (LockService):
 *    מונע מצבי מירוץ (Race Conditions) של שליחות במקביל באותה שנייה.
 * 
 * הוראות עדכון ב-Google Sheets:
 * 1. פתחו את ה-Google Sheet שלכם
 * 2. בתפריט העליון: תוספים (Extensions) -> Apps Script
 * 3. החליפו את כל הקוד הקיים בקוד הזה ולחצו Save (שמור)
 * 4. לחצו על: פריסה (Deploy) -> נהל פריסות (Manage deployments)
 * 5. לחצו על עיפרון העריכה (Edit) -> שנו גרסה ל-"New version" (גרסה חדשה) -> Deploy (פרוס)!
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Lock for up to 10 seconds to handle concurrent requests safely
  var hasLock = lock.tryLock(10000);
  if (!hasLock) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "busy",
      message: "Server is processing another request, please try again."
    })).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse incoming data
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter || {};
    }

    // 1. HONEYPOT TRAP: If a bot or security scanner filled the hidden trap field, silently discard
    if (data.website_trap || data.honeypot || data.company_url || data.fax_number) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "ignored",
        message: "Request ignored."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Helper: Normalize phone numbers (strips formatting, Israeli +972 country code, and leading zeros)
    function normalizePhone(p) {
      if (!p) return "";
      var digits = p.toString().replace(/[^0-9]/g, "");
      if (digits.indexOf("972") === 0) {
        digits = digits.substring(3);
      }
      return digits.replace(/^0+/, "");
    }

    // 2. NORMALIZE EMAIL & PHONE
    var cleanEmail = (data.email || "").toString().trim().toLowerCase();
    var cleanPhone = normalizePhone(data.phone);

    // Validate email presence
    if (!cleanEmail || cleanEmail.indexOf("@") === -1) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "A valid email address is required."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Set up headers matching the 2026 application challenges
    var headers = [
      "Timestamp",
      "Candidate ID",
      "שם מלא",
      "טלפון (WhatsApp)",
      "דוא\"ל",
      "מוסד לימודים",
      "שנת לימודים",
      "חוג / פקולטה",
      "תחביבים ותחומי עניין",
      "פלטפורמות דיגיטליות",
      "LinkedIn",
      "TikTok",
      "Instagram",
      "YouTube / אחר",
      "אתגר 1: בעיה בקמפוס (Canvas)",
      "אתגר 1: פתרון ב-Canvas ולמה מתאים",
      "אתגר 2: קישור לתוכן ויראלי",
      "אתגר 2: פירוט והצלחה של התוכן",
      "אתגר 3: הובלת קהילה/יוזמה מאפס",
      "אתגר 4: רעיון פופ-אפ בקמפוס (Gemini + NotebookLM)",
      "אתגר 5: למה שגריר/ת Google Gemini?",
      "סרטון פיץ' (60-90 שניות)",
      "תקציר Study Hack"
    ];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length)
        .setBackground("#1A73E8")
        .setFontColor("#FFFFFF")
        .setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // 3. DEDUPLICATION (Enforce one submission per candidate)
    var lastRow = sheet.getLastRow();
    var lastCol = sheet.getLastColumn();
    if (lastRow > 1 && lastCol > 0) {
      // Dynamically locate Email and Phone columns from header row
      var headerValues = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
      var emailColIdx = -1;
      var phoneColIdx = -1;

      for (var h = 0; h < headerValues.length; h++) {
        var hText = (headerValues[h] || "").toString().toLowerCase();
        if (emailColIdx === -1 && (hText.indexOf("דוא") > -1 || hText.indexOf("אימייל") > -1 || hText.indexOf("email") > -1)) {
          emailColIdx = h;
        }
        if (phoneColIdx === -1 && (hText.indexOf("טלפון") > -1 || hText.indexOf("phone") > -1 || hText.indexOf("whatsapp") > -1)) {
          phoneColIdx = h;
        }
      }

      // Safe defaults if header names differ
      if (emailColIdx === -1) emailColIdx = 4; // Col E
      if (phoneColIdx === -1) phoneColIdx = 3; // Col D

      var allData = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
      for (var i = 0; i < allData.length; i++) {
        var existingEmail = (allData[i][emailColIdx] || "").toString().trim().toLowerCase();
        var existingPhone = normalizePhone(allData[i][phoneColIdx]);

        // Check if email already exists
        if (existingEmail && cleanEmail && existingEmail === cleanEmail) {
          return ContentService.createTextOutput(JSON.stringify({
            status: "duplicate",
            message: "This email address (" + cleanEmail + ") has already submitted an application. Only one submission is permitted per candidate."
          })).setMimeType(ContentService.MimeType.JSON);
        }

        // Check if phone already exists (at least 7 significant digits)
        if (cleanPhone && cleanPhone.length >= 7 && existingPhone && existingPhone === cleanPhone) {
          return ContentService.createTextOutput(JSON.stringify({
            status: "duplicate",
            message: "This phone number (" + data.phone + ") is already registered. Only one submission is permitted per candidate."
          })).setMimeType(ContentService.MimeType.JSON);
        }
      }
    }

    // 4. PREPARE & APPEND NEW CANDIDATE ROW
    var timestamp = new Date();
    var institutionStr = data.institution === "מוסד לימודים אחר..." && data.customInstitution 
      ? data.customInstitution 
      : (data.institution || "");
    var platformsStr = Array.isArray(data.preferredPlatforms) ? data.preferredPlatforms.join(", ") : (data.preferredPlatforms || "");

    // Format phone with leading apostrophe so Google Sheets preserves leading zeros
    var formattedPhone = data.phone ? ("'" + data.phone.toString().trim()) : "";

    var newRow = [
      timestamp,
      data.id || ("IL-GEMINI-2026-" + Math.floor(1000 + Math.random() * 9000)),
      data.fullName || "",
      formattedPhone,
      cleanEmail,
      institutionStr,
      data.currentYear || "",
      data.fieldOfStudy || "",
      data.hobbiesAndInterests || "",
      platformsStr,
      data.linkedInUrl || "",
      data.tiktokUrl || "",
      data.instagramUrl || "",
      data.youtubeUrl || data.youtubeOrOtherUrl || "",
      data.canvasCampusProblem || "",
      data.canvasSolutionDetails || "",
      data.viralContentUrl || "",
      data.viralContentDescription || "",
      data.communityLeadershipStory || data.pastLeadershipExperience || "",
      data.campusPopUpIdea || data.proposedFirstEvent || "",
      data.whyGoogleGeminiAmbassador || data.whyAmbassador || "",
      data.videoPitchUrl || "",
      data.studyHackSummary || ""
    ];

    sheet.appendRow(newRow);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      id: data.id,
      message: "המועמדות נקלטה בהצלחה!"
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

function doGet(e) {
  // Secure: Write-only endpoint
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    message: "Google Gemini Ambassador Israel 2026 Endpoint (Write-Only, Anti-Spam Enabled)"
  })).setMimeType(ContentService.MimeType.JSON);
}
