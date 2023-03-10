import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { JobListComponent } from './jobs/job-list/job-list.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobCreateComponent } from './jobs/job-create/job-create.component';
import { PartsComponent } from './parts/parts.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { PartCreateComponent } from './parts/part-create/part-create.component';
import { CustomerCreateComponent } from './customers/customer-create/customer-create.component';
import { HomeComponent } from './home/home.component';
import { MessageCreateComponent } from './home/message-create/message-create.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard] },
  { path: 'editCustomer/:customerId', component: CustomerCreateComponent, canActivate: [AuthGuard] },
  { path: 'jobs', component: JobsComponent, canActivate: [AuthGuard] },
  { path: 'editJob/:jobId', component: JobCreateComponent, canActivate: [AuthGuard] },
  { path: 'parts', component: PartsComponent, canActivate: [AuthGuard]},
  { path: 'editPart/:partId', component: PartCreateComponent, canActivate: [AuthGuard] },
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  // { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
