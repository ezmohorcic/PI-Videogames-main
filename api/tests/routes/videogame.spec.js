/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const supertest = require('supertest');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
};

/*
describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /videogames', () => {
    it('should get 200', () =>
      agent.get('/videogames').expect(200)
    );
  });
});
*/
describe("GET /genres",function()
{
  it("deberia devolver 200",function(done)
  {
    supertest(app)
    .get("/genres")
    .expect(200)
    .end(function(err,res)
    {
      if(err) done(err);
      done();
    });
  });
});

describe("GET /videogames/:id",function()
{
  it("deberia devolver 200",function(done)
  {
    supertest(app)
    .get("/videogames/3498")
    .expect(200)
    .end(function(err,res)
    {
      if(err) done(err);
      done();
    });
  });
});