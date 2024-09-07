package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Lawyer;

@Repository
public interface LawyerRepository extends JpaRepository<Lawyer, Integer> {
  Lawyer findByFullName(String fullName);
}
