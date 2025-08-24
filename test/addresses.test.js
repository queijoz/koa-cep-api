import nock from 'nock'
import request from 'supertest'
import { app } from '../src/app.js'

afterEach(() => {
    nock.cleanAll()
    nock.abortPendingRequests()
})

test('200 – retorna payload normalizado', async () => {
    nock('https://viacep.com.br')
        .get('/ws/01001000/json/')
        .reply(200, {
            cep: '01001-000',
            logradouro: 'Praça da Sé',
            complemento: 'lado ímpar',
            bairro: 'Sé',
            localidade: 'São Paulo',
            uf: 'SP',
            ibge: '3550308',
            ddd: '11'
        })

    const res = await request(app.callback()).get('/addresses/01001000')
    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({
        postcode: '01001000',
        meta: { region: 'Sudeste', ibgeCode: '3550308', phoneCode: '11' }
    })
})
