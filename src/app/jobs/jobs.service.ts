import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Job } from './jobs.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiURL + "/jobs/";

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  private jobs: Job[] = [];
  private jobsUpdated = new Subject<Job[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getJobs() {
    this.http
      .get<{ message: string; jobs: any }>(BACKEND_URL)
      .pipe(
        map((jobData) => {
          return jobData.jobs.map((job) => {
            return {
              date: job.date,
              customer: job.customer,
              id: job._id,
              hours: job.hours,
              notes: job.notes,
              parts: job.parts,
            };
          });
        })
      )
      .subscribe((transformedJobs) => {
        this.jobs = transformedJobs;
        this.jobsUpdated.next([...this.jobs]);
      });
  }

  getJobUpdateListener() {
    return this.jobsUpdated.asObservable();
  }

  // http://localhost:3000

  getJob(id: string) {
    return { ...this.jobs.find((j) => j.id === id) };
  }

  addJob(jobs: Job) {
    const job: Job = {
      id: jobs.id,
      date: jobs.date,
      customer: jobs.customer,
      hours: jobs.hours,
      notes: jobs.notes,
      parts: jobs.parts,
    };
    this.http
      .post<{ message: string; jobId: string }>(
        BACKEND_URL,
        job
      )
      .subscribe((responseData) => {
        const id = responseData.jobId;
        job.id = id;
        this.jobs.push(job);
        this.jobsUpdated.next([...this.jobs]);
      });
  }

  updateJob(jobs: Job) {
    const job: Job = {
      id: jobs.id,
      date: jobs.date,
      customer: jobs.customer,
      hours: jobs.hours,
      notes: jobs.notes,
      parts: jobs.parts,
    };
    this.http
      .put(BACKEND_URL + jobs.id, job)
      .subscribe((response) => {
        console.log(this.jobs);
        const updatedJobs = [...this.jobs];
        const oldJobIndex = updatedJobs.findIndex(
          (j) => j.id === job.id
          );
        updatedJobs[oldJobIndex] = job;
        this.jobs = updatedJobs;
        this.jobsUpdated.next([...this.jobs]);
      });
  }

  deleteJob(jobId: string) {
    this.http
      .delete(BACKEND_URL + jobId)
      .subscribe(() => {
        const updatedJobs = this.jobs.filter((job) => job.id !== jobId);
        this.jobs = updatedJobs;
        this.jobsUpdated.next([...this.jobs]);
      });
  }
}
