import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../home.service';
import { Message } from '../messages.model';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-message-create',
  templateUrl: './message-create.component.html',
  styleUrls: ['./message-create.component.scss']
})
export class MessageCreateComponent implements OnInit {

  showSuccess: boolean = false

  constructor(public homeService: HomeService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
  }

  onSaveMessage(form: NgForm, e: Event) {
    if (form.invalid) {
      return;
    }
    const message: Message = {
      id: form.value.id,
      name: form.value.name,
      phone: form.value.phone,
      email: form.value.email,
      message: form.value.message
    };

    this.homeService.addMessage(message);
    this.showSuccess = true;

    emailjs.sendForm('service_io31crw', 'ccacheating_contact', e.target as HTMLFormElement, 'jOlpvx3rRYl0P0OKg')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });

    form.resetForm();
  }

  // public sendEmail(e: Event) {
  //   emailjs.sendForm('service_io31crw', 'ccacheating_contact', e.target as HTMLFormElement, 'jOlpvx3rRYl0P0OKg')
  //     .then((result: EmailJSResponseStatus) => {
  //       console.log(result.text);
  //     }, (error) => {
  //       console.log(error.text);
  //     });
  // }

}
