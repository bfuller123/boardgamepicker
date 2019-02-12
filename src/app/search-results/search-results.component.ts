import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  @Input() gameResults: any;

  constructor() { }

  ngOnInit() {
    this.gameResults = this.findMatchingGames(6, 500);
  }

  findMatchingGames(playerCount: number, length: number) {
    const result = this.gameResults.filter(game => {
      return game.maxplayers['_attributes'].value >= playerCount && game.minplayers['_attributes'].value <= playerCount;
    });

    console.log('Filtered');
    console.log(result);

    return result;
  }

}
