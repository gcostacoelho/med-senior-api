
# Med Senior - API

* [Sobre](#sobre)
* [Configurando a aplicação](#configurando-a-aplicação)
    * [Intalando o Yarn (opcional)](#instalando-o-yarn-opcional)
    * [Instalando as dependências](#instalando-as-dependências)
    * [Criando o banco de daos utilizado Docker](#criando-o-banco-de-dados-utilizando-docker)
    * [Crinado a variável de ambiente](#criando-a-variável-de-ambiente)
    * [Utilizando o Prisma](#utilizando-o-prisma)
    * [Rodando a aplicação](#rodando-a-aplicação)
* [Documentação da API](#documentação-da-api)
* [Outros repositórios](#outros-repositórios)
* [Colaboradores](#colaboradores)

## Sobre

> Projeto desenvolvido para as disciplinas de DSW e PDM

Idosos muitas vezes enfrentam desafios em sua vida diária e podem precisar de ajuda em situações de emergência.

Solução Proposta: Um aplicativo web que oferece recursos de assistência, como alertas de medicamentos, rastreamento de saúde e botões de emergência para idosos. Ele também pode permitir que familiares e cuidadores monitorem o bem-estar dos idosos remotamente.


## Configurando a aplicação
### Instalando o Yarn (opcional)

```bash
$ npm -g i yarn
```

### Instalando as dependências

Rode o seguinte comando para instalar as dependências do projeto:

```bash
$ npm install
# ou
$ yarn install
```

### Criando o banco de dados utilizando Docker

Dentro da raiz desse projeto, temos um arquivo chamado ```DatabaseContainer.zip```, faça a descompactação do mesmo em um diretório de sua preferência... Após a descompactação, dentro da pasta haverã o seguinte arquivo ```comandos_para_criacao.txt```, contendo instruções de como criar o seu banco  de dados utilizando o Docker, alẽm da string de conexão para o banco de dados utilizado.

### Criando a variável de ambiente

Para ter o acesso ao banco de dados é necessário uma string de conexão, essa string de conexão deve estar em um arquivo ```.env```... Para isso basta cria-lo utilizando como base o arquivo ```.env.example```, substituindo somente o conteúdo da variável.

### Utilizando o Prisma

Para rodar a aplicação é necessário gerar as tabelas no banco de dados, para isso o [Prisma](https://www.prisma.io/) está sendo utilizado.

Os comandos necessários são:
```bash
$ yarn prisma generate
$ yarn prisma migrate dev

# ou

$ npm prisma generate
$ npm prisma migrate dev
```

### Rodando a aplicação

Após realizar todas as etapas acima, já podemos iniciar a aplicação com o seguinte comando:

```bash
$ yarn run start
```

Após a aplicação terminar de subir, já vai ser possível realizar requisições através de algum API Client através da URL: http://localhost:5000.

## Documentação da API

A API também possui um Swagger (documentação), onde é possível verificar os possíveis retornos e  parâmetros necessários para fazer uma requisição bem sucedida.

Para possuir acesso a documentação é necessário que a **API esteja em pleno funcionamento**, você pode visualiza-lá na seguinte URL: http://localhost:5000/api.

> Para obter o yaml do swagger, utilize a URL: http://localhost:5000/api-yaml.

## Outros repositórios

- Módulo de autenticação: [Med Senior - Auth](https://github.com/gcostacoelho/med-senior-auth)

- Front End (desenvolvido em Vue): [Med Senior - Front](https://github.com/Rezende-Fabio/med-senior-front)

- Mobile (desenvolvido em Flutter): [Med Senior - Mobile](https://github.com/Rezende-Fabio/med-senior-mobile)

## Colaboradores

- [Fabio Rezende](https://github.com/Rezende-Fabio)
- [Mateus Moraes](https://github.com/Mateus11Toledo)
- [Hellen Turri](https://github.com/hellenTurri)
- [Karin Kagi](https://github.com/karinkagi)
