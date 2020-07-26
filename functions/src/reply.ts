import * as line from '@line/bot-sdk';
import { axios } from './utils/axios';
import { EventHandler } from './eventHandlers';

export const reply: EventHandler = async (req, res) => {
  const events = req.body.events as line.MessageEvent[];

  const replyToken = events[0].replyToken;
  const userMessage =
    events[0].message.type === 'text' ? events[0].message.text : events[0].message.type;

  const postData = {
    messages: [
      {
        text: `${userMessage}`,
        type: 'text',
      },
    ],
    replyToken,
  };

  await axios.post('/reply', postData).catch((error) => {
    console.log('------------- ERROR in reply -------------');
    res.status(500).end();
    console.log(error);
  });
  res.status(200).end();
};
