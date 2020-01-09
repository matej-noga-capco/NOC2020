package com.capco.noc2020.dao;

import com.capco.noc2020.dto.UserDto;
import com.capco.noc2020.entity.User;
import com.capco.noc2020.mapping.UserMapper;
import com.capco.noc2020.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class UserDao {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public List<UserDto> saveUsers(Collection<UserDto> usersDto) {
        if (!CollectionUtils.isEmpty(usersDto)) {
            List<User> users = usersDto.stream().map(userMapper::mapToUser).collect(Collectors.toList());
            return userRepository.saveAll(users).stream().map(userMapper::mapToUserDto).collect(Collectors.toList());
        }

        return null;
    }

    public UserDto saveUser(UserDto userDto) {
        if (userDto != null && userDto.getId() != null) {
            User user = userMapper.mapToUser(userDto);
            return userMapper.mapToUserDto(userRepository.save(user));
        } else {
            throw new IllegalArgumentException("User or ID is NULL!");
        }
    }

    public UserDto deleteUser(Long id) {
        if (id != null) {
            Optional<User> user = userRepository.findById(id);

            return user.map(u -> {
                userRepository.delete(u);
                return userMapper.mapToUserDto(u);
            }).orElseThrow(() -> new IllegalArgumentException("User with ID [" + id + "] doesn't exist in database!"));
        }
        throw new IllegalArgumentException("ID is NULL!");
    }

    public UserDto getUser(Long id) {
        if (id != null) {
            return userRepository.findById(id)
                    .map(userMapper::mapToUserDto)
                    .orElseThrow(() -> new IllegalArgumentException("User with ID [" + id + "] doesn't exist in database!"));
        }

        throw new IllegalArgumentException("ID is NULL!");
    }

    public List<UserDto> getUsers() {
        return userRepository.findAll().stream().map(userMapper::mapToUserDto).collect(Collectors.toList());
    }

    public Optional<User> getUserEntity(Long id) {
        if (id != null) {
            return userRepository.findById(id);
        }
        throw new IllegalArgumentException("ID is NULL!");
    }
}
