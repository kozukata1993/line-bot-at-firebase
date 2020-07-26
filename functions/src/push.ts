import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as dayjs from 'dayjs';
import { axios } from './utils/axios';

export const pushMessage = functions
  .region('asia-northeast1')
  .pubsub.schedule('30 06 * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async (context) => {
    const forecastSnapshot = await admin
      .firestore()
      .collection('forecasts')
      .doc(`${dayjs(new Date()).format('YYYYMMDD')}`)
      .collection('tokyo')
      .orderBy('date', 'desc')
      .limit(1)
      .get();

    const forecasts = forecastSnapshot.docs.map((doc) => {
      return {
        summary: doc.data().summary,
        temperatureMax: doc.data().temperatureMax,
        temperatureMin: doc.data().temperatureMin,
      };
    });

    const text = `${forecasts[0].summary}\n最高気温: ${forecasts[0].temperatureMax}℃\n最低気温: ${forecasts[0].temperatureMin}℃`;

    const snapshot = await admin.firestore().collection('users').get();
    snapshot.forEach(async (doc) => {
      const postData = {
        messages: [
          {
            text,
            type: 'text',
          },
        ],
        to: doc.data().uid,
      };

      await axios.post('/push', postData).catch((error) => {
        console.log('------------- ERROR in pushMessage -------------');
        console.log(error);
      });
    });
  });
