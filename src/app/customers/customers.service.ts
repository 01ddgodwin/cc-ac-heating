import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Customer } from './customers.model';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private customers: Customer[] = [];
  private customersUpdated = new Subject<Customer[]>();

  constructor(private http: HttpClient) {}

  getCustomers() {
    this.http
      .get<{ message: string; customers: any }>('http://localhost:3000/api/customers')
      .pipe(
        map((customerData) => {
          return customerData.customers.map((customer) => {
            return {
              firstName: customer.firstName,
              lastName: customer.lastName,
              id: customer._id,
              phone: customer.phone,
              email: customer.email,
              address: customer.address
            };
          });
        })
      )
      .subscribe((transformedCustomers) => {
        this.customers = transformedCustomers;
        this.customersUpdated.next([...this.customers]);
      });
  }

  getCustomerUpdateListener() {
    return this.customersUpdated.asObservable();
  }

  addCustomer(customers: Customer) {
    const customer: Customer = {
      id: customers.id,
      firstName: customers.firstName,
      lastName: customers.lastName,
      phone: customers.phone,
      email: customers.email,
      address: customers.address
    };
    this.http
      .post<{ message: string; customerId: string }>(
        'http://localhost:3000/api/customers',
        customer
      )
      .subscribe((responseData) => {
        const id = responseData.customerId;
        customer.id = id;
        this.customers.push(customer);
        this.customersUpdated.next([...this.customers]);
      });
  }

  deleteCustomer(customerId: string) {
    this.http
      .delete('http://localhost:3000/api/customers/' + customerId)
      .subscribe(() => {
        const updatedCustomers = this.customers.filter((customer) => customer.id !== customerId);
        this.customers = updatedCustomers;
        this.customersUpdated.next([...this.customers]);
      });
  }
}
