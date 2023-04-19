const request = require('supertest')
const express = require('express')
const app = express()
const router = require('../routes/Awards')
const { Awards } = require("../models")

app.use(express.json())
app.use('/awards', router)

describe('Testing the /awards routes', () => {

  // Test GET /awards
  describe('GET /awards', () => {
    it('should return a list of awards with status 200', async () => {
      const res = await request(app).get('/awards')
      expect(res.status).toBe(200)
      expect(res.body).toBeInstanceOf(Array)
    });

    it('should return an empty array if there are no awards', async () => {
      jest.spyOn(Awards, 'findAll').mockResolvedValueOnce([])
      const res = await request(app).get('/awards')
      expect(res.status).toBe(200)
      expect(res.body).toEqual([])
    })
  })

  // Test POST /awards
  describe('POST /awards', () => {
    it('should create a new award with status 200', async () => {
      const award = {
        Name: 'Meilleur jeu'
      }
      const res = await request(app).post('/awards').send(award)
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('Name', award.Name)
    });

    it('should return status 400 if required fields are missing', async () => {
      const award = {}
      const res = await request(app).post('/awards').send(award);
      expect(res.status).toBe(400);
    });
  });
});