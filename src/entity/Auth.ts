import * as requestPromise from 'request-promise-native';
import { authUrl } from '../constants';

class Auth {
  constructor() {

  }

  requestToken(obj: any) {
    let opts = {
      uri: authUrl,
      method: 'POST',
      body: Object.assign({grant_type: 'authorization_code'}, obj.body),
      json: true
    };

    return requestPromise(opts);
  }

  refreshToken(obj: any) {
    let opts = {
      uri: authUrl,
      headers: {
        Authorization: 'Bearer ' + obj.token
      },
      method: 'POST',
      body: Object.assign({grant_type: 'refresh_token'}, obj.body),
      json: true
    };

    return requestPromise(opts);
  }
}

export var auth = new Auth();