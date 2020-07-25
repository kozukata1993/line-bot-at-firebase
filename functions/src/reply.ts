import * as functions from 'firebase-functions';
import * as line from '@line/bot-sdk';
import { axios } from './axios';

export const reply = async (req: functions.https.Request, res: functions.Response) => {
  const events = req.body.events as line.MessageEvent[];

  const replyToken = events[0].replyToken;
  const userMessage =
    events[0].message.type === 'text' ? events[0].message.text : events[0].message.type;

  const postDatas = {
    messages: [
      {
        text: `${userMessage} from Firebase`,
        type: 'text',
      },
    ],
    replyToken,
  };

  await axios.post('/reply', postDatas).catch((error) => {
    res.status(200).end();
    console.log(error);
  });
  res.status(200).end();
};
