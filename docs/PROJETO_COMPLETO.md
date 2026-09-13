# WAR 2.0 — Especificação Completa do Projeto

## Objetivo

Transformar o projeto em um WAR digital altamente configurável, mantendo o mapa clássico de 42 territórios e permitindo novas regras, objetivos e mecânicas.

## Regras-base

- Mapa com 42 territórios em 6 continentes.
- América do Norte: 9 territórios, bônus +5.
- América do Sul: 4 territórios, bônus +2.
- Europa: 7 territórios, bônus +5.
- África: 6 territórios, bônus +3.
- Ásia: 12 territórios, bônus +7.
- Oceania: 4 territórios, bônus +2.
- 2 a 6 jogadores.
- Cores: vermelho, azul, verde, amarelo, branco e preto.
- Cada jogador pode ser humano ou IA.
- Turnos: reforço, ataque e remanejamento.
- Reforço base: max(3, floor(territórios controlados / 2)) + bônus de continentes + bônus de eventos.
- Combate: até 3 dados por lado, comparação dos maiores dados e regra configurável de empate; defensor vence empates quando `defenderWinsTies` está ativa.
- Remanejamento entre territórios próprios conectados, respeitando a configuração de manobra.

## Objetivos secretos

Objetivos clássicos:
- Conquistar combinações de continentes.
- Conquistar 24 territórios.
- Conquistar 18 territórios mantendo pelo menos 2 exércitos em cada um.

Objetivos de eliminar cor:
- Eliminar completamente amarelo, azul, branco, preto, vermelho ou verde.
- Se a cor-alvo for a própria cor ou não estiver na partida, usar fallback de 24 territórios.

Objetivos personalizados:
- Domínio Insular e Marítimo: Islândia, Inglaterra, Madagascar, Japão, Sumatra, Bornéu, Nova Guiné e Austrália.
- Tríade das Grandes Capitais: Brasil, Moscou e China com pelo menos 4 exércitos em cada uma, além dos demais requisitos do objetivo.
- Muralha Continental: pelo menos 14 territórios com no mínimo 3 exércitos em cada um.

## Mecânicas configuráveis

- Nevoeiro de Guerra.
- Bombardeio Aéreo / Míssil.
- Fortificações.
- Eventos Globais.
- Cartas Táticas.
- Empate favorável ao defensor.
- Troca progressiva de cartas.
- Modo Capitais.
- Remanejamento ilimitado.
- Pactos de Não-Agressão.
- Mínimo de tropas por rodada: 3, 4 ou 5.

## Cartas de território

Símbolos: círculo, triângulo, quadrado e coringa.

Troca progressiva: 4, 6, 8, 10, 12, 15, 20, 25 e depois +5 sucessivamente.

## Cartas táticas

- Bombardeio Aéreo.
- Ataque Aéreo Estratégico.
- Construir Fortaleza.
- Espionagem Militar.
- Conscrição de Emergência.
- Guerra Relâmpago.
- Pacto de Não-Agressão.

A interface de cartas táticas deve mostrar somente as cartas realmente possuídas pelo jogador.

## Ataque Aéreo Estratégico

Esta é uma carta diferente do Bombardeio Aéreo.

### Sorteio secreto

- No início de cada nova partida, o sistema sorteia aleatoriamente um território do mapa como região estratégica secreta.
- O território sorteado muda a cada nova partida.
- Nenhum jogador conhece a localização inicialmente.
- O jogador descobre a região somente quando a conquista.
- Ao conquistar a região secreta, recebe uma carta `tac_strategic_air_strike`.

### Uso da carta

1. O jogador precisa possuir a carta.
2. Deve escolher uma região própria com pelo menos 20 exércitos.
3. Pode escolher qualquer território inimigo do mapa, independentemente de adjacência.
4. Deve escolher um contingente entre 20 e todos os exércitos disponíveis na origem.
5. `floor(contingente / 2)` é perdido imediatamente como custo da operação.
6. O restante do contingente forma a força que participa da batalha.
7. A batalha usa os dados normais e as regras normais de combate.
8. A carta não garante vitória.
9. Se vencer, os sobreviventes ocupam o território inimigo escolhido.
10. Se perder ou recuar, os sobreviventes retornam à região de origem; o custo da operação continua perdido.
11. Não existe regra de deixar 1 exército na origem durante esta operação.
12. A carta é consumida quando a operação é lançada.

