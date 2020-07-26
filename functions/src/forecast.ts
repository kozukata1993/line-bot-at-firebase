import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as axios from 'axios';
import * as dayjs from 'dayjs';

export const forecast = functions
  .region('asia-northeast1')
  .pubsub.schedule('0 */3 * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async (context) => {
    const latitude = '35.41';
    const longitude = '139.45';
    const queryParams = '?lang=ja&units=si&exclude=currently,minutely,alerts,flags';
    const url = `${functions.config().darksky.url}${latitude},${longitude}${queryParams}`;

    const res = await axios.default.get(url).catch((error) => {
      console.log(error);
    });

    console.log('------------- forecast -------------');
    if (res) {
      await admin
        .firestore()
        .collection('forecasts')
        .doc(dayjs(new Date()).format('YYYYMMDD'))
        .collection('tokyo')
        .add({
          date: admin.firestore.FieldValue.serverTimestamp(),
          summary: res.data.hourly.summary,
          temperatureMax: res.data.daily.data[0].temperatureMax,
          temperatureLow: res.data.daily.data[0].temperatureMin,
        });
    }
  });

export const httpForecast = functions
  .region('asia-northeast1')
  .https.onRequest(async (req, res) => {
    const latitude = '35.41';
    const longitude = '139.45';
    const queryParams = '?lang=ja&units=si&exclude=currently,minutely,alerts,flags';
    const url = `${functions.config().darksky.url}${latitude},${longitude}${queryParams}`;

    const result = await axios.default.get(url).catch((error) => {
      console.log(error);
      res.status(500).end();
    });

    console.log('------------- forecast -------------');
    if (result) {
      await admin
        .firestore()
        .collection('forecasts')
        .doc(dayjs(new Date()).format('YYYYMMDD'))
        .collection('tokyo')
        .add({
          date: admin.firestore.FieldValue.serverTimestamp(),
          summary: result.data.hourly.summary,
          temperatureMax: result.data.daily.data[0].temperatureMax,
          temperatureLow: result.data.daily.data[0].temperatureMin,
        });
    }
    res.status(200).end();
  });
