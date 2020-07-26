import * as line from '@line/bot-sdk';
import * as admin from 'firebase-admin';
import { EventHandler } from './eventHandlers';

export const createUser: EventHandler = async (req, res) => {
  const events = req.body.events as line.FollowEvent[];
  await admin
    .firestore()
    .collection('users')
    .add({ uid: events[0].source.userId, createdAt: admin.firestore.FieldValue.serverTimestamp() })
    .catch((error) => {
      console.log('------------- ERROR in createUser -------------');
      console.log(error);
      res.status(500).end();
    });
  res.status(200).end();
};
