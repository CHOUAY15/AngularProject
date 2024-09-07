package com.example.demo.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Feature;
import com.example.demo.repositories.FeatureRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
@RequestMapping("/api/feature")
public class FeatureController {

  @Autowired
  private FeatureRepository featureRepository;

  @GetMapping("/all")
  public List<Feature> findAll() {
    return featureRepository.findAll();
  }

  @GetMapping("/{id}")
  public Feature findById(@PathVariable int id) {
    return featureRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Feature with id " + id + " not found"));
  }

  @PostMapping("/create")
  public Feature createFeature(@RequestBody Feature feature) {
    return featureRepository.save(feature);
  }

  @PutMapping("/update/{id}")
  public Feature updateFeature(@PathVariable int id, @RequestBody Feature updatedFeature) {
    return featureRepository.findById(id)
        .map(feature -> {
          feature.setDescription(updatedFeature.getDescription());
          return featureRepository.save(feature);
        })
        .orElseThrow(() -> new IllegalArgumentException("Feature with id " + id + " not found"));
  }

  @DeleteMapping("/delete/{id}")
  public String deleteFeature(@PathVariable int id) {
    return featureRepository.findById(id)
        .map(feature -> {
          featureRepository.deleteById(id);
          return "Feature deleted successfully";
        })
        .orElseThrow(() -> new IllegalArgumentException("Feature with id " + id + " not found"));
  }
}

