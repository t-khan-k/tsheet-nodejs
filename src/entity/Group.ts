import * as requestPromise from 'request-promise-native';
import { groupUrl } from '../constants';

class Group {
  constructor() {

  }

  create(obj: any) {
    if(!obj.data || !obj.token) {
      throw "data or token is missing";
    }

    return new Promise((resolve, reject) => {
      this.createBatch(obj)
        .then(res => {
          let group = res.results.groups;

          if(group && group['1']._status_code === 200) {
            return resolve(group['1']);
          }

          return reject(res.results.groups);
        }, err => {
          return reject(err);
        });
    });
  }

  private createBatch(obj: any) {
    if(!obj.data || !obj.token) {
      throw "data or token is missing";
    }

    let data = (Array.isArray(obj.data))? obj.data : [obj.data];

    let opts = {
      uri: groupUrl,
      headers: {
        Authorization: 'Bearer ' + obj.token
      },
      method: 'POST',
      body: {data},
      json: true
    };

    return requestPromise(opts);
  }
}

export var group = new Group();