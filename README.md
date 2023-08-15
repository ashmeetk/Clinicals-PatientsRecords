# Clinicals-PatientsRecords
Clinicals-PatientsRecords App to add new patients, add metrics w.r.t each patient, analyse patient's recent most metrics and calculate BMI. This project demonstates the use of REST API's at backend for performing CRUD operations in the database.<br/>

Help Used: Backend-referred course Project Development Using SpringBoot by Bharath Thippireddy. Frontend-developed on own.<br/>

Tech Used: SpringBoot, Angular(Typescript, HTML), MySQL.<br/>

Functionality:
1. Enter http://localhost:4200/ in google chrome to view list of all patients.
2. Click 'Register Patient' to add new patient details. Click on 'Go Back' link to go back to Home Page.
3. Click 'Add Data' for any patient to add patient metrics such as heartrate, height/weight, Blood Pressure, click Confirm. Against any metric, we can add multiple records as time advances. Time will be saved against each entry.
4. Click 'Analyze' for any patient to fetch the recent most recently recorded heartrate, height/weight and bp values. Based on recent most height/weight value, it also calculates and displays BMI.

SpringBoot Backend Application: 
To start app, click on project, run as Spring Boot App. <br/>
We have declared Patient and ClinicalData RestControllers that uses JpaRepository to fetch or add records.<br/>
REST APIs used in PatientController are as follows: <br/>
(patientId can be 1 or 2 or so on..)<br/>
1. To get list of all patients:
   API: http://localhost:8080/clinicalservices/api/patients
   Method: GET
2. To get a single patient details:
   API: http://localhost:8080/clinicalservices/api/patients/{id}
   Method: GET
3. To save new patient details:
   API: http://localhost:8080/clinicalservices/api/patients
   Method: POST
   RequestBody: {
                  "lastName": "Pritpal",
                  "firstName": "Singh",
                  "age": 52
                }
4. To get all recent metrics or clinical details of patients along with calculated BMI as per recent most height and weight values:<br/>
   API: http://localhost:8080/clinicalservices/api/patients/analyze/{id}
   Method: GET

REST APIs used in ClinicalDataController are as follows:<br/>
(componentName can be - bp or heartrate or hw)<br/>
1. To get all records for a particular metric for a particular patient for which only time varies: (We didn't use this API in our frontend code. It could have been used to plot a graph for that metric wrt time)<br/>
   API: http://localhost:8080/clinicalservices/api/clinicals/{patientId}/{componentName} 
   Method: GET
2. To save clinicalDetails or metrics for a particular patient:
   API: http://localhost:8080/clinicalservices/api/clinicals
   Method: POST
   RequestBody: {
                  "patientId": 2,
                  "componentName":"bp",
                  "componentValue": 180
                }

MySQL Database: Refer to SQL->clinicals.sql
Two tables patient and clinicaldata are declared. In clinicaldata table, each metric's name is stored as componentName, metric's value is stored as componentValue, metric's measured date and time is stored as measured_date_time.<br/>

FrontEnd App:
To start the app, go to folder Angular -> patientReg -> type ng serve -o. To go to home page, enter: http://localhost:4200/ in google chrome.<br/>
To invoke all backend API's we have used registration.service.ts and initiazed this service in all angular components.<br/>
Components:<br/>
Home: To view list of all patients.<br/>
Register: To add new patient.<br/>
ClinicalDetails: To add metric values for a patient.<br/>
Analyze: To fetch recent most metrics for a patient as well as fetch calculated BMI.<br/>

To allow frontend app to be able to send REST api requests to backend, we have added CorsConfig class in the SpringBoot Application.  <br/>
