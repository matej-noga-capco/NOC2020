package com.capco.noc2020.dao;

import com.capco.noc2020.dto.TransactionDto;
import com.capco.noc2020.entity.Transaction;
import com.capco.noc2020.mapping.TransactionMapper;
import com.capco.noc2020.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class TransactionDao {

    private final TransactionRepository transactionRepository;
    private final TransactionMapper transactionMapper;

    public TransactionDto saveTransaction(TransactionDto transactionDto) {
        if (transactionDto != null && transactionDto.getId() != null) {
            Transaction transaction = transactionMapper.mapToTransaction(transactionDto);
            return transactionMapper.mapToTransactionDto(transactionRepository.save(transaction));
        } else {
            throw new IllegalArgumentException("Transaction or ID is NULL!");
        }
    }

    public List<TransactionDto> saveTransactions(Collection<TransactionDto> transactionsDto) {
        if (!CollectionUtils.isEmpty(transactionsDto)) {
            List<Transaction> transactions = transactionsDto.stream().map(transactionMapper::mapToTransaction).collect(Collectors.toList());
            return transactionRepository.saveAll(transactions).stream().map(transactionMapper::mapToTransactionDto).collect(Collectors.toList());
        }

        return null;
    }

    public TransactionDto deleteTransaction(Long id) {
        if (id != null) {
            Optional<Transaction> transaction = transactionRepository.findById(id);

            return transaction.map(t -> {
                transactionRepository.delete(t);
                return transactionMapper.mapToTransactionDto(t);
            }).orElseThrow(() -> new IllegalArgumentException("Transaction with ID [" + id + "] doesn't exist in database!"));
        }
        throw new IllegalArgumentException("ID is NULL!");
    }

    public TransactionDto getTransaction(Long id) {
        if (id != null) {
            return transactionRepository.findById(id)
                    .map(transactionMapper::mapToTransactionDto)
                    .orElseThrow(() -> new IllegalArgumentException("Transaction with ID [" + id + "] doesn't exist in database!"));
        }

        throw new IllegalArgumentException("ID is NULL!");
    }

    public List<TransactionDto> getTransactions() {
        return transactionRepository.findAll().stream().map(transactionMapper::mapToTransactionDto).collect(Collectors.toList());
    }

    public Optional<Transaction> getTransactionEntity(Long id) {
        if (id != null) {
            return transactionRepository.findById(id);
        }
        throw new IllegalArgumentException("ID is NULL!");
    }

}
