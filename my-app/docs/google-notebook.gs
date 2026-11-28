// Standalone Apps Script for Yan's portfolio notebook. Keep this script private.
// Set NOTEBOOK_TOKEN in Project Settings > Script properties before deploying.
const NOTEBOOK_ID = '12Daqo8vr9VJcmBPFkYOkVzWmqaL5ob40pIi5-Cy1XOw';
const NOTEBOOK_TAB_ID = 559632055;
const NOTEBOOK_HEADERS = ['Answer', 'Updated (UTC)', 'Anonymous visitor'];

function doPost(e) {
  const json = value => ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
  let lock;
  try {
    const raw = e && e.postData && e.postData.contents;
    if (typeof raw !== 'string' || raw.length > 2048) return json({ok:false,status:400});
    const body = JSON.parse(raw);
    const token = PropertiesService.getScriptProperties().getProperty('NOTEBOOK_TOKEN');
    if (!token || token.length < 32 || body.token !== token) return json({ok:false,status:403});
    const visitor = body.visitor_id;
    if (typeof visitor !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(visitor))
      return json({ok:false,status:400});
    if (typeof body.answer !== 'string') return json({ok:false,status:400});
    const answer = body.answer.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!answer || answer.length > 160) return json({ok:false,status:400});
    lock = LockService.getScriptLock();
    if (!lock.tryLock(5000)) return json({ok:false,status:503});
    const sheet = SpreadsheetApp.openById(NOTEBOOK_ID).getSheetById(NOTEBOOK_TAB_ID);
    if (!sheet || sheet.getRange(1,1,1,3).getDisplayValues()[0].join('|') !== NOTEBOOK_HEADERS.join('|'))
      return json({ok:false,status:503});
    const last = sheet.getLastRow();
    // Bound work; never silently discard old responses when the notebook fills.
    if (last > 10001) return json({ok:false,status:503});
    const rows = last > 1 ? sheet.getRange(2,1,last-1,3).getDisplayValues() : [];
    const existingIndex = rows.findIndex(row => row[2] === visitor);
    const existing = rows[existingIndex];
    const now = Date.now();
    if (existing && existing[0] !== answer && now - Date.parse(existing[1]) < 60000)
      return json({ok:false,status:429});
    const previous = rows.filter(row => row[2] !== visitor && row[0].trim() && row[0].length <= 160 && Number.isFinite(Date.parse(row[1])))
      .sort((a,b) => Date.parse(b[1])-Date.parse(a[1]) || b[2].localeCompare(a[2]))
      .slice(0,3).map(row => row[0]);
    if (!existing || existing[0] !== answer) {
      if (!existing && last >= 10001) return json({ok:false,status:503});
      const target = existing ? existingIndex+2 : last+1;
      if (target > sheet.getMaxRows()) sheet.insertRowsAfter(sheet.getMaxRows(), 100);
      // Leading apostrophe makes visitor input literal text, never a Sheet formula.
      sheet.getRange(target,1,1,3).setNumberFormat('@').setValues([["'"+answer,new Date(now).toISOString(),visitor]]);
      SpreadsheetApp.flush();
    }
    return json({ok:true,answer,previous});
  } catch (_) {
    return json({ok:false,status:503});
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

// Read-only authorization check. Run once in the editor before deployment.
function checkNotebook() {
  const sheet = SpreadsheetApp.openById(NOTEBOOK_ID).getSheetById(NOTEBOOK_TAB_ID);
  if (!sheet || sheet.getRange(1,1,1,3).getDisplayValues()[0].join('|') !== NOTEBOOK_HEADERS.join('|'))
    throw new Error('Notebook headers are missing or changed.');
  console.log('Notebook is accessible. No responses were written.');
}
