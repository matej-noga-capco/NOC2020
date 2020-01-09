package com.capco.noc2020.controller;

import com.capco.noc2020.dao.TransactionDao;
import com.capco.noc2020.dto.TransactionDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transaction")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionDao transactionDao;

    @GetMapping
    public List<TransactionDto> getTransactions() {
        return transactionDao.getTransactions();
    }

    @GetMapping("/{id}")
    public TransactionDto getTransactions(@PathVariable Long id) {
        return transactionDao.getTransaction(id);
    }

    @PutMapping
    public void updateTransaction(@RequestBody TransactionDto transaction) {
        transactionDao.saveTransaction(transaction);
    }

    @PostMapping
    public TransactionDto addTransaction(@RequestBody TransactionDto transaction) {
        return transactionDao.saveTransaction(transaction);
    }

    @DeleteMapping
    public TransactionDto deleteTransaction(@PathVariable Long id) {
        return transactionDao.deleteTransaction(id);
    }

}
