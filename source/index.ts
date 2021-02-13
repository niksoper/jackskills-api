import * as express from 'express';
import { google } from 'googleapis';

const spreadsheetId = '1znN2FhbO2gA1uVDk8i6wbsXSzoem7s-4IMbb8P_RiVI';
const apiKey = process.env.SHEETS_API_KEY;
const sheets = google.sheets({ version: 'v4', auth: apiKey });

const app = express();
app.get('/', async (req, res) => {
  res.send('IT IS ME THE RASPANSE!!?!');
});

app.get('/kills', async (req, res) => {
  try {
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "'Form responses 1'!B2:C",
    });
    res.send(result.data.values);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something broke!');
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`jackskills-api: listening on port ${port}`);
});
