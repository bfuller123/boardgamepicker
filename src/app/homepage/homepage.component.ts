import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  games: any;

  constructor() { }

  ngOnInit() {
  }

  loadResults(results: any) {
    this.games = results;
  }

}
