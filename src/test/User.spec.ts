
import * as chai from 'chai';
import * as chaipromise from 'chai-as-promised';
import * as nock from 'nock';
import { user } from '../entity/User';
import { url } from '../constants';

chai.use(chaipromise);
const expect = chai.expect;

describe('User', function () {
  it('User create success', function(done) {
    let newUserSuccessHttpResponse = {
      "results": {
        "users": {
          "1": {
            "_status_code": 200,
            "_status_message": "Created",
            "id": 203067,
            "first_name": "Test",
            "last_name": "User",
            "group_id": 0,
            "active": true,
            "employee_number": 0,
            "salaried": false,
            "exempt": false,
            "username": "testtest123",
            "email": "",
            "email_verified": false,
            "payroll_id": "",
            "hire_date": "0000-00-00",
            "term_date": "0000-00-00",
            "last_active": "",
            "client_url": "talhakhan10p",
            "company_name": "10p",
            "mobile_number": "",
            "pto_balances": {
              "2321934": 0,
              "2321936": 0,
              "2321938": 0
            },
            "submitted_to": "2000-01-01",
            "approved_to": "2000-01-01",
            "manager_of_group_ids": [],
            "require_password_change": false,
            "pay_rate": 0,
            "pay_interval": "hour"
          }
        }
      },
      "supplemental_data": {
        "jobcodes": {
          "2321934": {
            "id": 2321934,
            "parent_id": 0,
            "assigned_to_all": true,
            "billable": false,
            "active": true,
            "type": "pto",
            "has_children": false,
            "billable_rate": 0,
            "short_code": "",
            "name": "Sick",
            "filtered_customfielditems": "",
            "required_customfields": []
          },
          "2321936": {
            "id": 2321936,
            "parent_id": 0,
            "assigned_to_all": true,
            "billable": false,
            "active": true,
            "type": "pto",
            "has_children": false,
            "billable_rate": 0,
            "short_code": "",
            "name": "Vacation",
            "filtered_customfielditems": "",
            "required_customfields": []
          },
          "2321938": {
            "id": 2321938,
            "parent_id": 0,
            "assigned_to_all": true,
            "billable": false,
            "active": true,
            "type": "pto",
            "has_children": false,
            "billable_rate": 0,
            "short_code": "",
            "name": "Holiday",
            "filtered_customfielditems": "",
            "required_customfields": []
          }
        }
      }
    };

    // Included limited properties here
    let newUserSuccessResponse = {
      _status_code: 200,
      _status_message: 'Created',
      first_name: 'Test',
      last_name: 'User',
      group_id: 0,
      active: true,
      employee_number: 0,
      salaried: false,
      exempt: false,
      username: 'testtest123',
      email: '',
      client_url: 'talhakhan10p'
    };

    nock(url)
      .post('/users')
      .reply(200, newUserSuccessHttpResponse);

    let obj  = {
      token: 'sample_token',
      data: {
        username: 'Testuser12345',
        password: 'Testuser12345',
        first_name: 'Test',
        last_name: 'User'
      }
    };

    expect(user.create(obj)).to.be.eventually.to.include(newUserSuccessResponse).notify(done);
  });

  it('User create error', function(done) {
    let newUserErrorHttpResponse = {
      "results": {
        "users": {
          "1": {
            "_status_code": 417,
            "_status_message": "Expectation Failed",
            "_status_extra": "username field missing",
            "ussername": "Testtest123",
            "password": "Testtest123",
            "first_name": "Test",
            "last_name": "Username"
          }
        }
      }
    };

    // Included limited properties here
    let newUserErrorResponse ={
      '1': {
        _status_code: 417,
        _status_message: 'Expectation Failed',
        _status_extra: 'username field missing',
        usernamdde: 'Testtest1234',
        password: 'Testtest1234',
        first_name: 'Test',
        last_name: 'User'
      }
    };

    nock(url)
      .post('/users')
      .reply(200, newUserErrorHttpResponse);

    let obj  = {
      token: 'sample_token',
      data: {
        username: 'Testuser12345',
        password: 'Testuser12345',
        first_name: 'Test',
        last_name: 'User'
      }
    };

    expect(user.create(obj)).to.be.eventually.to.rejectedWith(newUserErrorResponse).notify(done);
  });

  it('User create should throw invalid params', function() {
    let obj  = {
      data: {
        username: 'Testuser12345',
        password: 'Testuser12345',
        first_name: 'Test',
        last_name: 'User'
      }
    };

    expect(() => user.create(obj)).to.throw(Error, 'invalid params: data or token is missing');
  });

  it('User get by username', function(done) {
    let getUserSuccessHttpResponse = {
      "results": {
        "users": {
          "202985": {
            "id": 202985,
            "first_name": "First",
            "last_name": "Code",
            "group_id": 0,
            "active": true,
            "employee_number": 0,
            "salaried": false,
            "exempt": false,
            "username": "firstcodeuser744",
            "email": "",
            "email_verified": false,
            "payroll_id": "",
            "hire_date": "0000-00-00",
            "term_date": "0000-00-00",
            "last_modified": "2017-07-28T06:53:40+00:00",
            "last_active": "",
            "created": "2017-07-28T06:53:40+00:00",
            "profile_image_url": "",
            "client_url": "talhakhan10p",
            "company_name": "10p",
            "mobile_number": "",
            "pto_balances": {
              "2321934": 0,
              "2321936": 0,
              "2321938": 0
            },
            "submitted_to": "2000-01-01",
            "approved_to": "2000-01-01",
            "manager_of_group_ids": [],
            "require_password_change": false,
            "pay_rate": 0,
            "pay_interval": "hour",
            "permissions": {
              "admin": false,
              "mobile": true,
              "status_box": false,
              "reports": false,
              "manage_timesheets": false,
              "manage_authorization": false,
              "manage_users": false,
              "manage_my_timesheets": false,
              "manage_jobcodes": false,
              "pin_login": false,
              "approve_timesheets": false,
              "manage_schedules": false,
              "external_access": false,
              "manage_my_schedule": false,
              "manage_company_schedules": false,
              "view_company_schedules": false,
              "view_group_schedules": false,
              "manage_no_schedules": false,
              "view_my_schedules": false
            },
            "customfields": ""
          }
        }
      },
      "more": false,
      "supplemental_data": {
        "jobcodes": {
          "2321934": {
            "id": 2321934,
            "parent_id": 0,
            "assigned_to_all": true,
            "billable": false,
            "active": true,
            "type": "pto",
            "has_children": false,
            "billable_rate": 0,
            "short_code": "",
            "name": "Sick",
            "last_modified": "2017-07-26T05:13:25+00:00",
            "created": "2017-07-26T05:13:25+00:00",
            "filtered_customfielditems": "",
            "required_customfields": []
          },
          "2321936": {
            "id": 2321936,
            "parent_id": 0,
            "assigned_to_all": true,
            "billable": false,
            "active": true,
            "type": "pto",
            "has_children": false,
            "billable_rate": 0,
            "short_code": "",
            "name": "Vacation",
            "last_modified": "2017-07-26T05:13:25+00:00",
            "created": "2017-07-26T05:13:25+00:00",
            "filtered_customfielditems": "",
            "required_customfields": []
          },
          "2321938": {
            "id": 2321938,
            "parent_id": 0,
            "assigned_to_all": true,
            "billable": false,
            "active": true,
            "type": "pto",
            "has_children": false,
            "billable_rate": 0,
            "short_code": "",
            "name": "Holiday",
            "last_modified": "2017-07-26T05:13:25+00:00",
            "created": "2017-07-26T05:13:25+00:00",
            "filtered_customfielditems": "",
            "required_customfields": []
          }
        }
      }
    };

    // Included limited properties here
    let getUserSuccessResponse = {
      first_name: 'First',
      last_name: 'Code',
      group_id: 0,
      active: true,
      employee_number: 0,
      salaried: false,
      exempt: false,
      username: 'firstcodeuser744',
      email: '',
      email_verified: false,
      payroll_id: '',
      last_active: '',
      profile_image_url: '',
      client_url: 'talhakhan10p',
      company_name: '10p',
      require_password_change: false,
      pay_rate: 0,
      pay_interval: 'hour'
    };

    nock(url)
      .get('/users')
      .query({usernames: 'Testuser12345'})
      .reply(200, getUserSuccessHttpResponse);

    let obj  = {
      token: 'sample_token',
      data: {
        username: 'Testuser12345'
      }
    };

    expect(user.getByUsername(obj)).to.be.eventually.to.include(getUserSuccessResponse).notify(done);
  });

  it('User get should throw invalid params', function() {
    let obj  = {
      data: {
        username: 'Testuser12345',
      }
    };

    expect(() => user.getByUsername(obj)).to.throw(Error, 'invalid params: data or token is missing');
  });
});