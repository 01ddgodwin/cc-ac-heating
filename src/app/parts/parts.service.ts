import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Part } from './parts.model';

@Injectable({
  providedIn: 'root'
})
export class PartsService {

  private parts: Part[] = [];
  private partsUpdated = new Subject<Part[]>();

  constructor(private http: HttpClient) {}

  getParts() {
    this.http
      .get<{ message: string; parts }>('http://localhost:3000/api/parts')
      .pipe(map((partData) => {
          return partData.parts.map(part => {
              return {
                partName: part.partName,
                cost: part.cost,
                id: part._id,
              };
          });
        }))
      .subscribe(transformedParts => {
        this.parts = transformedParts;
        this.partsUpdated.next([...this.parts]);
      });
  }

  getPartUpdateListener() {
    return this.partsUpdated.asObservable();
  }

  addPart(parts: Part) {
    const part: Part = {
      id: parts.id,
      partName: parts.partName,
      cost: parts.cost

    };
    this.http
      .post<{ message: string, partId: string }>('http://localhost:3000/api/parts', part)
      .subscribe(responseData => {
        const id = responseData.partId;
        part.id = id;
        this.parts.push(part);
        this.partsUpdated.next([...this.parts]);
      });
  }

  deletePart(partId: string) {
    this.http.delete("http://localhost:3000/api/parts/" + partId)
      .subscribe(() => {
        console.log("Deleted!")
        const updatedParts = this.parts.filter(part => part.id !== partId);
        this.parts = updatedParts;
        this.partsUpdated.next([...this.parts]);
      });
  }
}
