/**
 * ════════════════════════════════════════════════════════
 *  Google Apps Script — Chat Backend
 *  Paste this entire file into script.google.com
 *  Then: Deploy → New deployment → Web app
 *        Execute as: Me
 *        Who has access: Anyone
 *  Copy the Web App URL → paste into src/hooks/useChat.js
 * ════════════════════════════════════════════════════════
 */

// ── REPLACE THIS with your Google Doc's actual ID ────────────
// Get it from the Doc URL: docs.google.com/document/d/THIS_PART/edit
const DOC_ID = 'YOUR_GOOGLE_DOC_ID_HERE'

// ── GET — return all messages (supports JSONP) ───────────────
function doGet(e) {
  const callback = e.parameter.callback   // JSONP callback name

  try {
    const doc  = DocumentApp.openById(DOC_ID)
    const body = doc.getBody().getText()

    const payload = JSON.stringify({ content: body })
    const response = callback
      ? `${callback}(${payload})`          // JSONP
      : payload                             // plain JSON

    return ContentService
      .createTextOutput(response)
      .setMimeType(ContentService.MimeType.JAVASCRIPT)

  } catch (err) {
    const errPayload = JSON.stringify({ error: err.message })
    const response = callback ? `${callback}(${errPayload})` : errPayload
    return ContentService
      .createTextOutput(response)
      .setMimeType(ContentService.MimeType.JAVASCRIPT)
  }
}

// ── POST — append a new message line ────────────────────────
function doPost(e) {
  try {
    const message = e.parameter.message   // "name|HH:MM AM|text"

    if (!message) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'no message' }))
        .setMimeType(ContentService.MimeType.JSON)
    }

    const doc  = DocumentApp.openById(DOC_ID)
    const body = doc.getBody()

    // Append as a new paragraph
    body.appendParagraph(message)

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON)

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}
