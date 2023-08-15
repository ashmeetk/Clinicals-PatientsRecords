import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  patientsUrl = "http://localhost:8080/clinicalservices/api/patients";
  clinicalDataUrl="http://localhost:8080/clinicalservices/api/clinicals";

  constructor(private _httpClient: HttpClient) { }

  public getPatients(){
    return this._httpClient.get(this.patientsUrl);
  }

  public getPatient(id: Number){
    return this._httpClient.get(this.patientsUrl+"/"+id);
  }

  public addPatient(patient:any){
    return this._httpClient.post(this.patientsUrl, patient);
  }

  public addClinicalData(clinicalData:any){
    return this._httpClient.post(this.clinicalDataUrl, clinicalData);
  }

  public getClinicalData(patientId:Number, componentName:String){
    return this._httpClient.get(this.clinicalDataUrl+"/"+patientId+"/"+componentName);
  }

  public getAnalyzedClinicalData(patientId:Number){
    return this._httpClient.get(this.patientsUrl+"/analyze/" + patientId);
  }
}
