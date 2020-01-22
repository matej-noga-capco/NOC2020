package com.capco.noc2020.config.security.token;

import com.capco.noc2020.config.security.CustomAuthenticationFailureHandler;
import com.capco.noc2020.config.security.CustomAuthenticationSuccessHandler;
import com.capco.noc2020.config.security.CustomLogoutSuccessHandler;
import com.capco.noc2020.config.security.WebSecurityConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.session.config.annotation.web.http.EnableSpringHttpSession;
import org.springframework.session.web.http.HeaderHttpSessionIdResolver;
import org.springframework.session.web.http.HttpSessionIdResolver;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableSpringHttpSession
@Profile("token")
public class WebSecurityTokenBasicConfig extends WebSecurityConfig {

    public WebSecurityTokenBasicConfig(CustomAuthenticationFailureHandler customAuthenticationFailureHandler, CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler, CustomLogoutSuccessHandler customLogoutSuccessHandler) {
        super(customAuthenticationFailureHandler, customAuthenticationSuccessHandler, customLogoutSuccessHandler);
    }

    @Bean
    public HttpSessionIdResolver httpSessionResolver() {
        return HeaderHttpSessionIdResolver.xAuthToken();
    }
}
