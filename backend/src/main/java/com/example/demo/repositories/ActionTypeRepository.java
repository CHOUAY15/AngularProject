package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.ActionType;

@Repository
public interface ActionTypeRepository extends JpaRepository<ActionType, Integer> {
  
}
