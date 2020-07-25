import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as line from '@line/bot-sdk';
import { reply } from './reply';
import { createUser } from './createUser';

admin.initializeApp();

// const channelSecret = functions.config().service.secret;
const eventHandlers = {
  message: reply,
  follow: createUser,
  unfollow: async (req: functions.https.Request, res: functions.Response) =>
    console.log('unfollow'),
  join: async (req: functions.https.Request, res: functions.Response) => console.log('join'),
  leave: async (req: functions.https.Request, res: functions.Response) => console.log('leave'),
  memberJoined: async (req: functions.https.Request, res: functions.Response) =>
    console.log('memberJoined'),
  memberLeft: async (req: functions.https.Request, res: functions.Response) =>
    console.log('memberLeft'),
  postback: async (req: functions.https.Request, res: functions.Response) =>
    console.log('postback'),
  beacon: async (req: functions.https.Request, res: functions.Response) => console.log('beacon'),
  accountLink: async (req: functions.https.Request, res: functions.Response) =>
    console.log('accountLink'),
  things: async (req: functions.https.Request, res: functions.Response) => console.log('things'),
};

export const webhook = functions.region('asia-northeast1').https.onRequest(async (req, res) => {
  console.log('------------- START -------------');

  const eventTypes = req.body.events.map(
    (event: line.WebhookEvent) => event.type,
  ) as line.WebhookEvent['type'][];

  console.log(`------------- ${eventTypes[0]} -------------`);
  await eventHandlers[eventTypes[0]](req, res);

  console.log('------------- FINISH -------------');
});
