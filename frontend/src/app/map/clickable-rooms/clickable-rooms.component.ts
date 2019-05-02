import { RoomService } from './../../services/room.service';
import { Component, OnInit } from '@angular/core';
import { DetailService } from './../../services/detail.service';

@Component({
  selector: '[app-clickable-rooms]',
  templateUrl: './clickable-rooms.component.html',
  styleUrls: ['../clickable.scss', './clickable-rooms.component.scss']
})
export class ClickableRoomsComponent implements OnInit {

  constructor(
    private RoomService: RoomService,
    private DetailService: DetailService,
  ) { }

  ngOnInit() {
    this.RoomService.getRoom().subscribe(data => {
      this.RoomService.room = data;
    });
  }

  onClickRoom(event: Event) {
    this.RoomService.whatRoom = event.srcElement.id;
    this.DetailService.changeObject(`room`);
    document.querySelectorAll(".shining").forEach(element => element.classList.remove("shining"));
    event.srcElement.classList.add("shining");
    this.DetailService.changeStatus(true);
  }

}
