import * as express from 'express';
import { google } from 'googleapis';
import { IKill } from './coreTypes';
import { mapResponseRow } from './killsService';
import { errorHandler } from './errors';

const spreadsheetId = '1znN2FhbO2gA1uVDk8i6wbsXSzoem7s-4IMbb8P_RiVI';
const apiKey = process.env.SHEETS_API_KEY;
const sheets = google.sheets({ version: 'v4', auth: apiKey });

const app = express();

app.get('/kills', async (req, res, next) => {
  try {
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "'Form responses 1'!B2:C",
    });

    const kills = result.data.values?.map<IKill>((row) => mapResponseRow(row));

    if (kills === undefined) {
      throw new Error('There was a problem getting the kills');
    }

    res.send(kills);
  } catch (err) {
    errorHandler(err, req, res, next);
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`jackskills-api: listening on port ${port}`);
});
