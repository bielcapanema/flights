# Teste Desenvolvedor Front-end (Interação)

## Live Demo

https://atualizame.firebaseapp.com/

## Descrição

Tentei cumprir o máximo de requisitos possíveis do teste, porém devido a minha rotina não foi possível dedicar o tempo necessário para cumprir o teste da maneira que eu desejava. No fim de semana tive compromissos pessoais que não pude adiar e esta é uma semana de provas, tive que estudar sábado todo o tempo restante que tive. Consegui realizar 90% do teste no domingo e alguns ajustes segunda, devido minha rotina de 8hrs de trabalho + UFMG não consegui cumprir com toda a especificação, deixando faltar principalmente a parte visual do projeto.

Não tomei como base a maneira mais simples de realizar o teste, pois queria utilizar máximo meus conhecimentos, utilizando bibliotecas e padrões que considero exagerados para o tamanho do projeto, mas importantes para demonstrar meus conhecimentos. Além disso utilizei uma lib nova para a criação de estilos, a `react-emotion` que eu nunca havia usado antes, mas com meus últimos estudos vi grande potencial para utilizar em projetos reais no futuro.

## Solução

Utilizei create-react-app para iniciar o projeto, configurei os reducers utilizando o padrão Redux-Ducks (https://github.com/erikras/ducks-modular-redux) juntamente com a lib `reduxsauce`, fazendo o uso de diversas outras libs para persistir os dados no localStorage e o rehydrate. Apesar de não ter grande necessidade utilizei `react-router-redux` para controlar as rotas do SPA e `redux-form` para controle do formulário de pesquisa. 

Como seriam necessários várias requests assincronos utilizei também `redux-sagas` para controlar os side-effects, possibilitando um maior controle das requisições e utilizando um padrão de projeto que já estou familiarizado.

## Rodando o projeto

```
yarn install
yarn run
```
