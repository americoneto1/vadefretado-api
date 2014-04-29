Vá de Fretado - API
===============

API responsável por extrair informações dos sites de associações de fretado.

Hospedagem
---------------------------------------------
Atualmente a API está hospedada em http://vadefretado.azurewebsites.net/api


URLs disponíveis na API
---------------------------------------------
* GET - /associacoes - Retorna as associações disponíveis
* GET - /associacoes/:id - Retorna os dados da associação informada pelo ID 
* GET - /associacoes/:id/linhas - Retorna as linhas da associação informada pelo ID 


Formato JSON de retorno padrão
---------------------------------------------

```javascript
{
    "_id": 1,
    "nome": "XPTO",
    "endereco": "Rua Tal",
    "telefone": "(XX) XXXX-XXXX",
    "email": "xpto@xpto.com.br",
    "site": "http://www.xpto.com.br/",
    "linhas": [
        {
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
    ]
}
```