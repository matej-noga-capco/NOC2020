package com.capco.noc2020.mapping;

import com.capco.noc2020.dto.UserDto;
import com.capco.noc2020.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDto mapToUserDto(User user) {
        UserDto userDto = new UserDto();

        userDto.setId(user.getId());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setUsername(user.getUsername());
        userDto.setBirthDate(user.getBirthDate());
        userDto.setIban(user.getIban());
        userDto.setToken(user.getToken());

        return userDto;
    }

    public User mapToUser(UserDto userDto) {
        User user = new User();

        user.setId(userDto.getId());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setUsername(userDto.getUsername());
        user.setBirthDate(userDto.getBirthDate());
        user.setIban(userDto.getIban());
        user.setToken(userDto.getToken());

        return user;
    }

}
