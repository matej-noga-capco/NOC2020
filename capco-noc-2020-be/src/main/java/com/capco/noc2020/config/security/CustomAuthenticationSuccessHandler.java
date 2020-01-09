package com.capco.noc2020.config.security;

import com.capco.noc2020.util.ObjectMapperUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collections;

@Component
@Slf4j
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException {
        httpServletResponse.setContentType(MediaType.APPLICATION_JSON_VALUE);

        try (PrintWriter writer = httpServletResponse.getWriter()) {
            ObjectMapperUtil.getJson(Collections.singletonMap("name", authentication.getName())).ifPresent(writer::append);
        }

        httpServletResponse.setStatus(HttpServletResponse.SC_OK);
    }
}
