package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entities.File;
import com.example.demo.entities.Lawyer;
import com.example.demo.entities.Party;
import com.example.demo.repositories.FileRepository;
import com.example.demo.repositories.LawyerRepository;
import com.example.demo.repositories.PartyRepository;

import java.util.List;
import java.util.ArrayList;

@Service
public class FileService {

  @Autowired
  private FileRepository fileRepository;

  @Autowired
  private LawyerRepository lawyerRepository;

  @Autowired
  private PartyRepository partyRepository;

  @Transactional
  public File createFileWithAssociations(File file) {

    List<Party> savedParties = new ArrayList<>();
    if (file.getParties() != null) {
      for (Party party : file.getParties()) {
        Party existingParty = partyRepository.findByFullNameAndFeature(party.getFullName(), party.getFeature());
        if (existingParty != null) {
          savedParties.add(existingParty);
        } else {
          Party savedParty = partyRepository.save(party);
          savedParties.add(savedParty);
        }
      }
    } else {
      file.setParties(null);
    }

    List<Lawyer> savedLawyers = new ArrayList<>();
    if (file.getLawyers() != null) {
      for (Lawyer lawyer : file.getLawyers()) {
        Lawyer existingLawyer = lawyerRepository.findByFullName(lawyer.getFullName());
        if (existingLawyer != null) {
          savedLawyers.add(existingLawyer);
        } else {
          Lawyer savedLawyer = lawyerRepository.save(lawyer);
          savedLawyers.add(savedLawyer);
        }
      }
    } else {
      file.setLawyers(null);
    }

    file.setParties(savedParties.isEmpty() ? null : savedParties);
    file.setLawyers(savedLawyers.isEmpty() ? null : savedLawyers);

    File savedFile = fileRepository.save(file);

    if (savedParties != null) {
      for (Party party : savedParties) {
        if (party.getFiles() == null) {
          party.setFiles(new ArrayList<>());
        }
        party.getFiles().add(savedFile);
        partyRepository.save(party);
      }
    }

    if (savedLawyers != null) {
      for (Lawyer lawyer : savedLawyers) {
        if (lawyer.getFiles() == null) {
          lawyer.setFiles(new ArrayList<>());
        }
        lawyer.getFiles().add(savedFile);
        lawyerRepository.save(lawyer);
      }
    }

    return savedFile;
  }

  public File updateFileAttributes(int id, File updatedFile) {
    return fileRepository.findById(id).map(existingFile -> {
      existingFile.setFileNumber(updatedFile.getFileNumber());
      existingFile.setJudgment(updatedFile.getJudgment());
      existingFile.setFees(updatedFile.getFees());
      existingFile.setExperienceDate(updatedFile.getExperienceDate());
      existingFile.setReference(updatedFile.getReference());
      existingFile.setDepositExpertReport(updatedFile.isDepositExpertReport());
      existingFile.setDepositExpenseSheet(updatedFile.isDepositExpenseSheet());
      existingFile.setAccountNumber(updatedFile.getAccountNumber());
      existingFile.setFeeCollection(updatedFile.isFeeCollection());
      existingFile.setHour(updatedFile.getHour());
      existingFile.setTopic(updatedFile.getTopic());
      existingFile.setActionType(updatedFile.getActionType());
      existingFile.setCourt(updatedFile.getCourt());
      existingFile.setJudge(updatedFile.getJudge());
      return fileRepository.save(existingFile);
    }).orElseThrow(() -> new IllegalArgumentException("File with id " + id + " not found"));
  }

  @Transactional
  public Party createAndAddPartyToFile(int fileId, Party newParty) {
    File file = fileRepository.findById(fileId)
        .orElseThrow(() -> new IllegalArgumentException("File with id " + fileId + " not found"));

    Party existingParty = partyRepository.findByFullNameAndFeature(newParty.getFullName(), newParty.getFeature());

    Party partyToAdd;

    if (existingParty != null) {
      partyToAdd = existingParty;
      partyToAdd.getFiles().add(file);
      partyToAdd = partyRepository.save(partyToAdd);
      file.getParties().add(partyToAdd);
      return partyToAdd;


    } else {
      newParty.getFiles().add(file);
      partyToAdd = partyRepository.save(newParty);
      file.getParties().add(partyToAdd);
      return partyToAdd;


    }

   
  }

  @Transactional
  public File removePartyFromFile(int fileId, int partyId) {
    File file = fileRepository.findById(fileId)
        .orElseThrow(() -> new IllegalArgumentException("File with id " + fileId + " not found"));

    Party party = partyRepository.findById(partyId)
        .orElseThrow(() -> new IllegalArgumentException("Party with id " + partyId + " not found"));

    file.getParties().remove(party);
    party.getFiles().remove(file);
    return fileRepository.save(file);
  }

  @Transactional
  public Lawyer createAndAddLawyerToFile(int fileId, Lawyer newLawyer) {
    File file = fileRepository.findById(fileId)
        .orElseThrow(() -> new IllegalArgumentException("File with id " + fileId + " not found"));
    Lawyer existingLawyer = lawyerRepository.findByFullName(newLawyer.getFullName());

    Lawyer lawyerToAdd;

    if (existingLawyer != null) {
      lawyerToAdd = existingLawyer;
      lawyerToAdd.getFiles().add(file);
      lawyerToAdd = lawyerRepository.save(lawyerToAdd);
      file.getLawyers().add(lawyerToAdd);
      return lawyerToAdd;
    } else {
      newLawyer.getFiles().add(file);
      lawyerToAdd = lawyerRepository.save(newLawyer);
      file.getLawyers().add(lawyerToAdd);
      return lawyerToAdd;
    }

  }

  @Transactional
  public File removeLawyerFromFile(int fileId, int lawyerId) {
    File file = fileRepository.findById(fileId)
        .orElseThrow(() -> new IllegalArgumentException("File with id " + fileId + " not found"));

    Lawyer lawyer = lawyerRepository.findById(lawyerId)
        .orElseThrow(() -> new IllegalArgumentException("Lawyer with id " + lawyerId + " not found"));
    file.getLawyers().remove(lawyer);
    lawyer.getFiles().remove(file);
    return fileRepository.save(file);
  }

  public void removeFileWithAssociations(int fileId) {
    File file = fileRepository.findById(fileId)
        .orElseThrow(() -> new IllegalArgumentException("File with id " + fileId + " not found"));
    List<Party> parties = file.getParties();
    for (Party party : parties) {
      party.getFiles().remove(file);
    }
    List<Lawyer> lawyers = file.getLawyers();
    for (Lawyer lawyer : lawyers) {
      lawyer.getFiles().remove(file);
    }
    fileRepository.delete(file);
  }
}