### Implementação de interface

A implementação inclui:
- seleção da origem;
- seleção de qualquer alvo inimigo;
- configuração do contingente entre 20 e o disponível;
- cálculo do custo da operação;
- cálculo da força efetiva de batalha;
- integração com o modal normal de combate;
- ocupação automática do alvo pelos sobreviventes em caso de conquista.

## Eventos globais

- Inverno Siberiano Severo.
- Crise no Canal de Suez.
- Remessa Aliada de Armamentos (+2).
- Insurreição Popular.
- Monções Tropicais no Sudeste Asiático.

## Nevoeiro de Guerra

Quando ativado, o jogador vê seus próprios territórios e os territórios revelados pela lógica de vizinhança. Territórios ocultos não devem expor informações de tropas.

## IA

A IA atual distribui reforços, identifica fronteiras, executa ataques simples quando possui vantagem e segue para o remanejamento. Evoluções futuras podem considerar objetivos secretos, risco, continentes, defesa, cartas, diplomacia, eventos e planejamento de vários turnos.

## Registro da guerra

O histórico registra ataques, conquistas, reforços, cartas, eliminações, eventos e mecânicas especiais.

## Vitória

Ao cumprir o objetivo secreto, o jogador recebe a tela de vitória com vencedor, objetivo, duração, estatísticas, animação, confetes, som e opção de iniciar nova partida.

## Arquitetura

```text
src/
├── App.tsx
├── main.tsx
├── index.css
├── components/
│   ├── Cards/CardsModal.tsx
│   ├── Combat/CombatModal.tsx
│   ├── Combat/ManeuverModal.tsx
│   ├── HUD/ActionPanel.tsx
│   ├── HUD/GameHeader.tsx
│   ├── Map/WarBoard.tsx
│   ├── Modals/GameLogModal.tsx
│   ├── Modals/MechanicsEditorModal.tsx
│   ├── Modals/ObjectivesBuilderModal.tsx
│   ├── Modals/StrategicAirStrikeModal.tsx
│   ├── Modals/TacticalCardsModal.tsx
│   ├── Modals/VictoryModal.tsx
│   ├── Objective/ObjectiveModal.tsx
│   └── Setup/GameSetup.tsx
│   ├── data/
│   │   ├── mechanicsData.ts
│   │   ├── objectivesData.ts
│   │   └── warMapData.ts
│   ├── sound/audio.ts
│   └── types/war.ts
```

## Tecnologias

React 19, TypeScript, Vite, Tailwind CSS, Lucide React, Motion, Canvas Confetti, Express/dotenv e dependência preparada para Google GenAI.

## Pontos de evolução

- Integração efetiva do Gemini ainda não está sendo usada pelo jogo.
- A IA pode receber estratégia mais avançada.
- Algumas mecânicas podem receber implementação mais profunda.
- A lógica de `App.tsx` pode futuramente ser separada em módulos de combate, turnos, reforços, objetivos, cartas, eventos, IA e vitória.

## Arquivos enviados/considerados no projeto

`.env.example`, `.gitignore`, `README.md`, `bun.lock`, `index.html`, `metadata.json`, `package.json`, `tsconfig.json`, `vite.config.ts`, `src/App.tsx`, `src/main.tsx`, `src/index.css`, todos os componentes de Cards, Combat, HUD, Map, Modals, Objective e Setup, além de `src/data/mechanicsData.ts`, `src/data/objectivesData.ts`, `src/data/warMapData.ts`, `src/sound/audio.ts` e `src/types/war.ts`.

## Execução

```bash
npm install
npm run dev
```

Produção:

```bash
npm run build
```

Verificação TypeScript/lint, conforme os scripts definidos no `package.json`:

```bash
npm run lint
```

## Regra importante de inventário

A carta `tac_strategic_air_strike` não deve ser entregue automaticamente a todos os jogadores no início da partida. Ela deve ser concedida somente ao jogador que conquistar o território secreto sorteado. As cartas táticas exibidas no modal devem refletir o inventário real do jogador.
