import { Component, Input, OnInit } from '@angular/core';
import { Job } from '../jobs.model'; 
import { NgForm } from '@angular/forms'
import { JobsService } from '../jobs.service';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/customers/customers.model';
import { CustomersService } from 'src/app/customers/customers.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.scss'],
})
export class JobCreateComponent implements OnInit {
  enteredFirstName = "";
  enteredLastName = "";
  private mode = 'create'
  private jobId;
  job!: Job;

  @Input() customers: Customer[] = [];
  private customersSub!: Subscription;

  constructor(public jobsService: JobsService, public customersService: CustomersService, public route: ActivatedRoute) {}

  ngOnInit(): void {

    // this.route.paramMap.subscribe((paramMap: ParamMap) => {
    //   if (paramMap.has('jobId')) {
    //     this.mode = 'edit';
    //     this.jobId = paramMap.get("jobId");
    //     this.job = this.jobsService.getJob(this.jobId);
    //   } else {
    //     this.mode = 'create';
    //     this.jobId = null;
    //   }
    // });

    this.customersService.getCustomers();
    this.customersSub = this.customersService
      .getCustomerUpdateListener()
      .subscribe((customers: Customer[]) => {
        this.customers = customers;
      });

  }

  onAddJob(form: NgForm) {
    if (form.invalid) {
      return
    }
    const job: Job = {
      id: form.value.id,
      date: form.value.date,
      customer: form.value.customer,
      hours: form.value.hours,
      notes: form.value.notes,
      parts: form.value.parts
    };
    this.jobsService.addJob(job)
    form.resetForm();
  }
}
