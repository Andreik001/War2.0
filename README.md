# War2.0

## 1. O que é o projeto

O projeto é um jogo de estratégia e conquista baseado no mapa oficial do WAR Grow, mas com mecânicas e objetivos personalizados. A aplicação é construída para PC e multiplayer, com uma estrutura preparada para expansão.

Tecnologias principais: React 19, TypeScript, Vite, Tailwind CSS, Lucide, Motion, Canvas Confetti, `@google/genai`, Express e dotenv. O projeto utiliza a porta 3000.

## 2. O mapa do WAR

O mapa possui 6 continentes, 42 territórios e bônus por continente:

- América do Norte: 9 territórios, bônus +5
- América do Sul: 4 territórios, bônus +2
- Europa: 7 territórios, bônus +5
- África: 6 territórios, bônus +3
- Ásia: 12 territórios, bônus +7
- Oceania: 4 territórios, bônus +2

Os dados de cada território incluem nome, continente, vizinhos, posição x/y, símbolo da carta, caminho SVG e rotas marítimas.

Territórios: Alasca, Mackenzie, Groenlândia, Vancouver, Labrador, Califórnia, Nova York, México, Territórios do Noroeste, Venezuela, Peru, Brasil, Argentina, Islândia, Inglaterra, Suécia, Alemanha, Polônia, Moscou, Espanha, Itália, França, Egito, Argélia, Nigéria, Congo, África do Sul, Madagascar, Oriente Médio, Índia, China, Mongólia, Sibéria, Vladivostok, Japão, Sumatra, Borneo, Nova Guiné, Austrália, Afeganistão e Urais.

## 3. Jogadores

O jogo suporta até 6 jogadores, nas cores Vermelho, Azul, Verde, Amarelo, Branco e Preto.

Cada jogador possui:

- ID
- nome
- cor
- indicação de humano ou IA
- dificuldade da IA
- objetivo secreto
- cartas
- cartas táticas
- estado de eliminado
- estatísticas

As estatísticas incluem territórios perdidos/conquistados e exércitos derrotados/perdidos.

## 4. Sistema de turnos

Cada turno possui três fases principais:

1. Reforços
2. Ataque
3. Manobra

O jogo controla rodada, jogador ativo, fase atual, tropas de reserva e se o jogador conquistou território naquela rodada.

## 5. Sistema de reforços

O jogador recebe reforços calculados por:

`max(3, metade dos territórios controlados)`

Também são aplicados os bônus dos continentes controlados e possíveis efeitos de eventos.

## 6. Sistema de combate

O combate utiliza o `CombatModal`, com dados do atacante e defensor, perdas, conquista do território, retirada e movimentação das tropas sobreviventes.

Existe a configuração `defenderWinsTies`, que determina se o defensor vence em caso de empate. Por padrão, ela está habilitada.

## 7. Sistema de manobra

A manobra permite selecionar território de origem, território de destino e quantidade de tropas.

Normalmente deve permanecer pelo menos 1 exército no território de origem. Existe também a configuração `unlimitedManeuvers` para controlar a quantidade de manobras permitidas.

## 8. Objetivos secretos

O jogo possui objetivos clássicos, incluindo exemplos como:

- conquistar Europa + Oceania + 1 continente
- conquistar Ásia + América do Sul
- conquistar Ásia + África
- conquistar América do Norte + África
- conquistar América do Norte + Oceania
- conquistar Europa + América do Sul + 1 continente
- conquistar 24 territórios
- conquistar 18 territórios com pelo menos 2 exércitos em cada um

## 9. Objetivos de eliminar uma cor

Existem objetivos de eliminar cada uma das seis cores de jogador.

Se o alvo for o próprio jogador ou a cor-alvo não estiver presente, o objetivo é substituído por um objetivo alternativo de conquistar 24 territórios.

## 10. Objetivos personalizados

Existem objetivos personalizados, como:

### Domínio Insular/Marítimo
Controlar Islândia, Inglaterra, Madagascar, Japão, Sumatra, Borneo, Nova Guiné e Austrália.

### Três Grandes Capitais
Controlar Brasil, Moscou e China com pelo menos 4 exércitos em cada uma, além dos demais requisitos definidos pelo objetivo.

### Muralha Continental
Controlar 14 territórios, mantendo pelo menos 3 exércitos em cada um.

## 11. Criador de objetivos

O `ObjectivesBuilderModal` permite criar objetivos personalizados utilizando:

- continentes
- quantidade de territórios
- territórios fortificados
- capitais
- eliminação de uma cor

Também permite selecionar continentes e territórios e gera automaticamente uma descrição para o objetivo.

## 12. Editor de mecânicas

O `MechanicsEditorModal` permite configurar:

- nevoeiro de guerra (`fogOfWar`)
- ataques aéreos (`airStrikes`)
- fortificações (`fortifications`)
- eventos globais (`globalEvents`)
- cartas táticas (`tacticalCards`)
- vitória do defensor em empates (`defenderWinsTies`)
- trocas progressivas de cartas (`progressiveCardTrades`)
- modo capitais (`capitalsMode`)
- manobras ilimitadas (`unlimitedManeuvers`)
- pactos de aliança (`alliancePacts`)
- quantidade mínima de tropas colocadas (`minArmiesPlacement`), com padrão 3

## 13. Cartas

As cartas de território utilizam os símbolos círculo, triângulo, quadrado e coringa.

A troca progressiva de cartas utiliza os valores:

`4, 6, 8, 10, 12, 15, 20, 25, 30, 35, 40, 45, 50`

## 14. Cartas táticas

As cartas táticas existentes incluem:

