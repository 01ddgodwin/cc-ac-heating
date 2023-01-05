import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../home.service';
import { Message } from '../messages.model';

@Component({
  selector: 'app-message-create',
  templateUrl: './message-create.component.html',
  styleUrls: ['./message-create.component.scss']
})
export class MessageCreateComponent implements OnInit {
  url = "https://mailthis.to/coldairforu@gmail.com"

  constructor(public homeService: HomeService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
  }

  onSaveMessage(form: NgForm) {
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
    form.resetForm();
  }

}
