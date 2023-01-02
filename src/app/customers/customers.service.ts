import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from './customers.model';

const BACKEND_URL = environment.apiURL + "/customers/";


@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private customers: Customer[] = [];
  private customersUpdated = new Subject<Customer[]>();

  constructor(private http: HttpClient) {}

  getCustomers() {
    this.http
      .get<{ message: string; customers: any }>(
        BACKEND_URL
      )
      .pipe(
        map((customerData) => {
          return customerData.customers.map((customer) => {
            return {
              firstName: customer.firstName,
              lastName: customer.lastName,
              id: customer._id,
              phone: customer.phone,
              email: customer.email,
              address: customer.address,
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

  getCustomer(id: string) {
    return { ...this.customers.find((c) => c.id === id) };
  }

  addCustomer(customers: Customer) {
    const customer: Customer = {
      id: customers.id,
      firstName: customers.firstName,
      lastName: customers.lastName,
      phone: customers.phone,
      email: customers.email,
      address: customers.address,
    };
    this.http
      .post<{ message: string; customerId: string }>(
        BACKEND_URL,
        customer
      )
      .subscribe((responseData) => {
        const id = responseData.customerId;
        customer.id = id;
        this.customers.push(customer);
        this.customersUpdated.next([...this.customers]);
      });
  }

  updateCustomer(customers: Customer) {
    const customer: Customer = {
      id: customers.id,
      firstName: customers.firstName,
      lastName: customers.lastName,
      phone: customers.phone,
      email: customers.email,
      address: customers.address
    };
    this.http
      .put(BACKEND_URL + customers.id, customer)
      .subscribe((response) => {
        const updatedCustomers = [...this.customers];
        const oldCustomerIndex = updatedCustomers.findIndex(
          (c) => c.id === customer.id
        );
        updatedCustomers[oldCustomerIndex] = customer;
        this.customers = updatedCustomers;
        this.customersUpdated.next([...this.customers]);
      });
  }

  deleteCustomer(customerId: string) {
    this.http
      .delete(BACKEND_URL + customerId)
      .subscribe(() => {
        const updatedCustomers = this.customers.filter(
          (customer) => customer.id !== customerId
        );
        this.customers = updatedCustomers;
        this.customersUpdated.next([...this.customers]);
      });
  }
}
