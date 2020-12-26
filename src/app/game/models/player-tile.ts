import { PlayerSwipeDirection } from '../services/game-interactions.service';
import { GameTile } from './game-tile';

export interface PlayerTile {
  tile: GameTile;
  direction: PlayerSwipeDirection;
}
