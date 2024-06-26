package smw.capstone.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registration) {
        registration.addResourceHandler("/**").addResourceLocations("file:///C:/Users/jykim/OneDrive/사진");
        registration.addResourceHandler("/**").addResourceLocations("classpath:/templates/"); //
    }
}
