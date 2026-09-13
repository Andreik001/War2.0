export type ContinentId = 
  | 'north_america'
  | 'south_america'
  | 'europe'
  | 'africa'
  | 'asia'
  | 'oceania';

export type CardSymbol = 'circle' | 'triangle' | 'square' | 'joker';

export interface TerritoryDef { id:string; name:string; continent:ContinentId; neighbors:string[]; x:number; y:number; labelOffset?:{x:number;y:number}; pathData?:string; cardSymbol:CardSymbol; }
export interface ContinentDef { id:ContinentId; name:string; bonus:number; color:string; borderColor:string; territoryIds:string[]; }
export type PlayerColor = 'red'|'blue'|'green'|'yellow'|'white'|'black';
export interface PlayerColorInfo { id:PlayerColor; name:string; hex:string; accentHex:string; borderHex:string; badgeHex:string; textHex:string; }
export interface Player { id:string; name:string; color:PlayerColor; isAI:boolean; aiDifficulty?:'easy'|'normal'|'hard'; objectiveId:string; cards:string[]; tacticalCards:string[]; eliminated:boolean; stats:{territoriesLost:number;territoriesConquered:number;armiesDefeated:number;armiesLost:number}; }
export interface TerritoryState { id:string; ownerId:string; armies:number; fortified?:boolean; isCapital?:boolean; underBlockade?:boolean; }
export type TurnPhase='reinforce'|'attack'|'maneuver'|'ended';
export interface CombatState { fromTerritoryId:string; toTerritoryId:string; attackerDice:number[]; defenderDice:number[]; attackerLosses:number; defenderLosses:number; conquered:boolean; isActive:boolean; }
export type ObjectiveConditionType='conquer_continents'|'conquer_territories_count'|'conquer_continents_plus_choice'|'eliminate_color'|'fortified_territories'|'dominate_capitals'|'island_blockade';
export interface SecretObjective { id:string; title:string; description:string; isCustom?:boolean; type:ObjectiveConditionType; params:{continents?:ContinentId[];extraTerritories?:number;totalTerritories?:number;minArmiesPerTerritory?:number;targetColor?:PlayerColor;fallbackTerritoriesCount?:number;requiredTerritories?:string[]}; }
export interface ActiveMechanics { fogOfWar:boolean; airStrikes:boolean; fortifications:boolean; globalEvents:boolean; tacticalCards:boolean; defenderWinsTies:boolean; progressiveCardTrades:boolean; capitalsMode:boolean; unlimitedManeuvers:boolean; alliancePacts:boolean; minArmiesPlacement:number; }
export interface GlobalEvent { id:string; name:string; description:string; icon:string; effect:'freeze_siberia'|'panama_blocked'|'monsoon_india'|'arms_shipment'|'peoples_rebellion'|'peace_accord'; affectedContinent?:ContinentId; durationTurns:number; }
export interface GameLogEntry { id:string; turn:number; text:string; timestamp:string; type:'attack'|'conquest'|'card'|'reinforce'|'elimination'|'event'|'mechanic'; color?:PlayerColor; }
