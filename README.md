<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Backend Teste Técnico Devnology

## - Descrição

API feita em [Nest](https://github.com/nestjs/nest) para suprir uma aplicação de e-commerce.

## - Processo de desenvolvimento
Para iniciar o desenvolvimento deste desafio, me propus a usar o framework NestJS para ter um novo aprendizado dentro das tecnologias que eu conheço. Tendo isso em vista, eu optei por utilizar um banco de dados SQL como o postgreSQL pois já tenho experiência anterior, a partir daí eu comecei elaborando o diagrama de entidades e relacionamentos tendo em vista o objetivo da aplicação.

<img src="./src/assets/diagramaER.png">

A tabela de produtos foi um dos pontos problemáticos pois cada produto de cada fornecedor que era recebido de forma externa tinha atributos diferentes entre eles, porém, como exitiam atributos iguais, esses foram determinados como obrigatórios e o restante se tornou opicional na inserção de um novo produto. Feito isso, parti para o desenvolvimento da aplicação em si, tive que fazer a integração do TypeORM ao Nest e, utilizando o padrão Repository, aprender os conceitos particulares do framework e com isso poder gerar todos os endpoints e suas regras de negócio.

## - Instalação
Após clonar este repositório rode o seguinte comando no seu terminal:

```bash
$ npm install
```
## - Banco de dados
Essa aplicação necessita de um banco de dados PostgreSQL para rodar, por isso é necessário criar um arquivo .env baseado no arquivo .env.example deste projeto e preenchê-lo com as credenciais do seu banco de dados. 
Além disso preencha também as outras variáveis de ambiente necessárias, e em seguida rode no seu terminal o comando para rodar as migrations e criar as tabelas:

```bash
$ npm run typeorm migration:run -d src/data-source.ts
```

## - Rodando a API

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## - Documentação

| URL Base  | Endereços                      |
| --------| ----------------------------- | 
| Local    |  http://localhost:8000 -> ou :PORT(.env)  |
| Deploy    |  https://api-ecommerce-default.herokuapp.com |


### Rotas
| Methods | Endpoint                      | Responsability                        | Need Token? |
| --------| ----------------------------- | --------------------------------------|------------- |
| POST    |  /users/register               | Rota para criação de um usuário       | false |
| POST    |  /users/login                  | Rota para o usuário acessar sua conta | false |
| GET    |  /users                        | Rota para acessar um usuário específico | true |
| POST    | /cart                         | Rota para adicionar um item ao carrinho do usuário do token | true |
| DELETE  | /cart/:product_id                         | Rota para deletar um item especifico no carrinho do usuário do token |  true |
| POST    | /cart/checkout                 | Rota para finalizar a compra | true |

#

## - Requisições

## POST  - /users/register
Campos obrigatórios: 'name', 'email', 'cpf', 'password'
<br>Exemplo de requisição:
```json
{
    "name": "Vinícius de Freitas", 
    "email":"vinicius@email.com",
    "password":"aA1234",
    "cpf": "12312312312"
}
```
Caso dê tudo certo irá retornar o status code 201 e a seguinte resposta:

```json
{
 "user_id": "7e0040a8-16ed-4a61-a14a-133842817921",
 "name": "Vinícius de Freitas",
  "email":"vinicius@email.com",
  "cpf": "12312312312",
  "cart": {
    "cart_id": "136062d3-c150-4ce3-83af-93f6afc24f23",
    "total": 0
  }
}
```


## POST - /users/login

Campos obrigatórios: 'email', 'password'
<br>Exemplo de requisição:

```json
{
	"email":"vinicius@email.com",
    "password":"aA1234"
}

```
Caso dê tudo certo irá retornar o status code 200 e a seguinte resposta:

```json
{
  "token": <token>
}
```

## GET - /users
Authorization: Bearer `Token`<br>
Caso dê tudo certo irá retornar o status code 200 e a seguinte resposta:

```json
{
  "user_id": "7e0040a8-16ed-4a61-a14a-133842817921",
  "name": "Vinícius de Freitas",
  "email":"vinicius@email.com",
  "cpf": "12312312312",
  "orders": [],
  "cart": {
    "cart_id": "136062d3-c150-4ce3-83af-93f6afc24f23",
    "total": 0,
    "products": []
  }
}
```

## POST  - /cart
Authorization: Bearer `Token`
<br>Campos obrigatórios: 'name', 'description', 'price', 'image', 'material'
<br>Campos opicionais: 'category', 'department', 'has_discount', 'discount_value', 'adjective'
<br>Exemplo de requisição:
```json
{
	"name": "Handcrafted Frozen Sausages",
	"description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
	"price": "723.00",
	"image": "http://placeimg.com/640/480/sports",
	"material": "Concrete",
	"has_discount": false,
	"discount_value": "0.05",
	"adjective": "Gorgeous"
}
```
Caso dê tudo certo irá retornar o status code 201 e a seguinte resposta:

```json
{
  "cart_id": "1888a40a-af40-4c9d-8de8-ebdd70686e7d",
  "total": 723,
  "products": [
    {
      "product_id": "6c983f95-2000-4220-883b-3c6bf7188880",
      "name": "Handcrafted Frozen Sausages",
      "description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
      "price": "723.00",
      "image": "http://placeimg.com/640/480/sports",
      "material": "Concrete",
      "category": null,
      "department": null,
      "has_discount": false,
      "discount_value": "0.05",
      "adjective": "Gorgeous"
    }
  ]
}
```

## DELETE	- /cart/:product_id
Para esta rota é somente necessário passar o id do produto a ser deletado do carrinho.

Authorization: Bearer `Token`

Caso dê tudo certo irá retornar o status code 200 e a seguinte resposta:

```json
{
  "cart_id": "1888a40a-af40-4c9d-8de8-ebdd70686e7d",
  "total": 0,
  "products": []
}
```

## POST	 - /cart/checkout
Esta rota é para finalizar a compra e registrar os produtos no carrinho gerando uma ordem de compra.

Authorization: Bearer `Token`

Caso dê tudo certo irá retornar o status code 201 e a seguinte resposta:

```json
{
  "total": 723,
  "timestamp": "2022-07-08T12:15:29.906Z",
  "products": [
    {
      "product_id": "6c983f95-2000-4220-883b-3c6bf7188880",
      "name": "Handcrafted Frozen Sausages",
      "description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
      "price": "723.00",
      "image": "http://placeimg.com/640/480/sports",
      "material": "Concrete",
      "category": null,
      "department": null,
      "has_discount": false,
      "discount_value": "0.05",
      "adjective": "Gorgeous"
    }
  ],
  "order_id": "9e83766d-5228-4f67-837f-75a83b0c3c97"
}
```
