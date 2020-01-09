package com.capco.noc2020.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class TransactionDto {
    private Long id;
    private LocalDateTime date;
    private Long payer;
    private Long receiver;
    private BigDecimal amount;
}
