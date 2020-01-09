package com.capco.noc2020.config.security;

import com.capco.noc2020.util.ObjectMapperUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import static java.util.Collections.singletonMap;
import static java.util.Optional.ofNullable;

@Component
@Slf4j
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException {
        log.error("Authentication failed!");
        httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        String message = ofNullable(e).map(Exception::getLocalizedMessage).orElse(null);

        httpServletResponse.setContentType(MediaType.APPLICATION_JSON_VALUE);

        try (PrintWriter writer = httpServletResponse.getWriter()) {
            ObjectMapperUtil.getJson(singletonMap("Error", message)).ifPresent(writer::append);
        }
    }
}
