const request = require('supertest')
const express = require('express')
const app = express()
const router = require('../routes/Users')
const { Users } = require("../models")

app.use(express.json())
app.use('/users', router)

describe('Testing the /users routes', () => {

  // Test GET /Users
  describe('GET /users', () => {
    it('should return a list of users with status 200', async () => {
      const res = await request(app).get('/users')
      expect(res.status).toBe(200)
      expect(res.body).toBeInstanceOf(Array)
    });

    it('should return an empty array if there are no Users', async () => {
      jest.spyOn(Users, 'findAll').mockResolvedValueOnce([])
      const res = await request(app).get('/users')
      expect(res.status).toBe(200)
      expect(res.body).toEqual([])
    })
  })
});