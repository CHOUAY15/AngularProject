package com.example.demo.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Party;
import com.example.demo.repositories.PartyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
@RequestMapping("/api/party")
public class PartyController {

  @Autowired
  private PartyRepository partyRepository;

  @GetMapping("/all")
  public List<Party> findAll() {
    return partyRepository.findAll();
  }

  @GetMapping("/{id}")
  public Party findById(@PathVariable int id) {
    return partyRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Party with id " + id + " not found"));
  }

  @PostMapping("/create")
  public Party createParty(@RequestBody Party party) {
    return partyRepository.save(party);
  }

  @PutMapping("/update/{id}")
  public Party updateParty(@PathVariable int id, @RequestBody Party updatedParty) {
    return partyRepository.findById(id)
        .map(party -> {
          party.setFullName(updatedParty.getFullName());
          party.setAddress(updatedParty.getAddress());
          party.setFeature(updatedParty.getFeature());
          return partyRepository.save(party);
        })
        .orElseThrow(() -> new IllegalArgumentException("Party with id " + id + " not found"));
  }

  @DeleteMapping("/delete/{id}")
  public String deleteParty(@PathVariable int id) {
    return partyRepository.findById(id)
        .map(party -> {
          partyRepository.deleteById(id);
          return "Party deleted successfully";
        })
        .orElseThrow(() -> new IllegalArgumentException("Party with id " + id + " not found"));
  }
}

