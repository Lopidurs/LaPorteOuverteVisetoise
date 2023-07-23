const request = require('supertest')
const express = require('express')
const app = express()
const router = require('../routes/Users')
const { Users } = require("../models")

app.use(express.json())
app.use('/users', router)

describe('Testing the /users routes', () => {
  // Test POST /Users
  describe('POST /users', () => {
    it('should return a new user with status 200', async () => {
      const user = {
        FirstName: 'Jean',
        LastName: 'Michel',
        Email: 'jean.michel@hotmail.fr',
        PhoneNumber: '+32 412 34 56 78',
        Address: '48 rue des lilas',
        City: 'Libramont',
        ZipCode: '3541',
      }
      const res = await request(app).post('/users').send(user)
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('FirstName', user.FirstName)
      expect(res.body).toHaveProperty('LastName', user.LastName)
      expect(res.body).toHaveProperty('City', user.City)
    })

    it('should return status 400 if required fields are missing', async () => {
      const user = {}
      const res = await request(app).post('/users').send(user)
      expect(res.status).toBe(400)
    })
  })
  // Test GET /Users
  describe('GET /users', () => {
    it('should return a list of users with status 200', async () => {
      const res = await request(app).get('/users')
      expect(res.status).toBe(200)
      expect(res.body).toBeInstanceOf(Array)
    })

    it('should return an empty array if there are no Users', async () => {
      jest.spyOn(Users, 'findAll').mockResolvedValueOnce([])
      const res = await request(app).get('/users')
      expect(res.status).toBe(200)
      expect(res.body).toEqual([])
    })
  })
})