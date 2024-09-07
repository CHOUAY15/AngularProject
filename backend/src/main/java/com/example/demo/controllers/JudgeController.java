package com.example.demo.controllers;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Judge;
import com.example.demo.repositories.JudgeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
@RequestMapping("/api/judge")
public class JudgeController {

  @Autowired
  private JudgeRepository judgeRepository;

  @GetMapping("/all")
  public List<Judge> findAll() {
    return judgeRepository.findAll();
  }

  @GetMapping("/{id}")
  public Judge findById(@PathVariable int id) {
    return judgeRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Judge with id " + id + " not found"));
  }

  @PostMapping("/create")
  public Judge createJudge(@RequestBody Judge judge) {
    return judgeRepository.save(judge);
  }

  @PutMapping("/update/{id}")
  public Judge updateJudge(@PathVariable int id, @RequestBody Judge updatedJudge) {
    return judgeRepository.findById(id)
        .map(judge -> {
          judge.setGender(updatedJudge.getGender());
          judge.setFullName(updatedJudge.getFullName());
          return judgeRepository.save(judge);
        })
        .orElseThrow(() -> new IllegalArgumentException("Judge with id " + id + " not found"));
  }

  @DeleteMapping("/delete/{id}")
  public String deleteJudge(@PathVariable int id) {
    return judgeRepository.findById(id)
        .map(judge -> {
          judgeRepository.deleteById(id);
          return "Judge deleted successfully";
        })
        .orElseThrow(() -> new IllegalArgumentException("Judge with id " + id + " not found"));
  }
}

