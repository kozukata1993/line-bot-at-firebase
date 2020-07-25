import * as functions from 'firebase-functions';
import { reply } from './reply';
import { createUser } from './createUser';
import { deleteUser } from './deleteUser';

export const eventHandlers = {
  message: reply,
  follow: createUser,
  unfollow: deleteUser,
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
