import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../core/model/Game';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Player } from '../core/model/Player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {
  public game?: Game;
  public gameForm: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.gameForm = this.fb.group({
      throws: this.fb.array([
        new FormControl('', Validators.required),
        new FormControl('', Validators.required),
        new FormControl('', Validators.required)
      ])
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let players = params['players'] as string[];
      let maxPoint = params['point'];
      this.game = new Game(maxPoint);
      players.forEach((player) => this.game?.addPlayer(new Player(player, maxPoint)));
    });
  }

  public play(): void {
    if (this.gameForm.valid) {
      let score = 0;
      this.throws.controls.forEach((launch) => score += Number.parseFloat(launch.value));
      this.game?.play(score);
      this.gameForm.reset();
    }
  }

  get throws(): FormArray {
    return this.gameForm.controls['throws'] as FormArray;
  }
}
