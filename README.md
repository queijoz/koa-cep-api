# Koa CEP API

API simples para consultar CEP usando o serviço ViaCEP, construída com Koa e cache em memória.

## Requisitos
- Node.js 18+

## Instalação
```bash
npm install
```

## Execução
### Desenvolvimento (com reload e logs de debug)
```bash
npm run dev
```

### Produção
```bash
npm start
```

### Testes
```bash
npm run test
```

### Teste de carga
```bash
npm run perf
```

## Endpoint
### GET /addresses/:postcode
Exemplo:
```bash
curl http://localhost:3000/addresses/01001000
```

### Exemplo de resposta (200 OK)
```json
{
  "postcode": "01001000",
  "line1": "Praça da Sé",
  "line2": "lado ímpar",
  "neighborhood": "Sé",
  "city": "São Paulo",
  "state": "SP",
  "meta": {
    "phoneCode": "11",
    "ibgeCode": "3550308",
    "region": "Sudeste"
  }
}
```

## Tratamento de erros
- **400 Bad Request** → CEP inválido (não possui 8 dígitos)
- **404 Not Found** → CEP válido, mas inexistente
- **502 Bad Gateway** → erro ao consultar o serviço ViaCEP

## Cache
A aplicação utiliza cache em memória com TTL. Isso reduz chamadas repetidas ao serviço ViaCEP:
- 10 minutos para CEPs válidos e inválidos

## Estrutura do projeto
```
src/
 ├─ routes/addresses.js
 ├─ services/
 │   ├─ api.js
 │   ├─ cache.js
 │   ├─ normalizer.js
 │   └─ viacep.js
 ├─ utils/
 │   ├─ context-setter.js
 │   ├─ lib.js
 │   ├─ regions.js
 │   └─ validator.js
 ├─ app.js
 └─ server.js
test/
 ├─ addresses.test.js
 └─ cache.test.js
```
