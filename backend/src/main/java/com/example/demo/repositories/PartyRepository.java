package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Party;
import com.example.demo.entities.Feature;


@Repository
public interface PartyRepository extends JpaRepository<Party, Integer> {
  Party  findByFullNameAndFeature(String fullName, Feature feature);
  
}
