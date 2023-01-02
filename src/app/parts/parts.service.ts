import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Part } from './parts.model';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiURL + "/parts/";

@Injectable({
  providedIn: 'root',
})
export class PartsService {
  private parts: Part[] = [];
  private partsUpdated = new Subject<Part[]>();

  constructor(private http: HttpClient) {}

  getParts() {
    this.http
      .get<{ message: string; parts }>(BACKEND_URL)
      .pipe(
        map((partData) => {
          return partData.parts.map((part) => {
            return {
              partName: part.partName,
              cost: part.cost,
              id: part._id,
            };
          });
        })
      )
      .subscribe((transformedParts) => {
        this.parts = transformedParts;
        this.partsUpdated.next([...this.parts]);
      });
  }

  getPartUpdateListener() {
    return this.partsUpdated.asObservable();
  }

  getPart(id: string) {
    return { ...this.parts.find((p) => p.id === id) };
  }

  addPart(parts: Part) {
    const part: Part = {
      id: parts.id,
      partName: parts.partName,
      cost: parts.cost,
    };
    this.http
      .post<{ message: string; partId: string }>(
        BACKEND_URL,
        part
      )
      .subscribe((responseData) => {
        const id = responseData.partId;
        part.id = id;
        this.parts.push(part);
        this.partsUpdated.next([...this.parts]);
      });
  }

  updatePart(id: string, partName: string, cost: number) {
    const part: Part = { id: id, partName: partName, cost: cost };
    this.http
      .put(BACKEND_URL + id, part)
      .subscribe((response) => {
        const updatedParts = [...this.parts];
        const oldPartIndex = updatedParts.findIndex(p => p.id === part.id);
        updatedParts[oldPartIndex] = part;
        this.parts = updatedParts;
        this.partsUpdated.next([...this.parts])
      });
  }

  deletePart(partId: string) {
    this.http
      .delete(BACKEND_URL + partId)
      .subscribe(() => {
        console.log('Deleted!');
        const updatedParts = this.parts.filter((part) => part.id !== partId);
        this.parts = updatedParts;
        this.partsUpdated.next([...this.parts]);
      });
  }
}
