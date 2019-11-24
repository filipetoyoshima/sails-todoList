# Lista de To-Do com SailsJS

Esse é um projeto [Sails v1](https://sailsjs.com) construído com o intuíto de exercitar os conhecimentos básicos necessários para construir uma API. Aqui se concentra um conhecimento que eu tive o trabalho e o prazer de minerar de várias fontes, desde a documentação oficial a vários artigos no Medium. Espero que possa ajudar!

**Caso queira utilizar esse projeto para aprender** eu não recomendo apenas cloná-lo e tentar executar. Esse é um projeto "Hello World", algo como a primeira coisa que você faz com uma ferramenta. Quando se está nesse nível, é difícil entender como as coisas estão se ligando, principalmente se não há experiências com APIs. Logo abaixo há um [guia commit por commit](#Guia%20commit%20por%20commit), onde eu tento explicar o que aprendi com este projeto, um passo de cada vez. Replicar esses passos, talvez adicionando seu toque pessoal, pode ser uma boa ideia.

Aceito contribuições, desde que mantenha o cunho didático do projeto :smile:

**Obs:** Versão do Sails nesse projeto: v1.2.3

## Features

As funcionalidades que queremos cobrir são:

- Cadastro e autenticação de usuários com [JWT](https://jwt.io/)
- Registro de To-Do's
- Registro de categorias de To-Do
- Listagem de To-Do's do usuário logado
- Conexão com um banco [MySQL](https://www.mysql.com/)

## Guia commit por commit:

### Criando o projeto:

[Commit](https://github.com/filipetoyoshima/sails-todoList/commit/1375461c696467d688035653c21685e65c20b601)

Ok, antes de mais nada é importante conhecer um pouco sobre o Sails através do que a documentação oficial tem a dizer. Então dê uma lida no [guia de instalação oficial](https://sailsjs.com/get-started) e siga as instruções lá. Leia pelo menos até a definição sobre [o que é o sails](https://sailsjs.com/whats-that).

Quando for gerar o projeto, escolha a opção `Empty`, queremos aprender como se faz as coisas, então vamos evitar muita mágica pronta, ok?

Gerar o projeto é tudo o que esse commit faz, vamos ver adiante o que podemos fazer.

### Gerando uma entidade na API: 

[Commit](https://github.com/filipetoyoshima/sails-todoList/commit/ea4a15b6693bfce7b24f207c24b5570f86d1979f)

Queremos uma API e o Sails dá algum suporte para construirmos uma bem rapidinho. Com seu terminal, vá ao diretório do seu projeto e faça o comando:
```
sails generate api todo
```
Esse comando irá gerar uma Model e uma Controller para a nossa Todo. Se você deu uma lida na documentação do Sails, viu que é um framework voltado para aplicações [MVC](https://pt.wikipedia.org/wiki/MVC). Se você não sabe o que é isso, agora é uma boa hora para parar um pouco e ler sobre. Como estamos construindo uma API, Views não vão ser tão relevantes no momento.

Para concluirmos nossa entidade, é necessário detalhar um pouco sobre o que é a To-Do, ou seja, definir quais informações o banco de dados irá guardar. Eu escolhi colocar `name` e `description`. Dê uma olhada no commit se quiser ver como eu fiz. Caso queira ir um pouco além, recomendo a leitura da [documentação oficial sobre Models](https://sailsjs.com/documentation/concepts/models-and-orm/attributes), lá você vai encontrar várias informações úteis sobre como detalhar sua Model.

O interessante do Sails é que só isso já é o suficiente para a API funcionar. Basta escolher o client rest de sua preferência para começar a testar sua nova API.

> Se você não sabe o que são clients rest, ficam algumas sugestões:
>
> - [Postman](https://www.getpostman.com/)
> - [Insomnia](https://insomnia.rest/)
> - [YARC](https://yet-another-rest-client.com/)
> - [Muitos outros](https://medium.com/@alicealdaine/top-10-api-testing-tools-rest-soap-services-5395cb03cfa9)

Basta levantar o servidor e fazer suas requisições POST (com os atributos que você configurou na Model) e GET na URL `localhost:1337/todo` e ver a mágica acontecendo.

### Associações

[Commit](https://github.com/filipetoyoshima/sails-todoList/commit/06ae793120fa23bd90e96cc55978b2df2934eaf7)

Para começar, nada de muito novo. Apenas gerei mais uma entidade que chamei de `category` utilizando o comando `sails generate api category`.

A novidade aqui é a associação que o Sails faz automaticamente pra você. De volta à Model Todo (sim, aquela de antes), adicionei um novo atributo `category` que, ao invés de `type`, tem um `model` cujo valor é `Category`. Ficou confuso? :sweat_smile: Dê uma olhada no commit que fica mais claro.

Vale lembrar que, para testar suas alterações, é necessário interromper e reiniciar o servidor. Como você já tinha um banco sendo consumido (sim, você tinha!), o sistema perguntará como deseja realizar as migrações. As duas primeiras opções são válidas quando estamos apenas testando as alterações, leia o que cada uma delas faz e escolha a que melhor te atende para cada vez que você for reiniciar o projeto. É possível também instalar algumas coisas para [auto reload no Sails](https://stackoverflow.com/questions/18687818/auto-reloading-a-sails-js-app-on-code-changes), mas eu não acho necessário. Siga o seu coração!

Agora vai lá e testa! Se você cadastrar uma `Category` e depois cadastrar um `Todo` passando, no campo adequado, o id da `Category` recém-criada, e então dar um GET nas `Todo` registradas, o Sails já retorna, dentro do objeto `Todo` todas as informações da `Category` associada. Magia negra!

### Conexão com o Banco de Dados

[Commit](https://github.com/filipetoyoshima/sails-todoList/commit/b8c6ef536b3d3202505dd79801dc349a2928245f)

**Esse não é um passo necessário.** O Sails, por padrão, vem com um banco `sails-disk` (eu falei que você tinha!), onde, até agora, ele armazenava as Models que os commits anteriores criaram. Mas eu quis conectar com um banco externo por questão de aprendizado, afinal, esse é o objetivo, não?

Se você olhar as alterações do commit, vai ver que o trabalho dentro do Sails é quase nenhum. E, de fato, é realmente bem simples. O trabalho mesmo é em relação a configurar o banco. Eu escolhi conectar ao MySQL, mas o Sails suporta vários outros, e não importa qual você escolher, provavelmente os outros commits permancerão iguais. É a magia do [Waterline](https://sailsjs.com/documentation/reference/waterline-orm).

Para o MySQL, é nessário criar um Schema e configurar um usuário que o Sails possa usar para acessar o banco. Existem várias maneiras de fazer isso. A mais fácil, na minha opnião, é pelo MySQL Workbench. Encontrei um [vídeo](https://www.youtube.com/watch?v=xfWDngbbMnE) onde um cara ensina a fazer isso. Siga apenas até o 3:30 do vídeo, a partir dali o procedimento é outro em razão da versão do Sails que o autor usava.

Agora, conexão com o banco é feita pelo arquivo `config/datastores.js`. Leia os comentários que vem por padrão nesse arquivo e eles esclarecerão sobre como configurar a conexão do Sails. Aliás, sempre leias os comentários que vem por padrão, eles têm informações úteis e ascii arts legais. Lá você vai ler que não é assim que se configura uma conexão de banco para produção, mas apenas para desenvolvimento.

Se tudo tiver dar dado certo, após reiniciar o servidor e realizar as migrações, as tabelas referentes as Models do Sails deverão existir no Schema recém-criado e conectado à API.

### Continua... algum dia

<!-- ### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Fri Nov 22 2019 08:32:39 GMT-0200 (Brasilia Summer Time) using Sails v1.2.3. -->

<!-- Internally, Sails used [`sails-generate@1.16.13`](https://github.com/balderdashy/sails-generate/tree/v1.16.13/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

