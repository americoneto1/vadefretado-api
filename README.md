Vá de Fretado - API
===============

API responsável por extrair informações dos sites de associações de fretado.

Hospedagem
---------------------------------------------
Atualmente a API está hospedada em http://vadefretado.herokuapp.com/api


URLs disponíveis na API (v1)
---------------------------------------------
* GET - /v1/companies - Retorna as associações disponíveis
* GET - /v1/companies/:id - Retorna os dados da associação informada pelo ID 

```javascript
{
    "_id": "12345",
    "nome": "XPTO",
    "endereco": "Rua Tal",
    "telefone": "(XX) XXXX-XXXX",
    "email": "xpto@xpto.com.br",
    "site": "http://www.xpto.com.br/"
}
```

* GET - /v1/companies/:id/lines - Retorna as linhas da associação informada pelo ID 

```javascript
{
    "_id": "12345",
    "numero": "XPTO",
    "nome": "Rua Tal"
}
```

* GET - /v1/companies/:id/lines/:idLine - Retorna a linha da associação informada pelo ID 
* GET - /v1/lines/:id - Retorna a linha informada pelo ID 

```javascript
{
    "_id": "12345",
    "company_id": "12345",
    "numero": "01",
    "nome": "LINHA 1",
    "coordenador": {
        "nome": "JOAQUIM",
        "telefone": "(XX) XXXX-XXXX",
        "email": "joaquim@xpto.com.br"
    },
    "ida": [
        "05:29 hs - ...",
        "05:30 hs - ..."
    ],
    "volta": [
        "05:29 hs - ...",
        "05:30 hs - ..."
    ]
}
```

* GET - /v1/search?origem&destino - Retorna as linhas de acordo com a busca 

```javascript
{
    "_id": "12345",
    "company_id": "12345",
    "numero": "01",
    "nome": "LINHA 1",
    "company": {
        "_id": "12345",
        "nome": "XPTO",
        "endereco": "Rua Tal",
        "telefone": "(XX) XXXX-XXXX",
        "email": "xpto@xpto.com.br",
        "site": "http://www.xpto.com.br/"
    },
    "lines": [
        {
            "_id": "12345",
            "numero": "XPTO",
            "nome": "Rua Tal"
        }
    ]
}
```