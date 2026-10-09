/**
 * Tech Delas — endpoint de registro para GitHub Pages.
 * Crie uma planilha privada e cole o ID em SPREADSHEET_ID.
 * Não compartilhe a planilha publicamente.
 */
const SPREADSHEET_ID = "COLE_AQUI_O_ID_DA_PLANILHA";
const SHEET_NAME = "Participações";

function setup() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(["Data e hora", "Nome", "E-mail", "Finalidade"]);
}

function doPost(e) {
  try {
    const data = (e && e.parameter) || {};
    // Honeypot simples para descartar envios automatizados.
    if (data.website) return json_({ ok: true });

    const name = String(data.name || "").trim().replace(/\s+/g, " ").slice(0, 100);
    const email = String(data.email || "").trim().toLowerCase().slice(0, 150);
    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || data.consent !== "true") {
      return json_({ ok: false, error: "Dados inválidos" });
    }

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error("A aba Participações não foi encontrada.");
    sheet.appendRow([new Date(), name, email, "Registro de participação Tech Delas"]);
    return json_({ ok: true });
  } catch (error) {
    console.error(error);
    return json_({ ok: false, error: "Não foi possível registrar" });
  }
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
