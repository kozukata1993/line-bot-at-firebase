import * as functions from 'firebase-functions';
import * as axiosBase from 'axios';

const channelAccessToken = functions.config().service.accesstoken;
const headers = {
  Authorization: `Bearer ${channelAccessToken}`,
  'Content-Type': 'application/json; charset=UTF-8',
};

export const axios = axiosBase.default.create({
  baseURL: 'https://api.line.me/v2/bot/message',
  headers,
});
