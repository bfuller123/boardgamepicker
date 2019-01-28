import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.scss']
})
export class SearchresultComponent implements OnInit {

  @Input() game: any;
  name: string;
  timeMin: string;
  timeMax: string;
  image: string;
  weight: string;
  playerCountMin: string;
  playerCountMax: string;

  constructor() {
  }

  ngOnInit() {
    this.name = this.getName(this.game);
    this.timeMax = this.game.maxplaytime['_attributes'].value;
    this.timeMin = this.game.minplaytime['_attributes'].value;
    this.playerCountMin = this.game.minplayers['_attributes'].value;
    this.playerCountMax = this.game.maxplayers['_attributes'].value;
    this.image = this.game.image['_text'];
  }

  private getName(game: any): string {
    if (Array.isArray(game.name)) {
      return game.name[0]['_attributes'].value;
    } else {
      return game.name['_attributes'].value;
    }
  }

}
