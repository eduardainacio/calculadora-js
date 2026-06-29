# Calculadora em JavaScript
### Visão geral do projeto

Este projeto consiste em uma calculadora desenvolvida com JavaScript puro, acompanhada de HTML e CSS, com foco em criar uma experiência de uso fluida, responsiva e próxima de uma calculadora real de sistema operacional. Além das operações matemáticas básicas, o projeto inclui funcionalidades adicionais como histórico de cálculos, alternância de tema e suporte a entrada via teclado, tornando a aplicação mais completa e interativa.

O objetivo principal do projeto é consolidar conhecimentos em manipulação do DOM, lógica de programação em JavaScript e estruturação de interfaces dinâmicas no front-end, sem dependência de bibliotecas ou frameworks externos.

### Funcionalidades

A calculadora oferece suporte às seguintes operações e recursos:

- Operações matemáticas básicas: soma, subtração, multiplicação e divisão
- Suporte a números decimais
- Cálculo de expressões completas em sequência
- Interpretação de porcentagem (com conversão antes do cálculo)
- Histórico de operações realizadas com armazenamento local
- Reutilização de cálculos a partir do histórico
- Modo claro e escuro com persistência de preferência
- Entrada de dados via clique em botões e teclado físico
- Validação de expressões para evitar cálculos inválidos
- Estrutura técnica

O projeto foi desenvolvido utilizando apenas tecnologias fundamentais da web:

* HTML5 para estruturação da interface
* CSS3 para estilização e layout responsivo
* JavaScript (ES6+) para toda a lógica de funcionamento

A lógica da calculadora é baseada no armazenamento de uma string que representa a expressão matemática atual. Essa string é manipulada dinamicamente conforme o usuário interage com os botões ou teclado.

Para o cálculo final, a expressão é processada e avaliada utilizando eval(), após validações e transformações, como a conversão de porcentagens para operações matematicamente válidas.

### Funcionamento da lógica

A entrada do usuário é armazenada em uma variável central que representa o estado atual da operação. Cada botão pressionado ou tecla digitada modifica essa string, respeitando regras de validação para evitar erros de sintaxe.

Antes de ser calculada, a expressão passa por um processo de normalização, onde elementos como porcentagem são convertidos para uma forma interpretável pelo JavaScript. Em seguida, a expressão é avaliada e o resultado é exibido na interface e armazenado no histórico.

O histórico de operações é persistido utilizando localStorage, permitindo que os dados permaneçam disponíveis mesmo após o recarregamento da página.

### Persistência de dados

O projeto utiliza o localStorage do navegador para armazenar:

Histórico de cálculos realizados
Preferência de tema (claro ou escuro)

Isso garante uma experiência contínua para o usuário, sem perda de dados ao atualizar ou fechar a página.

### Interação com o usuário

A aplicação suporta múltiplas formas de interação:

Clique nos botões da interface
Entrada via teclado físico
Ações rápidas como limpar, deletar último caractere e calcular resultado

Além disso, o sistema possui um painel lateral de histórico que pode ser aberto e fechado dinamicamente.

### Possíveis melhorias futuras

O projeto pode ser expandido com melhorias como:

Implementação de parser matemático próprio, substituindo o uso de eval()
Suporte avançado a porcentagens em operações compostas
Inclusão de operações científicas (raiz, potência, logaritmos)
Melhor acessibilidade e navegação por teclado
Animações e feedbacks visuais mais avançados

### Conclusão

Este projeto representa uma aplicação prática de conceitos fundamentais do desenvolvimento front-end, especialmente no que se refere à manipulação de eventos, lógica de estado e interação com o usuário. Ele também serve como base para evoluções mais complexas, podendo ser expandido para uma calculadora científica ou uma aplicação mais robusta com arquitetura modular.
