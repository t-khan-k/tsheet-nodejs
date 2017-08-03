import * as requestPromise from 'request-promise-native';
import { userUrl } from '../constants';

class User {
  constructor() {

  }

  create(obj: any): Promise<any> {
    if(!obj || !obj.data || !obj.token) {
      throw new Error('invalid params: data or token is missing');
    }

    return new Promise((resolve, reject) => {
      this.createBatch(obj)
        .then(res => {
          let user = res.results.users;
          let keys = Object.keys(user);

          if(user && keys.length && user[keys[0]]._status_code === 200) {
            return resolve(user[keys[0]]);
          }

          return reject(user);
        }, err => {
          return reject(err);
        });
    });
  }

  private createBatch(obj: any): Promise<any> {
    if(!obj || !obj.data || !obj.token) {
      throw new Error('invalid params: data or token is missing');
    }

    let data = (Array.isArray(obj.data))? obj.data : [obj.data];

    let opts = {
      uri: userUrl,
      headers: {
        Authorization: 'Bearer ' + obj.token
      },
      method: 'POST',
      body: {data},
      json: true
    };

    return requestPromise(opts);
  }

  getByUsername(obj: any): Promise<any> {
    if(!obj.data.username || !obj.token) {
      throw new Error('invalid params: data or token is missing');
    }

    let opts = {
      uri: userUrl + '?usernames=' + obj.data.username,
      headers: {
        Authorization: 'Bearer ' + obj.token
      },
      method: 'GET',
      json: true
    };

    return new Promise((resolve, reject) => {
      requestPromise(opts)
        .then(res => {
          let user = res.results.users;
          let keys = Object.keys(user);

          if(user && keys.length) {
            return resolve(user[keys[0]]);
          }

          return reject(user);
        }, err => {
          return reject(err);
        });
    });
  }
}

export var user = new User();