package com.capco.noc2020.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.session.config.annotation.web.http.EnableSpringHttpSession;
import org.springframework.session.web.http.HeaderHttpSessionIdResolver;
import org.springframework.session.web.http.HttpSessionIdResolver;

@Configuration
@EnableSpringHttpSession
@Profile("http")
public class HttpSessionConfig {

    @Bean
    public HttpSessionIdResolver httpSessionResolver() {
        return HeaderHttpSessionIdResolver.xAuthToken();
    }

}
