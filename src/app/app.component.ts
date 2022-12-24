import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Job } from './jobs/jobs.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cc-ac-heating';
  storedJobs: Job[] = []

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoAuthUser();
  }
  
  onJobAdded(job: any) {
    this.storedJobs.push(job);
  }
}
