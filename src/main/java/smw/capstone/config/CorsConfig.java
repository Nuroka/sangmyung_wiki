package smw.capstone.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    private final long MAX_AGE_SECS = 3600;

    @Value("${jwt.access.header}")
    private String accessHeader;
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "https://smuwiki.com", "http://smuwiki.com")
                // GET, POST, PATCH, DELETE, OPTIONS 메서드 허용
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .exposedHeaders(accessHeader)
                .maxAge(MAX_AGE_SECS);

    }

}
