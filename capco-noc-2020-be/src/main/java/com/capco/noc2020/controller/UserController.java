package com.capco.noc2020.controller;

import com.capco.noc2020.dao.UserDao;
import com.capco.noc2020.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserDao userDao;

    @GetMapping
    public List<UserDto> getUsers() {
        return userDao.getUsers();
    }

    @GetMapping("/{id}")
    public UserDto getUsers(@PathVariable Long id) {
        return userDao.getUser(id);
    }

    @PutMapping
    public void updateUser(@RequestBody UserDto user) {
        userDao.saveUser(user);
    }

    @PostMapping
    public UserDto addUser(@RequestBody UserDto user) {
        return userDao.saveUser(user);
    }

    @DeleteMapping
    public UserDto deleteUser(@PathVariable Long id) {
        return userDao.deleteUser(id);
    }
}
