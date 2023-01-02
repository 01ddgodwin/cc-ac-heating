import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
  mode = 'create'
  private partId;
  part!: Part;

  @Input() customers: Customer[] = [];
  private customersSub!: Subscription;

  constructor(public partsService: PartsService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('partId')) {
        this.mode = 'edit';
        this.partId = paramMap.get('partId')
        this.part = this.partsService.getPart(this.partId)
      } else {
        this.mode = 'create'
        this.partId = null
      }
    });
  }

  onSavePart(form: NgForm) {
    if (form.invalid) {
      return
    }
    const part: Part = {
      id: form.value.id,
      partName: form.value.partName,
      cost: form.value.cost

    };

    if (this.mode === 'create') {
      this.partsService.addPart(part)
    } else {
      this.partsService.updatePart(this.partId, form.value.partName, form.value.cost)
      this.router.navigate(['/parts']);
    }
    form.resetForm();
  }

}
