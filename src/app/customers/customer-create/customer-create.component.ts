import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Customer } from '../customers.model';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent implements OnInit {
  mode = 'create';
  private customerId;
  customer!: Customer

  constructor(public customerService: CustomersService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('customerId')) {
        this.mode = 'edit';
        this.customerId = paramMap.get('customerId');
        this.customer = this.customerService.getCustomer(this.customerId);
      } else {
        this.mode = 'create';
        this.customerId = null
      }
    })
  }

  onSaveCustomer(form: NgForm) {
    if (form.invalid) {
      return
    }
    const customer: Customer = {
      id: this.customerId,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      phone: form.value.phone,
      email: form.value.email,
      address: form.value.address
    };

    if (this.mode === 'create') {
      this.customerService.addCustomer(customer)
    } else {
      this.customerService.updateCustomer(customer);
      this.router.navigate(['/customers']);
    }
    form.resetForm();
  }

}
