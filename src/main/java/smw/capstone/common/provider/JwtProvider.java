package smw.capstone.common.provider;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import smw.capstone.common.exception.BusinessException;
import smw.capstone.common.exception.CustomErrorCode;
import smw.capstone.common.filter.CustomUserDetailsService;
import smw.capstone.entity.Member;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtProvider {

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.access.header}")
    private String accessHeader;

    private final CustomUserDetailsService customUserDetailsService;
    public String create(String email){

        Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));

        String jwt = Jwts.builder()
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .setSubject(email).setIssuedAt(new Date()) //sum: email
                .setExpiration(expiredDate)
                .compact();

        return jwt;
    }

    public String validate(String jwt){
        Claims claims = null;

        try{
            claims = Jwts.parser().setSigningKey(secretKey)
                    .parseClaimsJws(jwt).getBody();

        } catch (Exception exception){
            exception.printStackTrace();
            return null;
        }

        return claims.getSubject();
    }

    public void sendAccessToken(HttpServletResponse response, String accessToken) {
        response.setStatus((HttpServletResponse.SC_OK));
        response.setHeader(accessHeader, accessToken);
    }

    public void saveAuthentication(Member member) {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(member.getEmail());

        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
