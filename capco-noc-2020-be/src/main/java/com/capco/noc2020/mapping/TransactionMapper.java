package com.capco.noc2020.mapping;

import com.capco.noc2020.dao.UserDao;
import com.capco.noc2020.dto.TransactionDto;
import com.capco.noc2020.entity.Transaction;
import com.capco.noc2020.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import static java.util.Optional.of;

@Component
@RequiredArgsConstructor
public class TransactionMapper {

    private final UserDao userDao;

    public TransactionDto mapToTransactionDto(Transaction transaction) {
        TransactionDto transactionDto = new TransactionDto();

        transactionDto.setId(transaction.getId());
        transactionDto.setAmount(transaction.getAmount());
        transactionDto.setDate(transaction.getDate());
        transactionDto.setPayer(of(transaction).map(Transaction::getPayer).map(User::getId).orElse(null));
        transactionDto.setReceiver(of(transaction).map(Transaction::getReceiver).map(User::getId).orElse(null));

        return transactionDto;
    }

    public Transaction mapToTransaction(TransactionDto transactionDto) {
        Transaction transaction = new Transaction();

        transaction.setId(transactionDto.getId());
        transaction.setAmount(transactionDto.getAmount());
        transaction.setDate(transactionDto.getDate());
        transaction.setPayer(of(transactionDto).map(TransactionDto::getPayer).flatMap(userDao::getUserEntity).orElse(null));
        transaction.setReceiver(of(transactionDto).map(TransactionDto::getReceiver).flatMap(userDao::getUserEntity).orElse(null));

        return transaction;
    }

}
