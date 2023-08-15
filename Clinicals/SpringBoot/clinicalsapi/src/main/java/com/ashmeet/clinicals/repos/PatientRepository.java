package com.ashmeet.clinicals.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ashmeet.clinicals.model.Patient;

public interface PatientRepository extends JpaRepository<Patient, Integer> {

}
