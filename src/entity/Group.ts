import * as requestPromise from 'request-promise-native';
import { groupUrl } from '../constants';

class Group {
  constructor() {

  }

  create(obj: any) {
    if(!obj.data || !obj.token) {
      throw new Error('invalid params: data or token is missing');
    }

    return new Promise((resolve, reject) => {
      this.createBatch(obj)
        .then(res => {
          let group = res.results.groups;
          let keys = Object.keys(group);

          if(group && keys.length && group[keys[0]]._status_code === 200) {
            return resolve(group[keys[0]]);
          }

          return reject(res.results.groups);
        }, err => {
          return reject(err);
        });
    });
  }

  private createBatch(obj: any) {
    if(!obj.data || !obj.token) {
      throw new Error('invalid params: data or token is missing');
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

  getByName(obj: any): Promise<any> {
    if(!obj.data.names || !obj.token) {
      throw new Error('invalid params: data or token is missing');
    }

    let opts = {
      uri: groupUrl + '?names=' + obj.data.names,
      headers: {
        Authorization: 'Bearer ' + obj.token
      },
      method: 'GET',
      json: true
    };

    return new Promise((resolve, reject) => {
      requestPromise(opts)
        .then(res => {
          let group = res.results.groups;
          let keys = Object.keys(group);

          if(group && keys.length) {
            return resolve(group[keys[0]]);
          }

          return reject(group);
        }, err => {
          return reject(err);
        });
    });
  }
}

export var group = new Group();