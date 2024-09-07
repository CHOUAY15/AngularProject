package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Party {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private String fullName;
  private String address;
  @ManyToOne
  private Feature feature;
  @ManyToMany(mappedBy = "parties")
  @JsonIgnore
  private List<File> files = new ArrayList<>();;
}
