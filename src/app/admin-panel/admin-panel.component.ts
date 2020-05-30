import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  public selectedValue = 'default';



  constructor() { }

  ngOnInit(): void {
  }


  onRoomSelection() {
    this.selectedValue = 'room';
  }
  onUserSelection() {
    this.selectedValue = 'user';
  }
  onReset() {
    this.selectedValue = 'default';
  }


}
