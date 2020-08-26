const request = require('supertest')
const app = require('../../index')
const About = require('../models').About

describe('About API', () => {
	beforeAll(async () => {
		About.bulkCreate([
			{
				titleTH: 'req.body.12',
				titleEN: 'req.body.21',
				detailTH: 'req.body.23',
				detailEN: 'req.body.32',
				image: '1',
				statusFlag: 'A',
				createdBy: '1',
				updatedBy: '1',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				id: 199,
				titleTH: 'req.body.12',
				titleEN: 'req.body.21',
				detailTH: 'req.body.23',
				detailEN: 'req.body.32',
				image: '1',
				statusFlag: 'A',
				createdBy: '1',
				updatedBy: '1',
				createdAt: new Date(),
				updatedAt: new Date()
			}
		])
	})

	afterAll(async (done) => {
		await database.truncate()
	})
	describe('GET: /api/about/ ', () => {
		it('should return 201 show all about', async (done) => {
			const res = await request(app).get('/api/about/')
			expect(res.statusCode).toEqual(201)
			done()
		})
	})
	describe('GET: /api/about/:id ', () => {
		it('should return 201 show all about', async (done) => {
			const res = await request(app).get('/api/about/1')
			expect(res.statusCode).toEqual(201)
			done()
		})
		it('should return 404 data not frond', async (done) => {
			const res = await request(app).get('/api/about/10')
			expect(res.statusCode).toEqual(404)
			done()
		})
	})
	describe('POST: /api/about/ ', () => {
		it('should return 201 insert success', async (done) => {
			const res = await request(app).post('/api/about/').send({
				titleTH: 'req.body.12',
				titleEN: 'req.body.21',
				detailTH: 'req.body.23',
				detailEN: 'req.body.32',
				image: '1',
				statusFlag: 'A',
				username: 'chunwarayut'
			})
			expect(res.statusCode).toEqual(201)
			done()
		})
		it('should return 400 insert error', async (done) => {
			const res = await request(app).post('/api/about/')
			expect(res.statusCode).toEqual(400)
			done()
		})
	})
	describe('PUT /api/about/:id ', () => {
		it('should return 201 update success', async (done) => {
			const res = await request(app).put('/api/about/1').send({
				titleTH: 'a',
				titleEN: 's',
				detailTH: 'a',
				detailEN: 'd',
				image: 1,
				statusFlag: 'A',
				username: 'chunwarayut'
			})
			expect(res.statusCode).toEqual(201)
			done()
		})
		it('should return 404 update error', async (done) => {
			const res = await request(app).put('/api/about/1').send({
				titleTH: 'req.body.12',
				titleEN: 'req.body.21',
				detailTH: 'req.body.23',
				detailEN: 'req.body.32',
				image: '1',
				statusFlag: 'AA',
				username: 'chunwarayut'
			})
			expect(res.statusCode).toEqual(400)
			done()
		})
	})
})
