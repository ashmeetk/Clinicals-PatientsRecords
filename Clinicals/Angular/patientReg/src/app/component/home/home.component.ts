import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/app/service/registration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.fetchAllPatients();
  }

  patients:any;

  fetchAllPatients(){
    this.registrationService.getPatients().subscribe((res)=>{
      this.patients = res;
    });
  }

}
