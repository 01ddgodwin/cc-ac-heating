import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Job } from '../jobs.model';
import { JobsService } from '../jobs.service';
import { Subscription } from 'rxjs';
import { CustomersService } from 'src/app/customers/customers.service';
import { Customer } from 'src/app/customers/customers.model';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent implements OnInit, OnDestroy {

  isLoading = false;

  @Input() jobs: Job[] = [];
  private jobsSub!: Subscription;

  @Input() customers: Customer[] = [];
  private customerSub!: Subscription;

  constructor(public jobsService: JobsService, public customerService: CustomersService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.jobsService.getJobs();
    this.jobsSub = this.jobsService
      .getJobUpdateListener()
      .subscribe((jobs: Job[]) => {
        this.isLoading = false;
        this.jobs = jobs;
      });


    this.customerService.getCustomers();
    this.customerSub = this.customerService
      .getCustomerUpdateListener()
      .subscribe((customers: Customer[]) => {
        this.customers = customers;
      });
  }

  onDelete(jobId: string) {
    this.jobsService.deleteJob(jobId);
  }

  ngOnDestroy(): void {
    this.jobsSub.unsubscribe();
  }
}
