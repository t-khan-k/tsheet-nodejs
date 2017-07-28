import * as requestPromise from 'request-promise-native';
import { userUrl } from '../constants';

class User {
  constructor() {

  }

  create(obj: any): Promise<any> {
    if(!obj.data || !obj.token) {
      throw "data or token is missing";
    }

    return new Promise((resolve, reject) => {
      this.createBatch(obj)
        .then(res => {
          let user = res.results.users;

          if(user && user['1']._status_code === 200) {
            return resolve(user['1']);
          }

          return reject(res.results.users);
        }, err => {
          return reject(err);
        });
    });
  }

  private createBatch(obj: any): Promise<any> {
    if(!obj.data || !obj.token) {
      throw "data or token is missing";
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
      throw "username or token is missing";
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

          if(user && user['1']._status_code === 200) {
            return resolve(user['1']);
          }

          return reject(res.results.users);
        }, err => {
          return reject(err);
        });
    });
  }
}

export var user = new User();