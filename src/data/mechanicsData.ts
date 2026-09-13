import type { GameEvent, GameSettings, TacticalCard } from '../types/war';
export const DEFAULT_SETTINGS: GameSettings = { fogOfWar:false, airStrikes:true, fortifications:true, globalEvents:true, tacticalCards:true, defenderWinsTies:true, progressiveCardTrades:true, capitalsMode:false, unlimitedManeuvers:false, alliancePacts:false, minArmiesPlacement:3 };
export const TACTICAL_CARDS: TacticalCard[] = [
{id:'tac_air_strike',name:'Bombardeio Aéreo',description:'Ataque aéreo contra território inimigo conforme as regras de bombardeio.',costArmies:0,icon:'Plane',effect:'air_strike'},
{id:'tac_fortify',name:'Construir Fortaleza',description:'Fortalece uma posição defensiva.',costArmies:0,icon:'Shield',effect:'fortify'},
{id:'tac_espionage',name:'Espionagem Militar',description:'Revela informações sobre território inimigo.',costArmies:0,icon:'Eye',effect:'espionage'},
{id:'tac_emergency',name:'Conscrição de Emergência',description:'Receba reforços emergenciais.',costArmies:0,icon:'Users',effect:'emergency_conscription'},
{id:'tac_blitzkrieg',name:'Blitzkrieg',description:'Permite uma ofensiva rápida.',costArmies:0,icon:'Zap',effect:'blitzkrieg'},
{id:'tac_non_aggression',name:'Pacto de Não-Agressão',description:'Estabelece proteção diplomática temporária.',costArmies:0,icon:'Handshake',effect:'non_aggression'},
{id:'tac_strategic_air_strike',name:'Ataque Aéreo Estratégico',description:'Carta secreta descoberta ao conquistar a região estratégica sorteada. Exige pelo menos 20 exércitos na origem. Escolha de 20 até todos os exércitos disponíveis; metade do contingente escolhido é perdida como custo da operação e o restante participa de uma batalha normal contra qualquer território inimigo do mapa. A carta não garante a vitória e é consumida após o uso.',costArmies:0,icon:'Plane',effect:'strategic_air_strike'}
];
export const GLOBAL_EVENTS: GameEvent[] = [
{id:'siberian_winter',name:'Inverno Siberiano',description:'O frio extremo dificulta operações no norte da Ásia.'},
{id:'suez_crisis',name:'Crise de Suez',description:'Rotas estratégicas são temporariamente afetadas.'},
{id:'allied_arms',name:'Envio de Armas Aliadas',description:'Receba +2 exércitos.'},
{id:'popular_insurrection',name:'Insurreição Popular',description:'Uma revolta altera o equilíbrio local.'},
{id:'tropical_monsoons',name:'Monções Tropicais',description:'As monções reduzem a eficiência ofensiva em regiões tropicais.'}
];
export const CARD_TRADE_VALUES = [4,6,8,10,12,15,20,25];
