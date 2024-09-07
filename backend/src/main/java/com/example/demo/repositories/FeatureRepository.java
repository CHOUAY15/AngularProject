package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Feature;

@Repository
public interface FeatureRepository extends JpaRepository<Feature, Integer> {

}
