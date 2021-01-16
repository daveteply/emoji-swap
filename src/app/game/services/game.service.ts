import { Injectable } from '@angular/core';
import { EmojiList } from '../emoji-data';
import { MATCH_MINIUM_LENGTH } from '../game-constants';
import { GameBoard } from '../models/game-board';
import { GameTile } from '../models/game-tile';
import { GameUtilityService } from './game-utility.service';

enum Direction {
  N,
  NE,
  E,
  SE,
  S,
  SW,
  W,
  NW,
}
const cardinalDirections = [
  Direction.N,
  Direction.E,
  Direction.S,
  Direction.W,
] as const;
const allDirections = [
  Direction.N,
  Direction.NE,
  Direction.E,
  Direction.SE,
  Direction.S,
  Direction.SW,
  Direction.W,
  Direction.NW,
];

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private candidateMatches: Array<GameTile> = new Array<GameTile>();
  private matchSets: Array<Array<GameTile>> = [];
  private potentialMatchSets: Array<Array<GameTile>> = [];

  get currentMatchSets(): Array<Array<GameTile>> {
    return this.matchSets;
  }

  get currentPotentialMatches(): Array<Array<GameTile>> {
    return this.potentialMatchSets;
  }

  constructor(private gameUtilityService: GameUtilityService) {}

  public CreateGame(
    rowCount: number,
    columnCount: number,
    level: number
  ): GameBoard {
    const gameBoard: GameBoard = { grid: [] };
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      // new row
      gameBoard.grid[rowIndex] = new Array<GameTile>();
      for (let colIndex = 0; colIndex < columnCount; colIndex++) {
        // grab a random entry
        const tile = this.NewTile(rowIndex, colIndex, level);
        gameBoard.grid[rowIndex][colIndex] = tile;
      }
    }

    return gameBoard;
  }

  public NewTile(rowIndex: number, colIndex: number, level: number): GameTile {
    const levelEmojis = EmojiList.list.find((l) => l.level === level);
    const emoji =
      levelEmojis?.emojis[
        Math.floor(Math.random() * levelEmojis?.emojis?.length)
      ];
    // merge it with more value
    const tile = Object.assign(
      {
        colInx: colIndex,
        rowInx: rowIndex,
        html: `&#x${emoji?.code};`,
        score: { baseScore: 0 },
        isNew: Math.floor(Math.random() * 5),
      },
      emoji
    );
    return tile;
  }

  public ReIndexGrid(gameBoard: GameBoard): void {
    gameBoard?.grid?.forEach((row, rowInx) => {
      row.forEach((tile, colInx) => {
        gameBoard.grid[rowInx][colInx].colInx = colInx;
        gameBoard.grid[rowInx][colInx].rowInx = rowInx;

        gameBoard.grid[rowInx][colInx].matched = false;
        gameBoard.grid[rowInx][colInx].potential = false;

        gameBoard.grid[rowInx][colInx].score = { baseScore: 0 };

        gameBoard.grid[rowInx][colInx].animateSlideUp = false;
        gameBoard.grid[rowInx][colInx].animateSlideRight = false;
        gameBoard.grid[rowInx][colInx].animateSlideDown = false;
        gameBoard.grid[rowInx][colInx].animateSlideLeft = false;

        gameBoard.grid[rowInx][colInx].animateShutter = false;
        gameBoard.grid[rowInx][colInx].potential = false;
        gameBoard.grid[rowInx][colInx].isNew = 0;
      });
    });
  }

  public FindMatchesAndPotentials(gameBoard: GameBoard): void {
    this.candidateMatches = [];
    this.matchSets = [];
    this.potentialMatchSets = [];

    gameBoard?.grid?.forEach((row) => {
      row.forEach((tile) => {
        // search by direction
        cardinalDirections.forEach((dir) => {
          // start with new candidate list for each tile before testing matches
          this.candidateMatches = [Object.assign({}, tile)];
          this.directionalSearch(dir, tile, gameBoard);

          if (this.candidateMatches.length >= MATCH_MINIUM_LENGTH) {
            this.candidateMatches.forEach((candidateMatch) => {
              gameBoard.grid[candidateMatch.rowInx][
                candidateMatch.colInx
              ].matched = true;
            });

            // de-dup other match sets
            if (
              !this.candidateMatches.every((t) => {
                return t.matched;
              })
            ) {
              this.matchSets.push([...this.candidateMatches]);
            }
          }
        });

        // check for staggered potentials
        this.potentialSearchStaggered(tile, gameBoard);
      });
    });
  }

  private directionalSearch(
    dir: Direction,
    tile: GameTile,
    gameBoard: GameBoard
  ): void {
    // set direction
    let nextRowInx = tile.rowInx;
    let nextColInx = tile.colInx;

    switch (dir) {
      case Direction.N:
        nextRowInx = tile.rowInx - 1;
        break;
      case Direction.E:
        nextColInx = tile.colInx + 1;
        break;
      case Direction.S:
        nextRowInx = tile.rowInx + 1;
        break;
      case Direction.W:
        nextColInx = tile.colInx - 1;
    }

    if (
      !this.gameUtilityService.WithinGrid(nextRowInx, nextColInx, gameBoard)
    ) {
      return;
    }

    const nextTile = gameBoard.grid[nextRowInx][nextColInx];

    if (nextTile.code === tile.code) {
      this.candidateMatches.push(Object.assign({}, nextTile));
      this.directionalSearch(dir, nextTile, gameBoard);
    } else {
      if (this.candidateMatches.length === MATCH_MINIUM_LENGTH - 1) {
        // check for potentials
        this.potentialSearch(tile, gameBoard);
        this.potentialExtended(dir, tile, gameBoard);
        return;
      }
    }
  }

  // |X|X|c|
  // |a|b|X|
  private potentialSearch(tile: GameTile, gameBoard: GameBoard): void {
    // check each surrounding tile; skip the 'start' of the search
    let nextRowInx = 0;
    let nextColInx = 0;

    for (const dir of allDirections) {
      switch (dir) {
        case Direction.N:
          nextRowInx = tile.rowInx - 1;
          break;
        case Direction.NE:
          nextRowInx = tile.rowInx - 1;
          nextColInx = tile.colInx + 1;
          break;
        case Direction.E:
          nextColInx = tile.colInx + 1;
          break;
        case Direction.SE:
          nextRowInx = tile.rowInx + 1;
          nextColInx = tile.colInx + 1;
          break;
        case Direction.S:
          nextRowInx = tile.rowInx + 1;
          break;
        case Direction.SW:
          nextRowInx = tile.rowInx + 1;
          nextColInx = tile.colInx - 1;
          break;
        case Direction.W:
          nextColInx = tile.colInx - 1;
          break;
        case Direction.NW:
          nextRowInx = tile.rowInx - 1;
          nextColInx = tile.colInx - 1;
          break;
      }

      if (
        this.gameUtilityService.WithinGrid(nextRowInx, nextColInx, gameBoard)
      ) {
        const nextTile = gameBoard.grid[nextRowInx][nextColInx];

        // skip original tile from current direction
        const initialTile = this.candidateMatches[0];
        if (
          nextTile &&
          nextTile.rowInx !== initialTile.rowInx &&
          nextTile.colInx !== initialTile.colInx
        ) {
          if (nextTile.code === tile.code) {
            this.potentialMatchSets.push([...this.candidateMatches, nextTile]);
            // only concerned with a single potential match
            return;
          }
        }
      }
    }
  }

  // |X|X||a|X|
  private potentialExtended(
    dir: Direction,
    tile: GameTile,
    gameBoard: GameBoard
  ): void {
    // set direction
    let nextRowInx = tile.rowInx;
    let nextColInx = tile.colInx;

    switch (dir) {
      case Direction.N:
        nextRowInx = tile.rowInx - 2;
        break;
      case Direction.E:
        nextColInx = tile.colInx + 2;
        break;
      case Direction.S:
        nextRowInx = tile.rowInx + 2;
        break;
      case Direction.W:
        nextColInx = tile.colInx - 2;
    }

    if (this.gameUtilityService.WithinGrid(nextRowInx, nextColInx, gameBoard)) {
      const nextTile = gameBoard.grid[nextRowInx][nextColInx];
      if (this.candidateMatches.every((c) => c.code === nextTile.code)) {
        this.potentialMatchSets.push([...this.candidateMatches, nextTile]);
      }
    }
  }

  // |X|a|X|
  // |b|X|c|
  private potentialSearchStaggered(tile: GameTile, gameBoard: GameBoard): void {
    const potentials: Array<GameTile> = new Array<GameTile>();

    let nextRowInx = 0;
    let nextColInx = 0;

    cardinalDirections.forEach((dir) => {
      nextRowInx = tile.rowInx;
      nextColInx = tile.colInx;
      switch (dir) {
        case Direction.N:
          nextRowInx = tile.rowInx - 1;
          break;
        case Direction.E:
          nextColInx = tile.colInx + 1;
          break;
        case Direction.S:
          nextRowInx = tile.rowInx + 1;
          break;
        case Direction.W:
          nextColInx = tile.colInx - 1;
          break;
      }

      if (
        this.gameUtilityService.WithinGrid(nextRowInx, nextColInx, gameBoard)
      ) {
        const nextTile = gameBoard.grid[nextRowInx][nextColInx];
        potentials.push(nextTile);
      }
    });

    if (potentials.length >= MATCH_MINIUM_LENGTH) {
      for (let i = 0; i < potentials.length; i++) {
        const targetCode = potentials[i]?.code;
        const targets = potentials.filter((f) => f?.code === targetCode);
        if (targets.length >= MATCH_MINIUM_LENGTH) {
          this.potentialMatchSets.push(targets);
          return;
        }
      }
    }
  }
}
