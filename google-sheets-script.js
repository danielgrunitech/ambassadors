/**
 * Google Apps Script לקליטת מועמדויות שגרירי Google Gemini ישראל 2026
 * 
 * הוראות התקנה ב-Google Sheets:
 * 1. פתח גוגל שיט חדש (sheets.new) מחשבון Google הרצוי
 * 2. בתפריט העליון לחץ על: תוספים (Extensions) -> Apps Script
 * 3. מחק את מה שכתוב שם, והדבק את כל הקוד הזה במקומו.
 * 4. לחץ על "Deploy" (פריסה) -> "New deployment" (פריסה חדשה).
 * 5. בחר סוג (Select type): "Web app" (אפליקציית אינטרנט).
 * 6. בהגדרות:
 *    - Execute as: "Me" (אני)
 *    - Who has access: "Anyone" (כולם / כל אחד).
 * 7. לחץ על "Deploy", אשר הרשאות, והעתק את ה-"Web app URL".
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

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
      data = e.parameter;
    }

    // Set up headers matching the 2026 TeamGemini application challenges
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

    var timestamp = new Date();
    var institutionStr = data.institution === "מוסד לימודים אחר..." && data.customInstitution 
      ? data.customInstitution 
      : (data.institution || "");
    var platformsStr = Array.isArray(data.preferredPlatforms) ? data.preferredPlatforms.join(", ") : (data.preferredPlatforms || "");

    var newRow = [
      timestamp,
      data.id || ("IL-GEMINI-2026-" + Math.floor(1000 + Math.random() * 9000)),
      data.fullName || "",
      data.phone || "",
      data.email || "",
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

function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var values = sheet.getDataRange().getValues();
    if (values.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        submissions: []
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    var headers = values[0];
    var submissions = [];
    for (var i = 1; i < values.length; i++) {
      var row = values[i];
      var item = {};
      for (var j = 0; j < headers.length; j++) {
        item[headers[j]] = row[j];
      }
      submissions.push(item);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      submissions: submissions
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
