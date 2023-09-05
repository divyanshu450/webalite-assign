// Example test suite using Mocha and Chai
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // Importing Express app
const fs = require('fs');
//const { expect } = chai;

chai.use(chaiHttp);
const expect = chai.expect;

describe('Items API', () => {

    before(() => {
        // Create or initialize the items.json file with an empty array
        fs.writeFileSync('items.json', '[]');
      });
    
      after(() => {
        // Clean up and delete the items.json file after tests
        fs.unlinkSync('items.json');
      });
  // Add more test cases for other routes and functionalities

  it('should create a new item', (done) => {
    chai
      .request(app)
      .post('/api/items')
      .send({
        name: 'Johnny',
        age: 22,
        language: ['JavaScript', 'PHP', 'Python', 'Java'],
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        // Add more assertions as needed
        done();
      });
  });

  it('should fetch all items', (done) => {
    chai
      .request(app)
      .get('/api/items/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should update an item by ID', (done) => {
    // First, create an item to update
    chai
      .request(app)
      .post('/api/items')
      .send({
        name: 'Jane Smith',
        age: 25,
        language: ['Python'],
      })
      .end((err, res) => {
        const itemId = res.body.name;

        chai
          .request(app)
          .put(`/api/items/Jane Smith`)
          .send({
            age: 26, // Update age
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            // Add more assertions as needed
            done();
          });
      });
  });

  it('should delete an item by ID', (done) => {
    // First, create an item to delete
    chai
      .request(app)
      .post('/api/items')
      .send({
        name: 'Alice Johnson',
        age: 28,
        language: ['Java'],
      })
      .end((err, res) => {
        const itemId = res.body.name;

        chai
          .request(app)
          .delete(`/api/items/Alice Johnson`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            // Add more assertions as needed
            done();
          });
      });
    });

});
