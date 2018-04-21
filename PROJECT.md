# Teste Desenvolvedor Front-end (Interação)

## Desafio
Nosso buscador de voo precisa ser refatorado e para tal estamos disponibilizamos os insumos necessários para o desenvolvimento do mesmo:
 Para testar sua aplicação utilizaremos o contexto abaixo. Encorajamos que use o mesmo.
 	Origem: Belo Horizonte (CNF)
Destino: Brasília (BSB) 
Partida: Data de entrega do teste + 7 dias
Volta: Data de partida + 5 dias
Passageiros: 2 adultos - 1 criança

 
### São requisitos funcionais obrigatórios:
	
	•	Exibição dos callbacks adequados (sucesso, falha) das APIs
	•	utilizar o token para a autenticação
	•	Exibição dos voos, bem como seus dados, conforme indicado no layout
	•	Implementação Form de busca: 
	•	Conversão dos dados do form em url
	•	Validação dos campos (todos são obrigatórios)
	•	Máximo de adultos: 10
	•	A quantidade de crianças e bebês deve ser igual ou inferior ao número de adultos
	•	Impossibilitar seleção de aeroportos iguais 
	•	Implementação de datepicker
	•	Não ser possível selecionar uma data anterior ao dia atual
	•	Implementação do autocomplete, tendo como base de dados, os dados da Api de voos
 	
	•	Lista de voos:
	•	Dados do voo
	•	Cálculo dos preços dos voos
	•	Cálculo da economia (diferença de preço entre maxmilhas e airline)
	•	Data de partida e chegada dos voos conforme indicado
	•	Número de paradas do trecho
	•	Airline do voo
	•	Hora de chegada
	•	Hora de partida
	•	Aeroporto de chegada
	•	Aeroporto de partida

### Requisitos não-funcionais (do produto)

Visando seu sucesso no teste, apoiamos as seguintes práticas:
	•	Uso de frameworks baseados em componentes, com ênfase em programação funcional (react, preact, metaljs, inferno, etc)
	•	Metodologias/padrões de desenvolvimento (BEM, SMACSS, OOCSS)
	•	Mobile-first
	•	Uso de um linter da sua escolha
	•	Uso de algum task-runner (recomendamos webpack)
	•	Documentação para rodar o projeto (README.MD)


### São requisitos desejáveis:
	•	Utilização de docker para a construção do ambiente
	•	Dados do voo (mostrar os detalhes de conexão e paradas é um bônus)
	•	Desenvolvimento de features adicionais que agreguem valor ao teste
	•	Utilização de Pré Processadores de css
	•	Recursos mais recentes do css (CSS variables, Flex-box, etc)
	•	Abordagem de testes unitários (se possível, indicando a cobertura dos testes)


### Como entregar este teste:
Você deverá entregar um arquivo compactado (zip/tar.gz) contendo o projeto e todos os artefatos necessários para execução do mesmo em outro ambiente.

### URL Base dos Endpoints
https://flight-price-hmg.maxmilhas.com.br

#### Token para Autenticação 
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtYXhtaWxoYXMuY29tLmJyIiwiaWF0IjoxNTA5MTIwMTAxLCJleHAiOjE1MTA0MTYxMDEsImF1ZCI6InRlc3RlLWZyb250ZW5kIiwic3ViIjoidGVzdGUtZnJvbnRlbmQiLCJlbnYiOiJobWcifQ.nM6wMem6dxF0CcDlig5iA9az5ZfmbXDjq1e4ypZXwjU

## Dicas de desenvolvimento:

### Entendendo a API:

Para este exemplo, usaremos axios como interface para o XHR. No entanto, o método de acesso a API é de sua escolha.
Para buscar voos, é necessário primeiramente, criar uma intenção de busca, que é um número que representa as características da sua busca, obtido através da seguinte chamada XHR:

axios.post(`${SEARCH_FLIGHTS_API }/search?time=${Date.now()}, postData)

### Onde postData  seria:

const postData = {
    tripType: "RT", 
    from: "REC",  //origem
    to: "RIO",  //destino
    outboundDate: "2017-12-22", //data de partida
    inboundDate: "2017-12-28", //data de volta
    cabin: "EC", //classe econômica (EC) ou executiva (EX)
    adults: 2, //adultos
    children: 1, //crianças
    infants: 0 //bebês
}


### Os dados obtidos por este request serão parecidos com os apresentados abaixo:

{
	"id": "59f38e0e592d9a06ccda8bfe",
	"createdDate": "2017-10-27T19:50:37.604Z",
	"legacyId": "48490545",
	"isInternational": false,
	"isMercosul": true,
	"airlines": [{
		"label": "latam",
		"timeout": 60,
		"status": {
			"enable": true,
			"message": ""
		}
	}, {
		"label": "gol",
		"timeout": 60,
		"status": {
			"enable": true,
			"message": ""
		}
	}, {
		"label": "azul",
		"timeout": 60,
		"status": {
			"enable": true,
			"message": ""
		}
	}, {
		"label": "avianca",
		"timeout": 60,
		"status": {
			"enable": true,
			"message": ""
		}
	}]
}


Às airlines que retornarão voos no próximo request são aquelas cujo atributo airlines[x].status.enable tem valor true. Dado este cenário, faça uma consulta ao endpoint search/${searchId}/flights=?airline=x onde x é a airline selecionada.

axios.get(`${SEARCH_FLIGHTS_API }/search/${searchId}/flights?airline=${airline.label}`)


Daqui pra frente, é só armazenar os voos que chegarem e exibir na tela.

Boa sorte :)