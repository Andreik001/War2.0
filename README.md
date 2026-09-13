# WAR 2.0 — Estratégia Global

Projeto de jogo digital de estratégia e conquista de territórios inspirado no WAR Grow, usando o mapa de 42 territórios como base e permitindo regras, objetivos e mecânicas personalizadas.

## 1. Visão do projeto

O projeto funciona como um **motor configurável de WAR**, combinando conquista de territórios, objetivos secretos, cartas de território, cartas táticas, eventos globais, fortificações, bombardeio aéreo, Ataque Aéreo Estratégico, nevoeiro de guerra, capitais, pactos, IA e histórico da guerra.

## 2. Tecnologias

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Motion
- Canvas Confetti
- Express / dotenv (estrutura preparada)
- Google GenAI (dependência preparada; integração efetiva ainda não é usada pelo jogo)

## 3. Mapa do WAR

O mapa possui **6 continentes e 42 territórios**.

| Continente | Territórios | Bônus |
|---|---:|---:|
| América do Norte | 9 | +5 |
| América do Sul | 4 | +2 |
| Europa | 7 | +5 |
| África | 6 | +3 |
| Ásia | 12 | +7 |
| Oceania | 4 | +2 |

### América do Norte
Alasca, Mackenzie, Groenlândia, Vancouver, Ottawa, Labrador, Califórnia, Nova York e México.

### América do Sul
Venezuela, Peru, Brasil e Argentina.

### Europa
Islândia, Inglaterra, França, Alemanha, Polônia, Suécia e Moscou.

### África
Argélia, Egito, Sudão, Congo, África do Sul e Madagascar.

### Ásia
Oriente Médio, Aral, Omsk, Dudinka, Sibéria, Tchita, Vladivostok, Mongólia, China, Índia, Vietnã e Japão.

### Oceania
Sumatra, Bornéu, Nova Guiné e Austrália.

As conexões terrestres e rotas marítimas ficam em `src/data/warMapData.ts`.

## 4. Jogadores

A partida suporta de **2 a 6 jogadores**, nas cores Vermelho, Azul, Verde, Amarelo, Branco e Preto. Cada jogador possui nome, cor, humano/IA, dificuldade, objetivo secreto, cartas, cartas táticas, estado de eliminação e estatísticas.

## 5. Turnos

Cada turno possui três fases:

1. Reforço.
2. Ataque.
3. Remanejamento.

Ao terminar o remanejamento, a vez passa ao próximo general não eliminado.

## 6. Reforços

A regra base é o maior valor entre 3 tropas e metade dos territórios controlados, somando bônus de continentes totalmente controlados e eventuais bônus de eventos.

## 7. Combate

O combate usa dados de 1 a 6, até 3 dados por lado, comparação do maior para o menor e regra configurável de empate. Com `defenderWinsTies` ativado, o defensor vence empates. Fortificações podem aumentar a defesa.

## 8. Remanejamento

O jogador move tropas entre territórios próprios conectados, usando o modal de manobra. A regra de remanejamento pode ser configurada.

## 9. Objetivos secretos clássicos

Inclui objetivos para conquistar combinações de continentes, conquistar 24 territórios e conquistar 18 territórios mantendo pelo menos 2 exércitos em cada um.

## 10. Objetivos de eliminar uma cor

Existem objetivos para eliminar completamente Amarelo, Azul, Branco, Preto, Vermelho e Verde. Se o alvo for a própria cor ou não estiver na partida, o objetivo usa o fallback de 24 territórios.

## 11. Objetivos personalizados

- **Domínio Insular e Marítimo:** Islândia, Inglaterra, Madagascar, Japão, Sumatra, Bornéu, Nova Guiné e Austrália.
- **Tríade das Grandes Capitais:** Brasil, Moscou e China com pelo menos 4 exércitos em cada uma, além de outros territórios conforme o objetivo.
- **Muralha Continental:** pelo menos 14 territórios com no mínimo 3 exércitos em cada um.

## 12. Editor de mecânicas

As regras configuráveis incluem Nevoeiro de Guerra, Bombardeio Aéreo, Fortificações, Eventos Globais, Cartas Táticas, empate favorável ao defensor, troca progressiva de cartas, Capitais, remanejamento ilimitado, Pactos de Não-Agressão e mínimo de tropas por rodada.

## 13. Cartas de território

Símbolos: círculo, triângulo, quadrado e coringa. A troca progressiva usa 4, 6, 8, 10, 12, 15, 20, 25, 30, 35, 40, 45, 50...

