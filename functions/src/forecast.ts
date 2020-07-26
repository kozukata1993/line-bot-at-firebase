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
          temperatureMin: res.data.daily.data[0].temperatureMin,
        });
    }
  });
