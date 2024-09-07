package com.example.demo.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.ActionType;
import com.example.demo.repositories.ActionTypeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
@RequestMapping("/api/action-type")
public class ActionTypeController {

  @Autowired
  private ActionTypeRepository actionTypeRepository;

  @GetMapping("/all")
  public List<ActionType> findAll() {
    return actionTypeRepository.findAll();
  }

  @GetMapping("/{id}")
  public ActionType findById(@PathVariable int id) {
    return actionTypeRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("ActionType with id " + id + " not found"));
  }

  @PostMapping("/create")
  public ActionType createActionType(@RequestBody ActionType actionType) {
    return actionTypeRepository.save(actionType);
  }

  @PutMapping("/update/{id}")
  public ActionType updateActionType(@PathVariable int id, @RequestBody ActionType updatedActionType) {
    return actionTypeRepository.findById(id)
        .map(actionType -> {
          actionType.setDescription(updatedActionType.getDescription());
          return actionTypeRepository.save(actionType);
        })
        .orElseThrow(() -> new IllegalArgumentException("ActionType with id " + id + " not found"));
  }

  @DeleteMapping("/delete/{id}")
  public String deleteActionType(@PathVariable int id) {
    return actionTypeRepository.findById(id)
        .map(actionType -> {
          actionTypeRepository.deleteById(id);
          return "ActionType deleted successfully";
        })
        .orElseThrow(() -> new IllegalArgumentException("ActionType with id " + id + " not found"));
  }
}

