import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { axios } from './axios';
import { EventHandler } from './eventHandlers';

export const pushMessage: EventHandler = functions
  .region('asia-northeast1')
  .pubsub.schedule('30 06 * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async (context) => {
    const snapshot = await admin.firestore().collection('users').get();
    snapshot.forEach(async (doc) => {
      const postData = {
        messages: [
          {
            text: 'push message from Firebase',
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
