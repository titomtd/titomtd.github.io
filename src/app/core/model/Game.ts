import { Player } from './Player';

export class Game {
  private readonly mPlayers: Player[];
  public mMaxPoint: number;

  constructor(maxPoint: number) {
    this.mMaxPoint = maxPoint;
    this.mPlayers = [];
  }

  public addPlayer(player: Player): void {
    this.mPlayers.push(player);
  }

  public play(point: number): void {
    let player = this.mPlayers.shift();
    player?.play(point);
    this.mPlayers.push(player!!);
  }

  public hasWinner(): boolean {
    for (let player of this.players) {
      if (player.mPoint === 0) {
        return true;
      }
    }

    return false;
  }

  get players(): Player[] {
    return this.mPlayers;
  }

  get currentPlayer(): Player {
    return this.mPlayers[0];
  }
}
