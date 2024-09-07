package com.example.demo.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Lawyer;
import com.example.demo.repositories.LawyerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
@RequestMapping("/api/lawyer")
public class LawyerController {

  @Autowired
  private LawyerRepository lawyerRepository;

  @GetMapping("/all")
  public List<Lawyer> findAll() {
    return lawyerRepository.findAll();
  }

  @GetMapping("/{id}")
  public Lawyer findById(@PathVariable int id) {
    return lawyerRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Lawyer with id " + id + " not found"));
  }

  @PostMapping("/create")
  public Lawyer createLawyer(@RequestBody Lawyer lawyer) {
    return lawyerRepository.save(lawyer);
  }

  @PutMapping("/update/{id}")
  public Lawyer updateLawyer(@PathVariable int id, @RequestBody Lawyer updatedLawyer) {
    return lawyerRepository.findById(id)
        .map(lawyer -> {
          lawyer.setFullName(updatedLawyer.getFullName());
          lawyer.setAuthority(updatedLawyer.getAuthority());
          return lawyerRepository.save(lawyer);
        })
        .orElseThrow(() -> new IllegalArgumentException("Lawyer with id " + id + " not found"));
  }

  @DeleteMapping("/delete/{id}")
  public String deleteLawyer(@PathVariable int id) {
    return lawyerRepository.findById(id)
        .map(lawyer -> {
          lawyerRepository.deleteById(id);
          return "Lawyer deleted successfully";
        })
        .orElseThrow(() -> new IllegalArgumentException("Lawyer with id " + id + " not found"));
  }
}

