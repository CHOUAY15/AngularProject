package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Judge;

@Repository
public interface JudgeRepository extends JpaRepository<Judge, Integer> {

}
