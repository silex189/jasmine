const express = require('express');
const logger = require('morgan');
const PinsRouter = require('./routes/pins');
const Pins = require('./models/Pins');
const http = require('http');
const request = require('request');
const { response } = require('./app');
const requestPromise = require('request-promise-native');
const axios = require('axios');
const { callbackify } = require('util');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use('/api', PinsRouter.router);
app.set('port', 3000);


describe('Testing Router', () => {
  let server;

  beforeAll(() => {
    server = http.createServer(app);
    server.listen(3000);
  });

  afterAll(() => {
    server.close();
  });

  describe('GET', () => {
    // GET 200
    it('200 and find pin', done => {
      const data = [{ id: 2 }];

      spyOn(Pins, 'find').and.callFake(callBack => {
        callBack(false, data);
      });

      request.get('http://localhost:3000/api', (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual([{ id: 2 }]);
        done();
      });

    });

    // GET 500
    it('500', done => {
      const data = [{ id: 2 }];

      spyOn(Pins, 'find').and.callFake(callBack => {
        callBack(true, data);
      })

      request.get('http://localhost:3000/api', (error, response, body) => {
        expect(response.statusCode).toBe(500);
        done();
      });
    });
  });

  describe('GET/id', () => {

    it('200', done => {
      spyOn(Pins, 'findById').and.callFake((id, callBack) => {
        callBack(false, id);
      });
  
      request.get('http://localhost:3000/api/1', (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toBe('1');
        expect(error).toBeNull();
        done();
      });
    });

    it('500', done => {
      const spy = spyOn(Pins, 'findById').and.callFake((id, callBack) => {
        callBack(true, id);
      });

      request.get('http://localhost:3000/api/1', (error, response, body) => {
        expect(response.statusCode).toEqual(500);
        expect(error).toBeDefined();
        done();
      })
    });

  });


  describe('POST', () => {

    it('200', done => {
      spyOn(Pins, 'create').and.callFake((pin, callBack) => {
        callBack(false, {});
      });

      spyOn(requestPromise, 'get').and.returnValue(
        Promise.resolve('<title>Platzi</title><meta name="description" content="Platzi rules">')
      );

      const assets = [{ url: 'http://platzi.com' }];

      axios.post(
        'http://localhost:3000/api',
        { title: 'title', author: 'author', description: 'description', assets }).then(
          res => {
            expect(res.status).toBe(200);
            done();
          }
        );
    });

    it('200 PDF', done => {
      spyOn(Pins, 'create').and.callFake( (pins, callBack) => {
        callBack(false, {});
      });

      const assets = [{ url: 'http://platzi.pdf' }];

      axios.post(
        'http://localhost:3000/api', 
        { title: 'title', author: 'author', description: 'description', assets }).then(
          res => {
            expect(res.status).toBe(200);
            done();
          });
    });

    it('500', done => {
      // TODO: revisar este código
      spyOn(Pins, 'create').and.callFake((pins, callBack) => {
        callBack(true, {});
      });

      const assets = [{ url: 'http://platzi.com' }];
      
      axios.post(
        'http://localhost:3000/api',
        { title: 'title', author: 'author', description: 'description', assets })
        .catch(error => {
            expect(error.response.status).toBe(403);
            done();
          }
        );

    })

  });

});

      // const post = [{
      //   title: 'Platzi',
      //   author: 'Platzi',
      //   description: 'Platzi rules',
      //   percentage: 0,
      //   tags: [],
      //   assets: [
      //     {
      //       title: 'Platzi',
      //       description: 'description',
      //       readed: false,
      //       url: 'http://platzi.com'
      //     }
      //   ]
      // }];