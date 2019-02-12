import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from '../shared/settings.service';
declare var require: any;
const convert = require('xml-js');

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  games: any;
  weightValues: number[] = [0, 5];
  username: string;
  playerCount: number;
  sessionTime: number;
  private settings: SettingsService;

  constructor(private http: HttpClient, settingsService: SettingsService) {
    this.settings = settingsService;
  }

  ngOnInit() {
  }

  findGames() {
    const username = `username=${this.username}`;
    const urlEnd = '&subtype=boardgame&excludessubtype=boardgameexpansion&own=1';
    const collection = 'collection?';
    this.http.get(
      this.settings.bggApi + collection + username + urlEnd,
      {responseType: 'text'})
    .subscribe(results => {
      const resultJson = convert.xml2js(results, {compact: true, spaces: 2});
      this.getGameDetails(resultJson.items.item);
    });
  }

  private getGameDetails(games: any[]) {
    const ids = games.map(game => game['_attributes'].objectid);

    this.http.get(
      this.settings.bggApi + this.settings.parameters.thing + ids.join(',') + this.settings.parameters.stats,
      {responseType: 'text'})
    .subscribe(results => {
      const resultJson = convert.xml2js(results, {compact: true, spaces: 2});
      console.log(resultJson.items.item);
      this.games = resultJson.items.item;
    });
  }

}
