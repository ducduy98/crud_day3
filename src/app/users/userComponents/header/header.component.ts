import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'fis-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title:string;
  constructor() { }

  ngOnInit(): void {
  }

}
