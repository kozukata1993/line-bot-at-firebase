import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as line from '@line/bot-sdk';
import { eventHandlers } from './eventHandlers';

admin.initializeApp();

export const webhook = functions.region('asia-northeast1').https.onRequest(async (req, res) => {
  console.log('------------- START -------------');

  const eventTypes = req.body.events.map(
    (event: line.WebhookEvent) => event.type,
  ) as line.WebhookEvent['type'][];

  console.log(`------------- ${eventTypes[0]} -------------`);
  await eventHandlers[eventTypes[0]](req, res);

  console.log('------------- FINISH -------------');
});

// スケジュール実行されるFunctions
export { pushMessage } from './push';
export { forecast } from './forecast';
