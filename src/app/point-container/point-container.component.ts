import {Component, OnInit, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-point-container',
  templateUrl: './point-container.component.html',
  styleUrls: ['./point-container.component.scss']
})
export class PointContainerComponent implements OnInit {

  constructor(public viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
  }

}
