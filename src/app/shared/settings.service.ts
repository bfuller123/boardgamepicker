import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

  constructor() {}

  public bggApi = 'https://www.boardgamegeek.com/xmlapi2/';
  public parameters = {
    thing: 'thing?id=',
    stats: '&stats=1'
  };
}
