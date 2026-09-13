export type PlayerColor = 'red' | 'blue' | 'green' | 'yellow' | 'white' | 'black';
export type GamePhase = 'setup' | 'reinforce' | 'attack' | 'maneuver' | 'victory';
export type TacticalEffect = 'air_strike' | 'fortify' | 'espionage' | 'emergency_conscription' | 'blitzkrieg' | 'non_aggression' | 'strategic_air_strike';
export interface Territory { id:string; name:string; continent:string; owner:string; armies:number; neighbors:string[]; cardSymbol?: 'circle'|'triangle'|'square'|'wildcard'; }
export interface Player { id:string; name:string; color:PlayerColor; territories:string[]; armies:number; tacticalCards:string[]; eliminated?:boolean; }
export interface Objective { id:string; name:string; description:string; type:string; target?:string|string[]; requiredArmies?:number; }
export interface GameSettings { fogOfWar:boolean; airStrikes:boolean; fortifications:boolean; globalEvents:boolean; tacticalCards:boolean; defenderWinsTies:boolean; progressiveCardTrades:boolean; capitalsMode:boolean; unlimitedManeuvers:boolean; alliancePacts:boolean; minArmiesPlacement:number; }
export interface GameEvent { id:string; name:string; description:string; effect?:string; }
export interface LogEntry { id:string; message:string; type:string; timestamp:number; }
export interface TacticalCard { id:string; name:string; description:string; costArmies:number; icon:string; effect:TacticalEffect; }
