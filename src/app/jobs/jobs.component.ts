import { Component, OnInit } from '@angular/core';
import { Job } from './jobs.model';

@Component({
  selector: 'app-customers',
  templateUrl: './jobs.component.html',
  //   styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  storedJobs: Job[] = [];

  constructor() {}

  ngOnInit(): void {}

  onJobAdded(job: any) {
    this.storedJobs.push(job);
  }
}
