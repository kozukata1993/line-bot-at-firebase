import * as functions from 'firebase-functions';
import * as line from '@line/bot-sdk';
import * as axiosBase from 'axios';

// const channelSecret = functions.config().service.secret;
const channelAccessToken = functions.config().service.accesstoken;

export const replyFunctions = functions
  .region('asia-northeast1')
  .https.onRequest(async (req, res) => {
    console.log('------------- START -------------');
    const events = req.body.events as line.MessageEvent[];

    const replyToken = events[0].replyToken;
    const userMessage =
      events[0].message.type === 'text' ? events[0].message.text : events[0].message.type;
    const url = 'https://api.line.me/v2/bot/message/reply';

    const headers = {
      Authorization: `Bearer ${channelAccessToken}`,
      'Content-Type': 'application/json; charset=UTF-8',
    };

    const postDatas = {
      messages: [
        {
          text: `${userMessage}`,
          type: 'text',
        },
      ],
      replyToken,
    };

    const axios = axiosBase.default.create({
      baseURL: url,
      headers,
    });

    await axios.post('/', postDatas).catch((error) => {
      res.status(200).end();
      console.log(error);
    });
    res.status(200).end();
  });
