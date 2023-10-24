export class Player {
  public mName: string;
  public mPoint: number;

  constructor(name: string, point: number) {
    this.mName = name;
    this.mPoint = point;
  }

  public play(point: number): void {
    let newPoint = this.mPoint - point;

    if (newPoint > -1) {
      this.mPoint = newPoint;
    }
  }
}
