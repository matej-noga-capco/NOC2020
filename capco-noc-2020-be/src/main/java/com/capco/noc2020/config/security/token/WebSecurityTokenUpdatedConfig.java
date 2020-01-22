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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Profile("tokenUpdated")
@EnableSpringHttpSession
public class WebSecurityTokenUpdatedConfig extends WebSecurityConfig {

    public WebSecurityTokenUpdatedConfig(CustomAuthenticationFailureHandler customAuthenticationFailureHandler, CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler, CustomLogoutSuccessHandler customLogoutSuccessHandler) {
        super(customAuthenticationFailureHandler, customAuthenticationSuccessHandler, customLogoutSuccessHandler);
    }

    @Bean
    public HttpSessionIdResolver httpSessionResolver() {
        return HeaderHttpSessionIdResolver.xAuthToken();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "OPTIONS", "DELETE", "PUT", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("X-Requested-With", "Origin", "Content-Type", "Accept", "Authorization"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
