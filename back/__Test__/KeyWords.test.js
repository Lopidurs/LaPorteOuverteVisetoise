const request = require('supertest')
const express = require('express')
const app = express()
const router = require('../routes/KeyWords')
const { KeyWords } = require("../models")

app.use(express.json())
app.use('/keyWords', router)

describe('Testing the /keyWords routes', () => {

  // Test POST /keyWords
  describe('POST /keyWords', () => {
    it('should create a new keyWord with status 200', async () => {
      const keyWord = {
        Name: 'Nouveau keyWord'
      }
      const res = await request(app).post('/keyWords').send(keyWord)
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('Name', keyWord.Name)
    });

    it('should return status 400 if required fields are missing', async () => {
      const keyWord = {}
      const res = await request(app).post('/keyWords').send(keyWord);
      expect(res.status).toBe(400);
    });
  });

  // Test GET /KeyWords
  describe('GET /keyWords', () => {
    it('should return a list of keyWords with status 200', async () => {
      const res = await request(app).get('/keyWords')
      expect(res.status).toBe(200)
      expect(res.body).toBeInstanceOf(Array)
    });

    it('should return an empty array if there are no KeyWords', async () => {
      jest.spyOn(KeyWords, 'findAll').mockResolvedValueOnce([])
      const res = await request(app).get('/keyWords')
      expect(res.status).toBe(200)
      expect(res.body).toEqual([])
    })
  })
});