package com.example.demo.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Court {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private String Name;
  private String city;
  @OneToMany(mappedBy = "court")
  @JsonIgnore
  private List<File> files;
}
