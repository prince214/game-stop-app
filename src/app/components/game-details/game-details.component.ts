import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {

  gameRating = 0;
  gameId!: number;
  game!: Game;
  private routeSub!: Subscription;
  private gameSub!: Subscription;
  
  constructor(private activedRoute: ActivatedRoute,private httpService: HttpService) { }

  ngOnInit(): void {
    this.routeSub = this.activedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id']
      this.getGameDetails(this.gameId);
    })
  }

  getGameDetails(id: number): void {
    this.gameSub = this.httpService.getGameDetails(id)
                        .subscribe((gameResp: Game) => {
                          this.game = gameResp;
                          setTimeout(() => {
                            this.gameRating = this.game.metacritic
                          }, 1000);
                        })
  }

  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 30) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }


}
