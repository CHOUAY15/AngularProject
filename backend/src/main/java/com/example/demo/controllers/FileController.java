package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.File;
import com.example.demo.entities.Lawyer;
import com.example.demo.entities.Party;
import com.example.demo.repositories.FileRepository;
import com.example.demo.services.FileService;

import java.util.*;


@RestController
@RequestMapping("/api/file")
public class FileController {

  @Autowired
  private FileService fileService;

  @Autowired
  private FileRepository fileRepository;

  @GetMapping("/all")
  public List<File> findAll() {
    return fileRepository.findAll();
  }

    @GetMapping("/{id}")
    public Optional<File> getById(@PathVariable int id) {
        return fileRepository.findById(id);
    }

  @DeleteMapping("/delete/{fileId}")
  public ResponseEntity<Object> deleteFile(@PathVariable int fileId) {
    try {
      fileService.removeFileWithAssociations(fileId);
      return new ResponseEntity<>("File deleted successfully", HttpStatus.OK);
    } catch (IllegalArgumentException e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping("/create")
  public ResponseEntity<Object> createFile(@RequestBody File file) {
    try {
      File createdFile = fileService.createFileWithAssociations(file);
      return new ResponseEntity<>(createdFile, HttpStatus.CREATED);
    } catch (IllegalArgumentException e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<Object> updateFileAttributes(@PathVariable int id, @RequestBody File updatedFile) {
    try {
      File existingFile = fileService.updateFileAttributes(id, updatedFile);
      return new ResponseEntity<>(existingFile, HttpStatus.OK);
    } catch (IllegalArgumentException e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping("/addParty/{fileId}")
  public ResponseEntity<Object> createAndAddPartyToFile(@PathVariable int fileId, @RequestBody Party party) {
    try {
      Party updatedFile = fileService.createAndAddPartyToFile(fileId, party);
      return new ResponseEntity<>(updatedFile, HttpStatus.OK);
    } catch (IllegalArgumentException e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/removeParty/{fileId}/{partyId}")
  public ResponseEntity<Object> removePartyFromFile(@PathVariable int fileId, @PathVariable int partyId) {
    try {
      File updatedFile = fileService.removePartyFromFile(fileId, partyId);
      return new ResponseEntity<>(updatedFile, HttpStatus.OK);
    } catch (IllegalArgumentException e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping("/addLawyer/{fileId}")
  public ResponseEntity<Object> createAndAddLawyerToFile(@PathVariable int fileId, @RequestBody Lawyer lawyer) {
    try {
      Lawyer updatedFile = fileService.createAndAddLawyerToFile(fileId, lawyer);
      return new ResponseEntity<>(updatedFile, HttpStatus.OK);
    } catch (IllegalArgumentException e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/removeLawyer/{fileId}/{lawyerId}")
  public ResponseEntity<Object> removeLawyerFromFile(@PathVariable int fileId, @PathVariable int lawyerId) {
    try {
      File updatedFile = fileService.removeLawyerFromFile(fileId, lawyerId);
      return new ResponseEntity<>(updatedFile, HttpStatus.OK);
    } catch (IllegalArgumentException e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
   @GetMapping("/parties/{id}")
  public ResponseEntity<List<Party>> getPartiesByFileId(@PathVariable int id) {
    Optional<File> file = fileRepository.findById(id);
    if (file.isPresent()) {
      return ResponseEntity.ok(file.get().getParties());
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @GetMapping("/lawyers/{id}")
  public ResponseEntity<List<Lawyer>> getLawyersByFileId(@PathVariable int id) {
    Optional<File> file = fileRepository.findById(id);
    if (file.isPresent()) {
      return ResponseEntity.ok(file.get().getLawyers());
    } else {
      return ResponseEntity.notFound().build();
    }
  }

}