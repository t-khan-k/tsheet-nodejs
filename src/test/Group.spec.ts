
import * as chai from 'chai';
import * as chaipromise from 'chai-as-promised';
import * as nock from 'nock';
import { group } from '../entity/Group';
import { url } from '../constants';

chai.use(chaipromise);
const expect = chai.expect;

describe('Group', function () {
  it('Group create success', function(done) {
    let newGroupSuccessHttpResponse = {
      "results": {
        "groups": {
          "1": {
            "_status_code": 200,
            "_status_message": "Created",
            "id": 9921,
            "active": true,
            "name": "MyTestGroup",
            "last_modified": "2017-07-31T07:10:25+00:00",
            "created": "2017-07-31T07:10:25+00:00",
            "manager_ids": []
          }
        }
      }
    };

    // Included limited properties here
    let newGroupSuccessResponse = {
      "_status_code": 200,
      "_status_message": "Created",
      "active": true,
      "name": "MyTestGroup"
    };

    nock(url)
      .post('/groups')
      .reply(200, newGroupSuccessHttpResponse);

    let obj  = {
      token: 'sample_token',
      data: {
        name: 'MyTestGroup',
      }
    };

    expect(group.create(obj)).to.be.eventually.to.include(newGroupSuccessResponse).notify(done);
  });

  it('Group create error', function(done) {
    let newGroupErrorHttpResponse = {
      "results": {
        "groups": {
          "1": {
            "_status_code": 417,
            "_status_message": "Expectation Failed",
            "_status_extra": "Missing required parameters: name"
          }
        }
      }
    };

    // Included limited properties here
    let newGroupErrorResponse = {
      "1":
        {
          "_status_code":417,
          "_status_message":"Expectation Failed",
          "_status_extra":"Missing required parameters: name"
        }
    };

    nock(url)
      .post('/groups')
      .reply(200, newGroupErrorHttpResponse);

    let obj  = {
      token: 'sample_token',
      data: {
        nameer: 'MyTestGroup',
      }
    };

    expect(group.create(obj)).to.be.eventually.to.rejectedWith(newGroupErrorResponse).notify(done);
  });

  it('Group create should throw invalid params', function() {
    let obj  = {
      data: {
        name: 'MyTestGroup',
      }
    };

    expect(() => group.create(obj)).to.throw(Error, 'invalid params: data or token is missing');
  });

  it('Group get success', function(done) {
    let groupGetSuccessHttpResponse = {
      "results": {
        "groups": {
          "9921": {
            "id": 9921,
            "active": true,
            "name": "MyTestGroup",
            "last_modified": "2017-07-31T07:10:25+00:00",
            "created": "2017-07-31T07:10:25+00:00",
            "manager_ids": []
          }
        }
      },
      "more": false
    };

    // Included limited properties here
    let groupGetSuccessResponse = {
      active:true,
      name:"MyTestGroup"
    };

    nock(url)
      .get('/groups')
      .query({names: 'MyTestGroup'})
      .reply(200, groupGetSuccessHttpResponse);

    let obj  = {
      token: 'sample_token',
      data: {
        names: 'MyTestGroup',
      }
    };

    expect(group.getByName(obj)).to.be.eventually.to.include(groupGetSuccessResponse).notify(done);
  });

  it('Group get should throw invalid params', function() {
    let obj  = {
      data: {
        name: 'MyTestGroup',
      }
    };

    expect(() => group.getByName(obj)).to.throw(Error, 'invalid params: data or token is missing');
  });
});