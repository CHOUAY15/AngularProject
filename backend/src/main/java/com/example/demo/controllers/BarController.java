package com.example.demo.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Bar;
import com.example.demo.repositories.BarRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
@RequestMapping("/api/bar")
public class BarController {

  @Autowired
  private BarRepository BarRepository;

  @GetMapping("/all")
  public List<Bar> findAll() {
    return BarRepository.findAll();
  }

  @GetMapping("/{id}")
  public Bar findById(@PathVariable int id) {
    return BarRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Bar with id " + id + " not found"));
  }

  @PostMapping("/create")
  public Bar createBar(@RequestBody Bar Bar) {
    return BarRepository.save(Bar);
  }

  @PutMapping("/update/{id}")
  public Bar updateBar(@PathVariable int id, @RequestBody Bar updatedBar) {
    return BarRepository.findById(id)
        .map(Bar -> {
          Bar.setName(updatedBar.getName());
          return BarRepository.save(Bar);
        })
        .orElseThrow(() -> new IllegalArgumentException("Bar with id " + id + " not found"));
  }

  @DeleteMapping("/delete/{id}")
  public String deleteBar(@PathVariable int id) {
    return BarRepository.findById(id)
        .map(Bar -> {
          BarRepository.deleteById(id);
          return "Bar deleted successfully";
        })
        .orElseThrow(() -> new IllegalArgumentException("Bar with id " + id + " not found"));
  }
}