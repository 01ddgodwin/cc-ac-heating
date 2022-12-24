import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from '../customers.model';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent implements OnInit {

  constructor(public customerService: CustomersService) { }

  ngOnInit(): void {
  }

  onAddCustomer(form: NgForm) {
    if (form.invalid) {
      return
    }
    const customer: Customer = {
      id: form.value.id,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      phone: form.value.phone,
      email: form.value.email,
      address: form.value.address
    };
    this.customerService.addCustomer(customer)
    form.resetForm();
  }

}
