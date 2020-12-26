import { TestBed } from '@angular/core/testing';
import { GameBoard } from '../models/game-board';

import { GameService } from './game.service';

const demoralizeGameBoard = (gameBoard: GameBoard): GameBoard => {
  const gBoard = Object.assign({}, gameBoard);
  gBoard.grid.forEach((row, x) => {
    row.forEach((tile, y) => {
      tile.html = '';
      tile.title = '';
      tile.code = 'CODE' + x + y;
    });
  });
  return gBoard;
};

describe('GameService', () => {
  const rowCount = 7;
  const columnCount = 5;
  let gameService: GameService;
  let mockBoard: GameBoard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    gameService = TestBed.inject(GameService);
    const testBoard = gameService.CreateGame(rowCount, columnCount, 1);
    mockBoard = demoralizeGameBoard(testBoard);
  });

  it('should be created', () => {
    expect(gameService).toBeTruthy();
  });

  describe('match sets', () => {
    it('none', () => {
      gameService.FindMatchesAndPotentials(mockBoard);
      const matchSets = gameService.currentMatchSets;
      expect(matchSets).toBeTruthy();
      expect(matchSets.length).toBe(0);
    });

    describe('horizontal', () => {
      describe('do not match 2', () => {
        it('first', () => {
          mockBoard.grid[0][0].code = 'A';
          mockBoard.grid[0][1].code = 'A';
          gameService.FindMatchesAndPotentials(mockBoard);
          const matchSets = gameService.currentMatchSets;
          expect(matchSets.length).toBe(0);
        });
        it('last', () => {
          mockBoard.grid[0][3].code = 'A';
          mockBoard.grid[0][4].code = 'A';
          gameService.FindMatchesAndPotentials(mockBoard);
          const matchSets = gameService.currentMatchSets;
          expect(matchSets.length).toBe(0);
        });
      });

      describe('match 3', () => {
        describe('1st row', () => {
          it('first', () => {
            mockBoard.grid[0][0].code = 'A';
            mockBoard.grid[0][1].code = 'A';
            mockBoard.grid[0][2].code = 'A';
            gameService.FindMatchesAndPotentials(mockBoard);
            const matchSets = gameService.currentMatchSets;
            expect(matchSets.length).toBe(1);
          });

          it('skip first', () => {
            mockBoard.grid[0][1].code = 'A';
            mockBoard.grid[0][2].code = 'A';
            mockBoard.grid[0][3].code = 'A';
            gameService.FindMatchesAndPotentials(mockBoard);
            const matchSets = gameService.currentMatchSets;
            expect(matchSets.length).toBe(1);
          });

          it('end of row', () => {
            mockBoard.grid[0][2].code = 'A';
            mockBoard.grid[0][3].code = 'A';
            mockBoard.grid[0][4].code = 'A';
            gameService.FindMatchesAndPotentials(mockBoard);
            const matchSets = gameService.currentMatchSets;
            expect(matchSets.length).toBe(1);
          });
        });

        describe('2nd row', () => {
          it('first', () => {
            mockBoard.grid[1][0].code = 'A';
            mockBoard.grid[1][1].code = 'A';
            mockBoard.grid[1][2].code = 'A';
            gameService.FindMatchesAndPotentials(mockBoard);
            const matchSets = gameService.currentMatchSets;
            expect(matchSets.length).toBe(1);
          });

          it('skip first', () => {
            mockBoard.grid[1][1].code = 'A';
            mockBoard.grid[1][2].code = 'A';
            mockBoard.grid[1][3].code = 'A';
            gameService.FindMatchesAndPotentials(mockBoard);
            const matchSets = gameService.currentMatchSets;
            expect(matchSets.length).toBe(1);
          });

          it('end of row', () => {
            mockBoard.grid[1][2].code = 'A';
            mockBoard.grid[1][3].code = 'A';
            mockBoard.grid[1][4].code = 'A';
            gameService.FindMatchesAndPotentials(mockBoard);
            const matchSets = gameService.currentMatchSets;
            expect(matchSets.length).toBe(1);
          });
        });

        describe('bottom row', () => {
          it('first', () => {
            mockBoard.grid[4][0].code = 'A';
            mockBoard.grid[4][1].code = 'A';
            mockBoard.grid[4][2].code = 'A';
            gameService.FindMatchesAndPotentials(mockBoard);
            const matchSets = gameService.currentMatchSets;
            expect(matchSets.length).toBe(1);
          });

          it('skip first', () => {
            mockBoard.grid[4][1].code = 'A';
            mockBoard.grid[4][2].code = 'A';
            mockBoard.grid[4][3].code = 'A';
            gameService.FindMatchesAndPotentials(mockBoard);
            const matchSets = gameService.currentMatchSets;
            expect(matchSets.length).toBe(1);
          });

          it('end of row', () => {
            mockBoard.grid[4][2].code = 'A';
            mockBoard.grid[4][3].code = 'A';
            mockBoard.grid[4][4].code = 'A';
            gameService.FindMatchesAndPotentials(mockBoard);
            const matchSets = gameService.currentMatchSets;
            expect(matchSets.length).toBe(1);
          });

          it('end of row further', () => {
            mockBoard.grid[5][2].code = 'A';
            mockBoard.grid[5][3].code = 'A';
            mockBoard.grid[5][4].code = 'A';
            gameService.FindMatchesAndPotentials(mockBoard);
            const matchSets = gameService.currentMatchSets;
            expect(matchSets.length).toBe(1);
          });
        });
      });

      describe('match 4', () => {
        describe('1st row', () => {
          it('first', () => {
            mockBoard.grid[0][0].code = 'A';
            mockBoard.grid[0][1].code = 'A';
            mockBoard.grid[0][2].code = 'A';
            mockBoard.grid[0][3].code = 'A';
            gameService.FindMatchesAndPotentials(mockBoard);
            const matchSets = gameService.currentMatchSets;
            expect(matchSets.length).toBe(1);
            expect(matchSets[0].length).toBe(4);
          });
          it('last', () => {
            mockBoard.grid[0][1].code = 'A';
            mockBoard.grid[0][2].code = 'A';
            mockBoard.grid[0][3].code = 'A';
            mockBoard.grid[0][4].code = 'A';
            gameService.FindMatchesAndPotentials(mockBoard);
            const matchSets = gameService.currentMatchSets;
            expect(matchSets.length).toBe(1);
            expect(matchSets[0].length).toBe(4);
          });
        });

        describe('middle row', () => {
          it('first', () => {
            mockBoard.grid[2][0].code = 'A';
            mockBoard.grid[2][1].code = 'A';
            mockBoard.grid[2][2].code = 'A';
            mockBoard.grid[2][3].code = 'A';
            gameService.FindMatchesAndPotentials(mockBoard);
            const matchSets = gameService.currentMatchSets;
            expect(matchSets.length).toBe(1);
            expect(matchSets[0].length).toBe(4);
          });
          it('last', () => {
            mockBoard.grid[2][1].code = 'A';
            mockBoard.grid[2][2].code = 'A';
            mockBoard.grid[2][3].code = 'A';
            mockBoard.grid[2][4].code = 'A';
            gameService.FindMatchesAndPotentials(mockBoard);
            const matchSets = gameService.currentMatchSets;
            expect(matchSets.length).toBe(1);
            expect(matchSets[0].length).toBe(4);
          });
        });

        describe('bottom row', () => {
          it('first', () => {
            mockBoard.grid[4][0].code = 'A';
            mockBoard.grid[4][1].code = 'A';
            mockBoard.grid[4][2].code = 'A';
            mockBoard.grid[4][3].code = 'A';
            gameService.FindMatchesAndPotentials(mockBoard);
            const matchSets = gameService.currentMatchSets;
            expect(matchSets.length).toBe(1);
            expect(matchSets[0].length).toBe(4);
          });
          it('last', () => {
            mockBoard.grid[4][1].code = 'A';
            mockBoard.grid[4][2].code = 'A';
            mockBoard.grid[4][3].code = 'A';
            mockBoard.grid[4][4].code = 'A';
            gameService.FindMatchesAndPotentials(mockBoard);
            const matchSets = gameService.currentMatchSets;
            expect(matchSets.length).toBe(1);
            expect(matchSets[0].length).toBe(4);
          });
        });
      });

      describe('match 5', () => {
        it('1st row', () => {
          mockBoard.grid[0][0].code = 'A';
          mockBoard.grid[0][1].code = 'A';
          mockBoard.grid[0][2].code = 'A';
          mockBoard.grid[0][3].code = 'A';
          mockBoard.grid[0][4].code = 'A';
          gameService.FindMatchesAndPotentials(mockBoard);
          const matchSets = gameService.currentMatchSets;
          expect(matchSets.length).toBe(1);
          expect(matchSets[0].length).toBe(5);
        });

        it('2nd row', () => {
          mockBoard.grid[2][0].code = 'A';
          mockBoard.grid[2][1].code = 'A';
          mockBoard.grid[2][2].code = 'A';
          mockBoard.grid[2][3].code = 'A';
          mockBoard.grid[2][4].code = 'A';
          gameService.FindMatchesAndPotentials(mockBoard);
          const matchSets = gameService.currentMatchSets;
          expect(matchSets.length).toBe(1);
          expect(matchSets[0].length).toBe(5);
        });

        it('bottom row', () => {
          mockBoard.grid[4][0].code = 'A';
          mockBoard.grid[4][1].code = 'A';
          mockBoard.grid[4][2].code = 'A';
          mockBoard.grid[4][3].code = 'A';
          mockBoard.grid[4][4].code = 'A';
          gameService.FindMatchesAndPotentials(mockBoard);
          const matchSets = gameService.currentMatchSets;
          expect(matchSets.length).toBe(1);
          expect(matchSets[0].length).toBe(5);
        });
      });

      describe('match 3 multiple of same', () => {
        it('test 1', () => {
          mockBoard.grid[0][0].code = 'A';
          mockBoard.grid[0][1].code = 'A';
          mockBoard.grid[0][2].code = 'A';

          mockBoard.grid[2][2].code = 'A';
          mockBoard.grid[2][3].code = 'A';
          mockBoard.grid[2][4].code = 'A';
          gameService.FindMatchesAndPotentials(mockBoard);
          const matchSets = gameService.currentMatchSets;
          expect(matchSets.length).toBe(2);
        });

        it('test 1', () => {
          mockBoard.grid[0][0].code = 'A';
          mockBoard.grid[0][1].code = 'A';
          mockBoard.grid[0][2].code = 'A';

          mockBoard.grid[4][2].code = 'A';
          mockBoard.grid[4][3].code = 'A';
          mockBoard.grid[4][4].code = 'A';
          gameService.FindMatchesAndPotentials(mockBoard);
          const matchSets = gameService.currentMatchSets;
          expect(matchSets.length).toBe(2);
        });
      });

      describe('match 3 multiple different', () => {
        it('test 1', () => {
          mockBoard.grid[0][0].code = 'A';
          mockBoard.grid[0][1].code = 'A';
          mockBoard.grid[0][2].code = 'A';

          mockBoard.grid[2][2].code = 'B';
          mockBoard.grid[2][3].code = 'B';
          mockBoard.grid[2][4].code = 'B';
          gameService.FindMatchesAndPotentials(mockBoard);
          const matchSets = gameService.currentMatchSets;
          expect(matchSets.length).toBe(2);
        });

        it('test 1', () => {
          mockBoard.grid[0][0].code = 'A';
          mockBoard.grid[0][1].code = 'A';
          mockBoard.grid[0][2].code = 'A';

          mockBoard.grid[4][2].code = 'C';
          mockBoard.grid[4][3].code = 'C';
          mockBoard.grid[4][4].code = 'C';
          gameService.FindMatchesAndPotentials(mockBoard);
          const matchSets = gameService.currentMatchSets;
          expect(matchSets.length).toBe(2);
        });
      });
    });

    describe('vertical', () => {
      describe('do not match 2', () => {
        it('first', () => {
          mockBoard.grid[0][0].code = 'A';
          mockBoard.grid[1][0].code = 'A';
          gameService.FindMatchesAndPotentials(mockBoard);
          const matchSets = gameService.currentMatchSets;
          expect(matchSets.length).toBe(0);
        });
        it('last', () => {
          mockBoard.grid[3][0].code = 'A';
          mockBoard.grid[4][0].code = 'A';
          gameService.FindMatchesAndPotentials(mockBoard);
          const matchSets = gameService.currentMatchSets;
          expect(matchSets.length).toBe(0);
        });
      });

      describe('match 3', () => {
        describe('1st row', () => {
          it('first', () => {
            mockBoard.grid[0][0].code = 'A';
            mockBoard.grid[1][0].code = 'A';
            mockBoard.grid[2][0].code = 'A';
            gameService.FindMatchesAndPotentials(mockBoard);
            const matchSets = gameService.currentMatchSets;
            expect(matchSets.length).toBe(1);
          });

          it('skip first', () => {
            mockBoard.grid[1][0].code = 'A';
            mockBoard.grid[2][0].code = 'A';
            mockBoard.grid[3][0].code = 'A';
            gameService.FindMatchesAndPotentials(mockBoard);
            const matchSets = gameService.currentMatchSets;
            expect(matchSets.length).toBe(1);
          });

          it('end of row', () => {
            mockBoard.grid[2][0].code = 'A';
            mockBoard.grid[3][0].code = 'A';
            mockBoard.grid[4][0].code = 'A';
            gameService.FindMatchesAndPotentials(mockBoard);
            const matchSets = gameService.currentMatchSets;
            expect(matchSets.length).toBe(1);
          });
        });
      });

      describe('match 4', () => {
        describe('middle column', () => {
          it('first', () => {
            mockBoard.grid[0][3].code = 'A';
            mockBoard.grid[1][3].code = 'A';
            mockBoard.grid[2][3].code = 'A';
            mockBoard.grid[3][3].code = 'A';
            gameService.FindMatchesAndPotentials(mockBoard);
            const matchSets = gameService.currentMatchSets;
            expect(matchSets.length).toBe(1);
            expect(matchSets[0].length).toBe(4);
          });
          it('last', () => {
            mockBoard.grid[1][4].code = 'A';
            mockBoard.grid[2][4].code = 'A';
            mockBoard.grid[3][4].code = 'A';
            mockBoard.grid[4][4].code = 'A';
            gameService.FindMatchesAndPotentials(mockBoard);
            const matchSets = gameService.currentMatchSets;
            expect(matchSets.length).toBe(1);
            expect(matchSets[0].length).toBe(4);
          });
        });
      });

      describe('match 5', () => {
        it('2nd column', () => {
          mockBoard.grid[0][2].code = 'A';
          mockBoard.grid[1][2].code = 'A';
          mockBoard.grid[2][2].code = 'A';
          mockBoard.grid[3][2].code = 'A';
          mockBoard.grid[4][2].code = 'A';
          gameService.FindMatchesAndPotentials(mockBoard);
          const matchSets = gameService.currentMatchSets;
          expect(matchSets.length).toBe(1);
          expect(matchSets[0].length).toBe(5);
        });
      });
    });
  });

  describe('potential match sets', () => {
    it('none', () => {
      gameService.FindMatchesAndPotentials(mockBoard);
      const potentialMatches = gameService.currentPotentialMatches;
      expect(potentialMatches).toBeTruthy();
      expect(potentialMatches.length).toBe(0);
    });

    it('1 potential', () => {
      mockBoard.grid[0][2].code = 'A';
      mockBoard.grid[1][2].code = 'A';
      mockBoard.grid[2][1].code = 'A';
      gameService.FindMatchesAndPotentials(mockBoard);
      const potentialMatches = gameService.currentPotentialMatches;
      expect(potentialMatches.length).toBe(1);
    });

    it('1 potential extra', () => {
      mockBoard.grid[1][1].code = 'A';
      mockBoard.grid[1][2].code = 'A';
      mockBoard.grid[1][4].code = 'A';
      gameService.FindMatchesAndPotentials(mockBoard);
      const potentialMatches = gameService.currentPotentialMatches;
      expect(potentialMatches.length).toBe(1);
    });

    it('2 potentials', () => {
      mockBoard.grid[1][1].code = 'A';
      mockBoard.grid[1][2].code = 'A';
      mockBoard.grid[0][3].code = 'A';

      mockBoard.grid[3][2].code = 'B';
      mockBoard.grid[4][3].code = 'B';
      mockBoard.grid[4][4].code = 'B';

      gameService.FindMatchesAndPotentials(mockBoard);
      const potentialMatches = gameService.currentPotentialMatches;
      expect(potentialMatches.length).toBe(2);
    });

    it('apply', () => {
      mockBoard.grid[1][1].code = 'A';
      mockBoard.grid[1][2].code = 'A';
      mockBoard.grid[0][3].code = 'A';

      gameService.FindMatchesAndPotentials(mockBoard);
      const potentialMatches = gameService.currentPotentialMatches;
      expect(potentialMatches.length).toBe(1);

      expect(mockBoard.grid[1][1].potential).toBeFalsy();

      //gameService.ApplyPotentials(mockBoard, potentialMatches);
      //expect(mockBoard.grid[1][1].potential).toBe(true);
    });

    describe('staggered', () => {
      describe('3 staggered', () => {
        it('upper left', () => {
          mockBoard.grid[0][0].code = 'A';
          mockBoard.grid[1][1].code = 'A';
          mockBoard.grid[0][2].code = 'A';
          gameService.FindMatchesAndPotentials(mockBoard);
          const potentialMatches = gameService.currentPotentialMatches;
          expect(potentialMatches.length).toBe(1);
        });
        it('bottom right', () => {
          mockBoard.grid[2][3].code = 'A';
          mockBoard.grid[3][4].code = 'A';
          mockBoard.grid[4][3].code = 'A';
          gameService.FindMatchesAndPotentials(mockBoard);
          const potentialMatches = gameService.currentPotentialMatches;
          expect(potentialMatches.length).toBe(1);
        });
        it('middle', () => {
          mockBoard.grid[1][1].code = 'A';
          mockBoard.grid[2][2].code = 'A';
          mockBoard.grid[1][3].code = 'A';
          gameService.FindMatchesAndPotentials(mockBoard);
          const potentialMatches = gameService.currentPotentialMatches;
          expect(potentialMatches.length).toBe(1);
        });
      });
      describe('4 staggered', () => {
        it('middle', () => {
          mockBoard.grid[1][2].code = 'A';
          mockBoard.grid[2][1].code = 'A';
          mockBoard.grid[2][3].code = 'A';
          mockBoard.grid[3][2].code = 'A';
          gameService.FindMatchesAndPotentials(mockBoard);
          const potentialMatches = gameService.currentPotentialMatches;
          expect(potentialMatches.length).toBe(1);
        });
      });
    });
  });

  describe('scoring', () => {
    it('tally scoring', () => {
      mockBoard.grid[0][2].code = 'A';
      mockBoard.grid[1][2].code = 'A';
      mockBoard.grid[2][2].code = 'A';
      gameService.FindMatchesAndPotentials(mockBoard);
      const matchSets = gameService.currentMatchSets;
      //gameService.ApplyScoring(mockBoard, matchSets);
      //const tally = gameService.TallyScore(mockBoard);
      //expect(tally).toBe(9);
    });
  });
});