## 14. Cartas táticas

- **Bombardeio Aéreo:** ataque a até 2 conexões, destruindo 1 a 2 tropas sem movimentar soldados.
- **Ataque Aéreo Estratégico:** carta secreta descrita na seção 15.
- **Construir Fortaleza:** fortificação defensiva.
- **Espionagem Militar:** ação de inteligência.
- **Conscrição de Emergência:** +3 exércitos na reserva.
- **Guerra Relâmpago:** bônus ofensivo nos próximos ataques da rodada.
- **Pacto de Não-Agressão:** trégua temporária.

## 15. Ataque Aéreo Estratégico — implementação

No início de cada nova partida, o sistema sorteia **um território secreto do mapa**. O território não é revelado. O jogador só descobre a região quando a conquista. Ao descobrir, recebe a carta `tac_strategic_air_strike`.

Para usar a carta:

1. O jogador precisa possuir a carta.
2. Escolhe uma região própria com **pelo menos 20 exércitos**.
3. Escolhe qualquer território inimigo do mapa, sem exigir conexão.
4. Escolhe entre 20 e todos os exércitos disponíveis na origem.
5. `floor(contingente / 2)` é perdido como custo da operação.
6. O restante forma a força de batalha.
7. A batalha usa os **dados normais** do combate e a regra normal de empate.
8. A carta não garante vitória.
9. Se vencer, os sobreviventes ocupam o território alvo.
10. Se perder ou recuar, os sobreviventes retornam à origem; o custo da operação permanece perdido.
11. Não existe obrigação de deixar 1 exército na origem nessa operação.
12. A carta é consumida quando a operação é lançada.

A implementação adiciona seleção de origem, seleção de alvo global, configuração do contingente, custo de operação e integração com o modal de combate normal.

## 16. Eventos globais

Eventos cadastrados: Inverno Siberiano Severo, Crise no Canal de Suez, Remessa Aliada de Armamentos, Insurreição Popular e Monções Tropicais no Sudeste Asiático.

## 17. Nevoeiro de guerra

Quando ativado, o jogador enxerga seus territórios e os territórios vizinhos conforme a lógica de revelação atual.

## 18. IA

A IA atual distribui reforços, escolhe fronteiras, executa ataques simples quando possui vantagem e passa ao remanejamento. A estratégia pode evoluir para considerar objetivos secretos, risco, continentes, defesa, cartas, diplomacia, eventos e planejamento de vários turnos.

## 19. Registro da guerra

O histórico registra ataques, conquistas, reforços, cartas, eliminações, eventos e mecânicas especiais.

## 20. Vitória

Ao concluir o objetivo secreto, o jogador recebe a tela de vitória com vencedor, objetivo, duração, estatísticas, animação, confetes, som e opção de nova partida.

## 21. Interface e arquitetura

A aplicação separa mapa, HUD, combate, remanejamento, cartas, objetivos, configuração, modais, som, dados e tipos. A maior parte da lógica da partida está em `src/App.tsx`.

## 22. Estrutura principal

```text
src/
├── App.tsx
├── main.tsx
├── index.css
├── components/
│   ├── Cards/
│   ├── Combat/
│   ├── HUD/
│   ├── Map/
│   ├── Modals/
│   ├── Objective/
│   └── Setup/
├── data/
│   ├── mechanicsData.ts
│   ├── objectivesData.ts
│   └── warMapData.ts
├── sound/
│   └── audio.ts
└── types/
    └── war.ts
```

## 23. Pontos conhecidos para evolução

A dependência do Gemini está preparada, mas a integração efetiva ainda não é usada. Algumas mecânicas podem receber implementação mais profunda e a IA ainda é simples. A lógica poderá ser separada futuramente em módulos de combate, turnos, reforços, objetivos, cartas, eventos, IA e vitória.

## 24. Rodar no PC

Pré-requisito: **Node.js**.

Na pasta do projeto:

```bash
npm install
npm run dev
```

Depois abra o endereço local informado pelo Vite, normalmente `http://localhost:3000`.

Para verificar TypeScript:

```bash
npm run lint
```

Para criar a versão de produção:

```bash
npm run build
```

## 25. Objetivo final

Transformar o projeto em um **WAR digital altamente configurável**, mantendo a base do mapa clássico e permitindo novas regras e mecânicas sem limitar a experiência às regras tradicionais.
