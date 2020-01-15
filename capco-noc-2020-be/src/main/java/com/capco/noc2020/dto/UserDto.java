package com.capco.noc2020.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private LocalDate birthDate;
    private String iban;
    private String token;
}
