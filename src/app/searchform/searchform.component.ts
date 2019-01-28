import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const convert = require('xml-js');

@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.scss']
})
export class SearchformComponent implements OnInit {

  weightValues: number[] = [0, 5];
  username: string;
  playerCount: number;
  sessionTime: number;
  private urlBase = 'https://www.boardgamegeek.com/xmlapi2/';
  @Output() resultsReceived = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  findGames() {
    const username = `username=${this.username}`;
    const urlEnd = '&subtype=boardgame&excludessubtype=boardgameexpansion&own=1';
    const collection = 'collection?';
    this.http.get(this.urlBase + collection + username + urlEnd, {responseType: 'text'}).subscribe(results => {
      const resultJson = convert.xml2js(results, {compact: true, spaces: 2});
      this.getGameDetails(resultJson.items.item);
    });
  }

  private getGameDetails(games: any[]) {
    const ids = [];
    const thing = 'thing?id=';
    games.forEach(game => {
      ids.push(game['_attributes'].objectid);
    });

    this.http.get(this.urlBase + thing + ids.join(','), {responseType: 'text'}).subscribe(results => {
      const resultJson = convert.xml2js(results, {compact: true, spaces: 2});
      console.log(resultJson.items.item);
      this.resultsReceived.emit(resultJson.items.item);
    });
  }

}
