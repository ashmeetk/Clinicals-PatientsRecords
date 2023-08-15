package com.ashmeet.clinicals.controllers;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ashmeet.clinicals.dto.ClinicalDataRequest;
import com.ashmeet.clinicals.model.ClinicalData;
import com.ashmeet.clinicals.model.Patient;
import com.ashmeet.clinicals.repos.ClinicalDataRepository;
import com.ashmeet.clinicals.repos.PatientRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class ClinicalDataController {
	
	private ClinicalDataRepository clinicalDatarepository;
	private PatientRepository patientRepository;
	
	@Autowired
	ClinicalDataController(ClinicalDataRepository clinicalDatarepository, PatientRepository patientRepository)
	{
		this.clinicalDatarepository = clinicalDatarepository;
		this.patientRepository = patientRepository;
	}

	@RequestMapping(value="/clinicals",method=RequestMethod.POST)
	public ClinicalData saveClinicalData(@RequestBody ClinicalDataRequest request){
		ClinicalData clinicalData = new ClinicalData();
		Patient patient = patientRepository.findById(request.getPatientId()).get();
		clinicalData.setPatient(patient);
		clinicalData.setComponentName(request.getComponentName());
		clinicalData.setComponentValue(request.getComponentValue());
		clinicalData.setMeasuredDateTime(Timestamp.from(Instant.now()));
		return clinicalDatarepository.save(clinicalData);
	}
	
	@RequestMapping(value="/clinicals/{patientId}/{componentName}",method=RequestMethod.GET)
	public List<ClinicalData> getClinicalData(@PathVariable("patientId") int patientId, @PathVariable("componentName") String componentName)
	{
		boolean flag=false;
		if(componentName.equals("bmi")){
			componentName="hw";
			flag=true;
		}
		List<ClinicalData> clinicalData = clinicalDatarepository.findByPatientIdAndComponentNameOrderByMeasuredDateTime(patientId, componentName);
		List<ClinicalData> duplicateClinicalData = new ArrayList<>(clinicalData);
		for(ClinicalData eachEntry: duplicateClinicalData)
		{
			calculateBMI(clinicalData, eachEntry, patientId);
		}
		
		if(flag==true)
		{
			componentName="bmi";
		}	
		
		clinicalData = clinicalDatarepository.findByPatientIdAndComponentNameOrderByMeasuredDateTime(patientId, componentName);
		return clinicalData;
	}
	
	public void calculateBMI(List<ClinicalData> clinicalData, ClinicalData eachEntry, int patientId) {
		if (eachEntry.getComponentName().equals("hw")) {
			String[] heightAndWeight = eachEntry.getComponentValue().split("/");
			if (heightAndWeight != null && heightAndWeight.length > 1) {
				float heightInMeters = Float.parseFloat(heightAndWeight[0]) * 0.3048F;
				System.out.println("weight is: " + heightAndWeight[1]);
				System.out.println("height is: " + heightAndWeight[0]);
				System.out.println("heightInMeters is: " + heightInMeters);
				
				float bmi = Float.parseFloat(heightAndWeight[1]) / (heightInMeters * heightInMeters);
				ClinicalData bmiData = new ClinicalData();
				bmiData.setComponentName("bmi");
				bmiData.setComponentValue(Float.toString(bmi));
				Patient patient = patientRepository.findById(patientId).get();
				bmiData.setPatient(patient);
				System.out.print("bmiData is: " + bmiData.toString());
				clinicalDatarepository.save(bmiData);
			}
		}
	}
}
