import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html'
})
export class StartComponent implements OnInit {
  public startForm: FormGroup;

  constructor(private fb: FormBuilder, private router : Router) {
    this.startForm = this.fb.group({
      points: new FormControl(false, Validators.required),
      players: this.fb.array([
        new FormControl('', Validators.required),
        new FormControl('', Validators.required)
      ])
    });
  }

  ngOnInit(): void {

  }

  startGame(): void {
    if (this.startForm.valid) {
      let maxPoint = (this.points) ? 501 : 301;
      let players: string[] = [];
      this.players.controls.forEach((player) => players.push(player.value));

      let navigationExtras: NavigationExtras = {
        queryParams: {
          'players': players,
          'point': maxPoint
        }
      };

      this.router.navigate(['game'],  navigationExtras);
    }
  }

  public addPlayer(): void {
    const control = this.players;
    control.push(new FormControl('', Validators.required));
    console.log(control);
  }

  public removePlayer(): void {
    const control = this.players;

    if (control.length > 2) {
      control.removeAt(control.length - 1);
    }
  }

  get players(): FormArray {
    return this.startForm.controls['players'] as FormArray;
  }

  get points(): boolean {
    return (this.startForm.controls['points'] as FormGroup).value;
  }
}
