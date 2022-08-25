 ## Documentação de testes unitários


 ### Conceitos:
  1) Porque testar?
    - Confiabilidade do código.
    - Confiabilidade daquilo que esta sendo entregue.
    - Reduzir riscos de quebrar o sistema quando algo for alterado.
  2) Qual o objetivo do teste unitário?
    - Testar a menor unidade de codigo possivel (função ou método)
    - Validar o comportamento da logica (de negócio) implementada
    - Métricas de cobertura (5000 linhas de código / 200 funções)

 ### Duvidas frequentes
  1) O teste unitário deve testar bibliotecas/servicos externos que é utilizado dentro do fluxo do sistema?
    Ex:  Banco de dados
         Firebase
    Resp: Não, sempre devemos partir de premissas de que esses "blocos" externos estarão funcionando corretamente.
          Se ignoramos esse principio, estaremos saindo do teste unitário e indo para o de integração.  

 Timeline: 
 - Start do projeto em NestJs
 - Passar pelos conceitos base
 - Escrever o primeiro teste com uma estoria de usuario
 - Apresentar situações 
 - Devo conseguir cadastrar um usuario com:
    - nome
    - email
    - cpf
    - O cadastro terá uma data de expiração
 - Critérios de aceitação:
  1) O nome deve ser obrigatório
  2) Não posso cadastrar um email duplicado
  3) Não posso cadastrar um cpf duplicado
  4) Quando criado um novo cadastro, ele é valido até um ano

Roteiro
- Apresentar configuração inicial
- Falar da estrutura de teste
- Fazer primeiro teste retornando um objeto
- Integrar com o prisma service 
- Adicionar configuracao de path alias no package.json
```
"moduleNameMapper": {
      "src/(.*)$": "<rootDir>/$1"
    },
```
- O teste vai dar certo, porem, vai inserir o usuario no banco (Perguntar se o comportamento esta correto)
- Fazer mock do prisma service (Mockar injeções de dependencia)
- Testar no users.http
- Teste de email unico
- Adicionar findFirst
- Como testar a rejeição de um fluxo
- Definição dos mocks fora do beforeEach
- Explicar sobre a constante fora do beforeEach
- Definir um afterEach
- Criar teste de CPF e retornar ao perigo de usar o rejects.toBeInstanceOf()
- Falar sobre rejectValueOnce
- Criar teste de data de expiração
- Não usar new Date() dentro do teste, porque é uma variante externa ao nosso codigo (Porque externa? porque muda de valor a toda execução)
- Hackizinho do date.now().
- Refatorar codigo 
- criar throwErrorIfEmailExists
- Rodar teste e perguntar se esta correto
  - Um teste unitario nao pode testar outras unidades
- Refatorar testes
- Separar em suites
- Mockar DateUtils
- Atualizar config de coverage do package.json
```
    "collectCoverageFrom": [
      "modules/**/*.service.ts",
      "utils/**/*.ts"
    ],
```

## Como configurar a cobertura dos testes
- Rodar inicialmente --coverage
- Config:
```
"collectCoverageFrom": [
      "**/modules/**/*.service.ts"
    ],
```
- Definir regras de cobertura
```
"coverageThreshold": {
      "global": {
          "branches": 90,
          "functions": 90, 
          "lines": 90,
          "statements": 90
      }
    },
```