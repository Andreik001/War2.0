# Ataque Aéreo Estratégico

Esta documentação registra a mecânica implementada no projeto local e os arquivos envolvidos.

## Regra

1. No começo de cada partida é sorteado um território secreto.
2. O território não é revelado.
3. O jogador só descobre o segredo quando conquista esse território.
4. Ao descobrir, recebe a carta `tac_strategic_air_strike`.
5. A origem precisa ter pelo menos 20 exércitos.
6. O jogador escolhe de 20 até o total disponível na origem.
7. Metade do contingente escolhido (`floor(n / 2)`) é perdida como custo da operação.
8. O restante participa de um combate normal pelos dados.
9. O alvo pode ser qualquer território inimigo do mapa, sem necessidade de conexão.
10. A carta não garante vitória.
11. Se o atacante vencer, os sobreviventes ocupam o alvo.
12. Se o atacante perder ou recuar, os sobreviventes retornam à origem e somente o custo da operação permanece perdido.
13. Não há obrigação de deixar 1 exército na origem nessa operação.
14. A carta é consumida ao iniciar a operação.

## Fluxo da interface

**Táticas → Ataque Aéreo Estratégico → escolher origem (20+) → escolher qualquer inimigo → escolher contingente → iniciar batalha → dados normais.**

## Arquivos principais

- `src/data/mechanicsData.ts` — cadastro da carta e seu efeito.
- `src/types/war.ts` — tipo do efeito `strategic_air_strike`.
- `src/components/Modals/StrategicAirStrikeModal.tsx` — escolha do contingente e visualização do custo.
- `src/components/Modals/TacticalCardsModal.tsx` — exibe somente as cartas possuídas.
- `src/components/Combat/CombatModal.tsx` — combate normal recebe a força de batalha da operação.
- `src/App.tsx` — sorteio secreto, descoberta, seleção de origem/alvo, consumo da carta e resolução.

## Observação

O ZIP completo atualizado enviado nesta conversa contém a versão integrada de todos esses arquivos e do restante do jogo. Esta página existe para deixar a regra registrada no repositório mesmo enquanto a árvore completa do projeto é sincronizada.
