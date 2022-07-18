 ## Documentação de testes unitários


 ### Conceitos:
  1) Porque testar?
    - Confiabilidade do código.
    - Confiabilidade daquilo que esta sendo entregue.
    - Reduzir riscos de quebrar o sistema quando algo for alterado.
  2) Qual o objetivo do teste unitário?
    - Testar a menor unidade de codigo possivel (função ou método)
    - Validar o comportamento da logica (de negócio) implementada



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
 - Devo conseguir cadastrar um usuario com nome, email, cpf e numero de telefone.
 - Como usuario quero logar no sistema.