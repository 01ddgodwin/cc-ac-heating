import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/customers/customers.model';
import { CustomersService } from 'src/app/customers/customers.service';
import { Part } from '../parts.model';
import { PartsService } from '../parts.service';

@Component({
  selector: 'app-part-list',
  templateUrl: './part-list.component.html',
  styleUrls: ['./part-list.component.scss']
})
export class PartListComponent implements OnInit {

  isLoading = false;

  @Input() parts: Part[] = [];
  private partsSub!: Subscription;

  @Input() customers: Customer[] = [];
  private customerSub!: Subscription;

  constructor(public partsService: PartsService, public customerService: CustomersService) {}

  ngOnInit(): void {
    this.isLoading = true
    this.partsService.getParts();
    this.partsSub = this.partsService
      .getPartUpdateListener()
      .subscribe((parts: Part[]) => {
        this.isLoading = false;
        this.parts = parts;
      });


    this.customerService.getCustomers();
    this.customerSub = this.customerService
      .getCustomerUpdateListener()
      .subscribe((customers: Customer[]) => {
        this.customers = customers;
      });
  }

  onDelete(partId: string) {
    this.partsService.deletePart(partId);
  }

  ngOnDestroy(): void {
    this.partsSub.unsubscribe();
  }

}