- **Bombardeio Aéreo:** atacar um inimigo dentro de até 2 conexões, causando perda de 1–2 tropas, sem movimentação de tropas.
- **Construir Fortaleza:** recebe +1 dado de defesa.
- **Espionagem Militar:** revela o objetivo/cartas de um oponente.
- **Conscrição de Emergência:** recebe +3 exércitos de reserva.
- **Blitzkrieg:** os próximos 3 ataques recebem bônus no maior dado.
- **Pacto de Não-Agressão:** cria a possibilidade de uma trégua temporária.

### Ataque Aéreo Estratégico

Esta é uma carta tática diferente do Bombardeio Aéreo.

- No início de cada nova partida, o sistema escolhe aleatoriamente **um território secreto do mapa**.
- O território secreto muda aleatoriamente a cada nova partida.
- Nenhum jogador sabe qual território foi escolhido.
- O jogador descobre o território secreto somente quando o conquista.
- Ao conquistar o território secreto, o jogador recebe a carta **Ataque Aéreo Estratégico**.
- Para usar a carta, o jogador precisa ter pelo menos **20 soldados no território de origem**.
- Se tiver mais de 20 soldados, o jogador escolhe quantos soldados participarão da operação.
- A carta permite atacar **qualquer território inimigo do mapa**, independentemente de ser vizinho ou não.
- O ataque não garante vitória: a batalha é resolvida usando as **regras normais de combate e dados**.
- Se o atacante vencer, os soldados sobreviventes da batalha ocupam/conquistam o território-alvo.
- Se o atacante perder, não há conquista e as perdas normais do combate são aplicadas.
- Como custo da operação, o jogador perde **metade dos soldados escolhidos/comprometidos**.
- Não existe a regra de deixar obrigatoriamente 1 soldado no território de origem para esta operação.
- Depois de usada, a carta é consumida.

## 15. Eventos globais

Os eventos globais incluem:

- Inverno Siberiano
- Crise de Suez
- Envio de Armas Aliadas (+2)
- Insurreição Popular
- Monções Tropicais

Os eventos possuem duração em rodadas.

## 16. Nevoeiro de guerra

O `App.tsx` calcula os territórios revelados com base nos territórios controlados pelo jogador, permitindo ocultar informações fora da área conhecida quando o nevoeiro de guerra está ativo.

## 17. IA

A IA possui sistemas de reforço, seleção estratégica de territórios, ataques automáticos e manobras.

A lógica atual é simples e utiliza, entre outras condições, uma comparação em que o atacante precisa ter mais tropas que o defensor por uma margem mínima.

## 18. Registro da guerra

O jogo possui `GameLogEntry` para registrar:

- ataques
- conquistas
- cartas
- reforços
- eliminações
- eventos
- alterações de mecânicas

Cada registro pode conter rodada, texto, horário e tipo/cor. O `GameLogModal` exibe o histórico da guerra.

## 19. Sistema de vitória

A vitória exibe uma tela de **VITÓRIA ABSOLUTA**, com:

- vencedor
- objetivo secreto
- duração da guerra
- territórios conquistados
- animação
- confetes
- som de vitória
- opção de iniciar uma nova partida

## 20. Som

O sistema de áudio fica em `src/sound/audio.ts`, com `warAudio` e controle de áudio disponível no HUD.

## 21. Interface

A estrutura principal é:

`App → GameSetup / Game`

Durante o jogo existem:

- GameHeader
- WarBoard
- ActionPanel
- Objective
- Cards
- Tactical Cards
- Mechanics
- Objectives
- Logs
- Restart

Os modais incluem:

- CombatModal
- ManeuverModal
- CardsModal
- ObjectiveModal
- ObjectivesBuilderModal
- MechanicsEditorModal
- TacticalCardsModal
- GameLogModal
- VictoryModal

## 22. Uma coisa importante que percebi

A arquitetura separa os tipos, dados e componentes.

Os tipos contêm os modelos de dados; os arquivos de dados concentram mapa, objetivos, mecânicas, eventos e cartas; e os componentes concentram a interface.

## 23. Porém, encontrei algumas coisas que precisam de atenção

Alguns pontos ainda precisam de evolução:

- O Gemini está declarado no projeto, mas não foi encontrada uma integração efetiva completa.
- O README original era basicamente um boilerplate genérico do AI Studio.
- Algumas mecânicas ainda estão parcialmente implementadas, como pactos, capitais, eventos específicos e algumas funções de cartas táticas.
- O novo **Ataque Aéreo Estratégico** precisa estar integrado ao combate normal com dados, em vez de simplesmente conquistar o território de forma automática. Também deve respeitar a seleção de 20 ou mais tropas, o custo de metade das tropas comprometidas, o alvo global e o consumo da carta.
- A IA ainda é simples e precisa evoluir em avaliação de risco, estratégia baseada no objetivo secreto, estratégia de continentes, defesa de fronteiras, economia de cartas, diplomacia, eventos e planejamento de vários turnos.
- O `App.tsx` concentra muita lógica do jogo. Uma evolução possível seria separar em módulos como `game/combat.ts`, `turnManager.ts`, `reinforcement.ts`, `objectives.ts`, `cards.ts`, `events.ts`, `ai.ts` e `victory.ts`.

## 24. O que eu entendi como objetivo do projeto

O objetivo não é simplesmente criar um “WAR online”.

A visão é criar um **motor digital de WAR configurável**, que tenha como base o WAR e permita combinar:

- objetivos personalizados
- regras personalizadas
- cartas táticas
- eventos globais
- fortificações
- ataques aéreos
- **Ataque Aéreo Estratégico com território secreto, escolha de tropas e combate normal por dados**
- capitais
- diplomacia
- IA
- nevoeiro de guerra

A ideia é que o jogo possa continuar crescendo sem ficar preso às regras originais, permitindo criar diferentes experiências de guerra e estratégia dentro da mesma estrutura.
