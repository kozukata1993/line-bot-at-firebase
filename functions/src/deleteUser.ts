import * as functions from 'firebase-functions';
import * as line from '@line/bot-sdk';
import * as admin from 'firebase-admin';

export const deleteUser = async (req: functions.https.Request, res: functions.Response) => {
  const events = req.body.events as line.UnfollowEvent[];
  const unfollowUsers = await admin
    .firestore()
    .collection('users')
    .where('uid', '==', events[0].source.userId)
    .get();

  unfollowUsers.forEach(async (doc) => {
    await doc.ref.delete().catch((error) => {
      console.log('------------- ERROR in deleteUser -------------');
      console.log(error);
      res.status(500).end();
    });
  });
  res.status(200).end();
};
