package com.example.demo.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Topic;
import com.example.demo.repositories.TopicRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
@RequestMapping("/api/topic")
public class TopicController {

  @Autowired
  private TopicRepository topicRepository;

  @GetMapping("/all")
  public List<Topic> findAll() {
    return topicRepository.findAll();
  }

  @GetMapping("/{id}")
  public Topic findById(@PathVariable int id) {
    return topicRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Topic with id " + id + " not found"));
  }

  @PostMapping("/create")
  public Topic createTopic(@RequestBody Topic topic) {
    return topicRepository.save(topic);
  }

  @PutMapping("/update/{id}")
  public Topic updateTopic(@PathVariable int id, @RequestBody Topic updatedTopic) {
    return topicRepository.findById(id)
        .map(topic -> {
          topic.setDescription(updatedTopic.getDescription());
          return topicRepository.save(topic);
        })
        .orElseThrow(() -> new IllegalArgumentException("Topic with id " + id + " not found"));
  }

  @DeleteMapping("/delete/{id}")
  public String deleteTopic(@PathVariable int id) {
    return topicRepository.findById(id)
        .map(topic -> {
          topicRepository.deleteById(id);
          return "Topic deleted successfully";
        })
        .orElseThrow(() -> new IllegalArgumentException("Topic with id " + id + " not found"));
  }
}

