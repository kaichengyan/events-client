import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Workshop } from "../Workshop";
import { Participant } from "../Participant";
import { ParticipantService } from "../participant.service";
import { FormBuilder, Validators } from "@angular/forms";
import { ReCaptcha2Component } from "ngx-captcha";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"]
})
export class RegistrationFormComponent implements OnInit {
  @Input()
  workshop: Workshop;

  @ViewChild("captchaElem")
  captchaElem: ReCaptcha2Component;

  submitted: boolean = false;
  registeredMessage: string;

  registrationForm = this.fb.group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    phone: ["", [Validators.pattern("(\\+)?[0-9]+"), Validators.minLength(3)]],
    company: ["", Validators.required],
    recaptcha: ["", Validators.required]
  });

  constructor(
    private participantService: ParticipantService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}

  onSubmit() {
    var participant: Participant = new Participant();
    participant.name = this.registrationForm.value.name;
    participant.email = this.registrationForm.value.email;
    participant.company = this.registrationForm.value.company;
    participant.phone = this.registrationForm.value.phone;
    var recaptchaResponse = this.captchaElem.getResponse();
    participant.event_id = this.workshop.id;
    this.participantService
      .registerParticipant(participant, recaptchaResponse)
      .subscribe(
        data => {
          this.registeredMessage = "Thank you for registering!";
        },
        error => {
          this.registeredMessage =
            "Oops, something has gone wrong on our end. Please try again later.";
        }
      );
    this.submitted = true;
  }
}
