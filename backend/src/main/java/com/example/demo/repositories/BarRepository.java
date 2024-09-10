package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Bar;

public interface BarRepository extends JpaRepository<Bar, Integer> {

}
