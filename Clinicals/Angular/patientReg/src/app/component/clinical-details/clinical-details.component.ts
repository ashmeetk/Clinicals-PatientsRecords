import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistrationService } from 'src/app/service/registration.service';

@Component({
  selector: 'app-clinical-details',
  templateUrl: './clinical-details.component.html',
  styleUrls: ['./clinical-details.component.css']
})
export class ClinicalDetailsComponent implements OnInit {
  patientId:Number | undefined;
  patient:any;
  componentName:String | undefined;
  componentValue:String | undefined;

  constructor(private route: ActivatedRoute, private registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.patientId = +this.route.snapshot.paramMap.get('patientId')!;
    this.registrationService.getPatient(this.patientId).subscribe((res)=>{
      this.patient = res;
    });
  }

  onConfirm(){
    let ClinicalDetails = {
      "patientId": this.patientId,
      "componentName":this.componentName,
      "componentValue":this.componentValue,
    }

    this.registrationService.addClinicalData(ClinicalDetails).subscribe((res)=>{
      this.componentName = undefined;
      this.componentValue = undefined;
    });
  }

}

