const request = require('supertest')
const express = require('express')
const app = express()
const router = require('../routes/Types')
const { Types } = require("../models")

app.use(express.json())
app.use('/types', router)

describe('Testing the /types routes', () => {

  // Test GET /Types
  describe('GET /types', () => {
    it('should return a list of types with status 200', async () => {
      const res = await request(app).get('/types')
      expect(res.status).toBe(200)
      expect(res.body).toBeInstanceOf(Array)
    });

    it('should return an empty array if there are no Types', async () => {
      jest.spyOn(Types, 'findAll').mockResolvedValueOnce([])
      const res = await request(app).get('/types')
      expect(res.status).toBe(200)
      expect(res.body).toEqual([])
    })
  })

  // Test POST /types
  describe('POST /types', () => {
    it('should create a new type with status 200', async () => {
      const type = {
        Name: 'Nouveau type'
      }
      const res = await request(app).post('/types').send(type)
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('Name', type.Name)
    });

    it('should return status 400 if required fields are missing', async () => {
      const type = {}
      const res = await request(app).post('/types').send(type);
      expect(res.status).toBe(400);
    });
  });
});