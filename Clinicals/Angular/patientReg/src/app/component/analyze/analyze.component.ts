import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistrationService } from 'src/app/service/registration.service';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.css']
})
export class AnalyzeComponent implements OnInit {
  patientId:Number | undefined;
  analyzedClinicalData:any;

  constructor(private route: ActivatedRoute,private registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.patientId = +this.route.snapshot.paramMap.get('patientId')!;

    this.registrationService.getAnalyzedClinicalData(this.patientId).subscribe((res)=>{
      this.analyzedClinicalData = res;
      console.log('analyzedClinicalData is: ' + JSON.stringify(this.analyzedClinicalData));
    });
  }

  onClickGraph()
  {
    this.registrationService.getClinicalData(this.patientId!, "heartrate").subscribe((res)=>{
      console.log('res is: ' + JSON.stringify(res));
    });
    {

    }
  }

}
