import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() name = '';

  constructor() {}

  ngOnInit() {}
}
