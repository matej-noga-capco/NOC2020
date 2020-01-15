package com.capco.noc2020.entity;

import lombok.Data;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.time.LocalDate;
import java.util.Set;

@Data
@ToString
@Entity(name = "user")
public class User {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private LocalDate birthDate;
    private String iban;
    private String token;
    @OneToMany
    private Set<Transaction> receivedTransactions;
    @OneToMany
    private Set<Transaction> payedTransactions;
}
