package com.example.demo.entities;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class File {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private String fileNumber;
  @Temporal(jakarta.persistence.TemporalType.DATE)
  private Date judgment;
  private double fees;
  @Temporal(jakarta.persistence.TemporalType.DATE)
  private Date experienceDate;
  private String reference;
  private boolean depositExpertReport;
  private boolean depositExpenseSheet;
  private String accountNumber;
  private boolean feeCollection;
  private String hour;
  @ManyToOne
  private Topic topic;
  @ManyToOne
  private ActionType actionType;
  @ManyToOne
  private Court court;
  @ManyToOne
  private Judge judge;
  @ManyToMany
  private List<Party> parties;
  @ManyToMany
  private List<Lawyer> lawyers;
}
