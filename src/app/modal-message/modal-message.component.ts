import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";

@Component({
  selector: "app-modal-message",
  templateUrl: "./modal-message.component.html",
  styleUrls: ["./modal-message.component.scss"]
})
export class ModalMessageComponent implements OnInit {
  title: string;
  closeBtnName: string;
  message: string;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {}
}
