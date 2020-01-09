package com.capco.noc2020.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Optional;

public class ObjectMapperUtil {

    private static ObjectMapper objectMapper;

    public static Optional<String> getJson(Object item) {
        return Optional.ofNullable(item).map(v -> {
            try {
                return objectMapper.writeValueAsString(v);
            } catch (JsonProcessingException e) {
                throw new RuntimeException("Problem with processing json: [" + e.getLocalizedMessage() + "]. Stacktrace: [" + e.getStackTrace()[0] + "]");
            }
        });
    }

    public static void setObjectMapperSingleton(ObjectMapper objectMapper) {
        if (ObjectMapperUtil.objectMapper == null) {
            ObjectMapperUtil.objectMapper = objectMapper;
        }
    }
}
