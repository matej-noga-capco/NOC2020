package com.capco.noc2020.config;

import com.google.common.base.Predicates;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Value("info.app.name")
    private String appName;

    @Value("info.app.version")
    private String version;

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(metaData())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.capco.noc2020.controller"))
                .paths(Predicates.not(PathSelectors.regex("/error")))
                .build();
    }

    private ApiInfo metaData() {
        return new ApiInfo(
                appName,
                "REST API",
                version,
                "Terms of service",
                new Contact(
                        "Helmut Posch",
                        "www.capco.com",
                        "helmut.posch@capco.com"
                ),
                "None",
                "",
                new ArrayList<>(0)
        );
    }
}
