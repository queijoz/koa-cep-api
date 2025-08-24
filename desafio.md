Desafio Técnico – API de CEP com Koa

Crie uma API em Node.js usando Koa e koa-router que permita consultar informações de um CEP.

Requisitos obrigatórios:
- Endpoint GET /addresses/:postcode
- Consultar o CEP usando o serviço ViaCEP (https://viacep.com.br/)
- Retornar os dados normalizados no seguinte formato:

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


Tratamento de erros:
- CEP com formato inválido → 400 Bad Request
- CEP válido mas inexistente → 404 Not Found
- Erro ao consultar ViaCEP → 502 Bad Gateway

Requisitos técnicos:
- Implementar usando ES6 (babel-node)
- Usar Node.js + Koa + koa-router
- Organizar o código em pastas (routes/, services/, etc.)
- Documentar como rodar o projeto (README simples com npm install e npm start)
- Implementar cache em memória para não repetir chamadas ao ViaCEP.
