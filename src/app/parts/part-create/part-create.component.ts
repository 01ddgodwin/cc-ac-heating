import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Customer } from 'src/app/customers/customers.model';
import { Part } from '../parts.model';
import { PartsService } from '../parts.service';

@Component({
  selector: 'app-part-create',
  templateUrl: './part-create.component.html',
  styleUrls: ['./part-create.component.scss']
})
export class PartCreateComponent implements OnInit {
  private mode = 'create'
  private partId;
  part!: Part;

  @Input() customers: Customer[] = [];
  private customersSub!: Subscription;

  constructor(public partsService: PartsService, public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onAddPart(form: NgForm) {
    if (form.invalid) {
      return
    }
    const part: Part = {
      id: form.value.id,
      partName: form.value.partName,
      cost: form.value.cost

    };
    this.partsService.addPart(part)
    form.resetForm();
  }

}
