import * as requestPromise from 'request-promise-native';
import { authUrl } from '../constants';

class Auth {
  constructor() {

  }

  requestToken(obj: any) {
    if(!obj || !obj.data) {
      throw new Error('invalid params: data is missing');
    }

    let opts = {
      uri: authUrl,
      method: 'POST',
      body: Object.assign({grant_type: 'authorization_code'}, obj.data),
      json: true
    };

    return requestPromise(opts);
  }

  refreshToken(obj: any) {
    if(!obj || !obj.data || !obj.token) {
      throw new Error('invalid params: data or token is missing');
    }

    let opts = {
      uri: authUrl,
      headers: {
        Authorization: 'Bearer ' + obj.token
      },
      method: 'POST',
      body: Object.assign({grant_type: 'refresh_token'}, obj.data),
      json: true
    };

    return requestPromise(opts);
  }
}

export var auth = new Auth();