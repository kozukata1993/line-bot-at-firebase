import * as functions from 'firebase-functions';
import { reply } from './reply';
import { createUser } from './createUser';
import { deleteUser } from './deleteUser';

export const eventHandlers: EventHandlers = {
  message: reply,
  follow: createUser,
  unfollow: deleteUser,
  join: async (req, res) => console.log('join'),
  leave: async (req, res) => console.log('leave'),
  memberJoined: async (req, res) => console.log('memberJoined'),
  memberLeft: async (req, res) => console.log('memberLeft'),
  postback: async (req, res) => console.log('postback'),
  beacon: async (req, res) => console.log('beacon'),
  accountLink: async (req, res) => console.log('accountLink'),
  things: async (req, res) => console.log('things'),
};

export type EventHandler = (req: functions.https.Request, res: functions.Response) => Promise<void>;

interface EventHandlers {
  message: EventHandler;
  follow: EventHandler;
  unfollow: EventHandler;
  join: EventHandler;
  leave: EventHandler;
  memberJoined: EventHandler;
  memberLeft: EventHandler;
  postback: EventHandler;
  beacon: EventHandler;
  accountLink: EventHandler;
  things: EventHandler;
}
