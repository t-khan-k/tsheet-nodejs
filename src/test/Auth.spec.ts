
import * as chai from 'chai';
import * as chaipromise from 'chai-as-promised';
import * as nock from 'nock';
import { auth } from '../entity/Auth';
import { url } from '../constants';

chai.use(chaipromise);
const expect = chai.expect;

describe('Auth', function () {
  it('Auth request token success', function(done) {
    let requestTokenSuccessHttpResponse = {
      access_token: 'S.5__09a042d19fadf4sf51bb6ee731ce8675f4e60d450',
      expires_in: 5184000,
      token_type: 'bearer',
      scope: '',
      refresh_token: 'S.5__053b55bdaccc5ec692561f152f69418dcdfc417bc',
      user_id: '1895483',
      company_id: '6874310',
      client_url: 'talhakhan10p'
    };

    let requestTokenSuccessResponse = {
      access_token: 'S.5__09a042d19fadf4sf51bb6ee731ce8675f4e60d450',
      expires_in: 5184000,
      token_type: 'bearer',
      scope: '',
      refresh_token: 'S.5__053b55bdaccc5ec692561f152f69418dcdfc417bc',
      user_id: '1895483',
      company_id: '6874310',
      client_url: 'talhakhan10p'
    };

    nock(url)
      .post('/grant')
      .reply(200, requestTokenSuccessHttpResponse);

    let obj  = {
      data: {
        client_id: '0d268798b65849209507a57d59fcd980',
        client_secret: '687209507a209507a209507a4310',
        code: 'sf82mjod02kmfl',
        redirect_uri: 'https://test.com/auth/callback'
      }
    };

    expect(auth.requestToken(obj)).to.be.eventually.to.include(requestTokenSuccessResponse).notify(done);
  });

  it('Auth request token error', function(done) {
    let requestTokenErrorHttpResponse = {
      "error":"invalid_client",
      "error_description":"Client credentials were not found in the headers or body"
    };

    let requestTokenErrorResponse = {
      "error":"invalid_client",
      "error_description":"Client credentials were not found in the headers or body"
    };

    nock(url)
      .post('/grant')
      .reply(400, requestTokenErrorHttpResponse);

    let obj  = {
      data: {
        client_secret: '687209507a209507a209507a4310',
        code: 'sf82mjod02kmfl',
        redirect_uri: 'https://test.com/auth/callback'
      }
    };

    expect(auth.requestToken(obj)).to.be.eventually.to.rejectedWith(requestTokenErrorResponse).notify(done);
  });

  it('Auth refresh token success', function(done) {
    let requestTokenSuccessHttpResponse = {
      access_token: 'S.5__e80e7790f0175f9cb59d66362651b5a57725',
      expires_in: 5184000,
      token_type: 'bearer',
      scope: '',
      refresh_token: 'S.5__b541b3107165a76a29bf57c8ac3e957bd680',
      user_id: '189231548',
      company_id: '68742330',
      client_url: 'talhakhan10p'
    };


    let requestTokenSuccessResponse = {
      access_token: 'S.5__e80e7790f0175f9cb59d66362651b5a57725',
      expires_in: 5184000,
      token_type: 'bearer',
      scope: '',
      refresh_token: 'S.5__b541b3107165a76a29bf57c8ac3e957bd680',
      user_id: '189231548',
      company_id: '68742330',
      client_url: 'talhakhan10p'
    };


    nock(url)
      .post('/grant')
      .reply(200, requestTokenSuccessHttpResponse);

    let obj  = {
      data: {
        client_id: '0d268798b65849209507a57d59fcd980',
        client_secret: '687209507a209507a209507a4310',
        redirect_uri: 'https://test.com/auth/callback',
        refresh_token: 'S.5__b2421b31072a79b42fc8ac3e957bd680'
      }
    };

    expect(auth.requestToken(obj)).to.be.eventually.to.include(requestTokenSuccessResponse).notify(done);
  });

  it('Auth refresh token missing error', function(done) {
    let requestTokenErrorHttpResponse = {
      "error":"invalid_request",
      "error_description":"Missing parameter: \"refresh_token\" is required"
    };

    let requestTokenErrorResponse = {
      "error":"invalid_request",
      "error_description":"Missing parameter: \"refresh_token\" is required"
    };

    nock(url)
      .post('/grant')
      .reply(400, requestTokenErrorHttpResponse);

    let obj  = {
      data: {
        client_id: '0d268798b65849209507a57d59fcd980',
        client_secret: '687209507a209507a209507a4310',
        redirect_uri: 'https://test.com/auth/callback',
      }
    };

    expect(auth.requestToken(obj)).to.be.eventually.to.rejectedWith(requestTokenErrorResponse).notify(done);
  });
});