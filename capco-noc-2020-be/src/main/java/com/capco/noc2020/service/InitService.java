package com.capco.noc2020.service;

import com.capco.noc2020.dao.TransactionDao;
import com.capco.noc2020.dao.UserDao;
import com.capco.noc2020.dto.TransactionDto;
import com.capco.noc2020.dto.UserDto;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class InitService {

    private final ObjectMapper objectMapper;
    private final ResourceLoader resourceLoader;
    private final UserDao userDao;
    private final TransactionDao transactionDao;

    @PostConstruct
    private void init() throws IOException {
        final String usersJson = getJson("users.json");
        final String transactionsJson = getJson("transactions.json");

        final List<UserDto> users = objectMapper.readValue(usersJson, new TypeReference<List<UserDto>>() {
        });
        final List<TransactionDto> transactions = objectMapper.readValue(transactionsJson, new TypeReference<List<TransactionDto>>() {
        });

        userDao.saveUsers(users);
        transactionDao.saveTransactions(transactions);
    }

    private String getJson(String fileName) throws IOException {
        return IOUtils.toString(resourceLoader.getResource("classpath:jsons/" + fileName).getInputStream(), StandardCharsets.UTF_8.name());
    }

    private String getJsonAbsolute(String fileName) throws IOException {
        return IOUtils.toString(resourceLoader.getResource("file:C:\\Projects\\noc-project\\NOC2020\\capco-noc-2020-be\\src\\main\\resources\\jsons\\" + fileName).getInputStream(), StandardCharsets.UTF_8.name());
    }
}
