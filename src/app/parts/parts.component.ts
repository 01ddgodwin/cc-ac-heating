import { Component, OnInit } from '@angular/core';
import { Part } from './parts.model';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss']
})
export class PartsComponent implements OnInit {
  storedParts: Part[] = []

  constructor() { }

  ngOnInit(): void {
  }

  onPartAdded(part: any) {
    this.storedParts.push(part);
  }

}
