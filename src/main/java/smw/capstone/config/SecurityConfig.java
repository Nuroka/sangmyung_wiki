package smw.capstone.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import smw.capstone.common.provider.JwtProvider;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(AbstractHttpConfigurer::disable)
                // token을 사용하는 방식이기 때문에 csrf를 disable합니다.
                .csrf(AbstractHttpConfigurer::disable);



        http
                .authorizeHttpRequests(auth ->
                        auth
//                                .requestMatchers(new AntPathRequestMatcher("/**")).permitAll()
                                .requestMatchers(new AntPathRequestMatcher("/favicon.ico")).permitAll()
                                .requestMatchers(new AntPathRequestMatcher("/img/**")).permitAll()
                                .requestMatchers(new AntPathRequestMatcher("/user")).permitAll()
                                .requestMatchers(new AntPathRequestMatcher("/signin/**")).permitAll()
                                .requestMatchers(new AntPathRequestMatcher("/error")).permitAll()
                                .requestMatchers(new AntPathRequestMatcher("/docs/search")).permitAll()
                                .requestMatchers(new AntPathRequestMatcher("/docs/all")).permitAll()
                                .requestMatchers(new AntPathRequestMatcher("/docs/recommend")).permitAll()
                                .requestMatchers(new AntPathRequestMatcher("/docs/edit")).permitAll()
                                .requestMatchers(new AntPathRequestMatcher("/doc")).permitAll()
                                .requestMatchers(new AntPathRequestMatcher("/comment/board")).permitAll()
                                .requestMatchers(new AntPathRequestMatcher("/comment")).permitAll()
                                .requestMatchers(new AntPathRequestMatcher("/board")).permitAll()
//                                .requestMatchers(new AntPathRequestMatcher("/board/one")).permitAll()
                                .requestMatchers(new AntPathRequestMatcher("/board/popular")).permitAll()
                                .requestMatchers(new AntPathRequestMatcher("/docs/recent")).permitAll()
                                .requestMatchers(new AntPathRequestMatcher("/board/all")).permitAll()
                                .requestMatchers(new AntPathRequestMatcher("/docs/log/**")).permitAll()
//                                .requestMatchers(new AntPathRequestMatcher("/img-url")).permitAll()
/*                                .requestMatchers(new AntPathRequestMatcher("/file")).permitAll() //test 후 security 적용
                                .requestMatchers(new AntPathRequestMatcher("img-url/**")).permitAll() //test 후 security 적용*/


                                .anyRequest().permitAll());

        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {

        return (web) -> web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations())
                .requestMatchers(new AntPathRequestMatcher("/user"))
                .requestMatchers(new AntPathRequestMatcher("/recent"))
                .requestMatchers(new AntPathRequestMatcher("/popular"))
                /*.requestMatchers(new AntPathRequestMatcher("/file"))
                .requestMatchers(new AntPathRequestMatcher("/img-url/**"))*/

                .requestMatchers(new AntPathRequestMatcher("/signin/**"));
    }
}

