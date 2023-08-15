import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/app/service/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  firstName:String | undefined;
  lastName:String | undefined;
  age:Number | undefined;

  constructor(private registrationService: RegistrationService) { }

  ngOnInit(): void {
  }

  onConfirm(){
    let patient = {
      "firstName" : this.firstName,
      "lastName" : this.lastName,
      "age" : this.age
    }
    this.registrationService.addPatient(patient).subscribe((res:any)=> {
      this.firstName = '';
      this.lastName = '';
      this.age = undefined;;
    }
    );
  }
}

