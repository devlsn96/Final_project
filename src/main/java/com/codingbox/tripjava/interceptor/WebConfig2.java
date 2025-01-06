package com.codingbox.tripjava.interceptor;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig2 implements WebMvcConfigurer{
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(new LoginCheckInterceptor())
		.addPathPatterns("/**")
		.excludePathPatterns("/api", "/api/login", "/api/logout", "/api/kakao-logout", "/api/regit",
		 "/api/email-check", "/api/accommodation/**", "/api/accommodations/**", "**/register-phone", "/api/session/**",
		 "/api/auth/kakao", "/auth/kakao/callback");
	}
}
