package com.example.demo.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Court;
import com.example.demo.repositories.CourtRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
@RequestMapping("/api/court")
public class CourtController {

  @Autowired
  private CourtRepository courtRepository;

  @GetMapping("/all")
  public List<Court> findAll() {
    return courtRepository.findAll();
  }

  @GetMapping("/{id}")
  public Court findById(@PathVariable int id) {
    return courtRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Court with id " + id + " not found"));
  }

  @PostMapping("/create")
  public Court createCourt(@RequestBody Court court) {
    return courtRepository.save(court);
  }

  @PutMapping("/update/{id}")
  public Court updateCourt(@PathVariable int id, @RequestBody Court updatedCourt) {
    return courtRepository.findById(id)
        .map(court -> {
          court.setName(updatedCourt.getName());
          court.setCity(updatedCourt.getCity());
          return courtRepository.save(court);
        })
        .orElseThrow(() -> new IllegalArgumentException("Court with id " + id + " not found"));
  }

  @DeleteMapping("/delete/{id}")
  public String deleteCourt(@PathVariable int id) {
    return courtRepository.findById(id)
        .map(court -> {
          courtRepository.deleteById(id);
          return "Court deleted successfully";
        })
        .orElseThrow(() -> new IllegalArgumentException("Court with id " + id + " not found"));
  }
}

