import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Job } from 'src/app/jobs/jobs.model';
import { JobsService } from 'src/app/jobs/jobs.service';
import { Customer } from '../customers.model';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  isLoading = false;

  @Input() customers: Customer[] = [];
  private customersSub!: Subscription;

  @Input() jobs: Job[] = []
  private jobsSub!: Subscription

  constructor(public customersService: CustomersService, public jobsService: JobsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.customersService.getCustomers();
    this.customersSub = this.customersService
      .getCustomerUpdateListener()
      .subscribe((customers: Customer[]) => {
        this.isLoading = false;
        this.customers = customers;
      });

      this.jobsService.getJobs();
      this.jobsSub = this.jobsService
      .getJobUpdateListener()
      .subscribe((jobs: Job[]) => {
        this.jobs = jobs;
      });
  };

  onDelete(customerId: string) {
    this.customersService.deleteCustomer(customerId);
  }

  ngOnDestroy(): void {
    this.customersSub.unsubscribe();
  }

}
