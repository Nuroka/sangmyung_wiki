package smw.capstone.common.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import smw.capstone.common.exception.BusinessException;
import smw.capstone.common.exception.CustomErrorCode;
import smw.capstone.common.provider.JwtProvider;
import smw.capstone.repository.MemberRepository;

import java.io.IOException;


@Slf4j
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;
    private final MemberRepository memberRepository;

    private static final String[] urls = {"/user", "/recent", "/popular","/signin/email", "/signin/email/1", "/signin/email/2",
            "/signin/ID", "/find/ID", "/find/ID/1", "/find/ID/2","/docs/search", "/docs/all", "/docs/recommend", "/doc", "/comment/one", "/comment/board", "/board/one", "/board/popular",
            "/docs/recent", "/board/all", "/docs/recent/reverse"
    };
    public JwtAuthenticationFilter(MemberRepository memberRepository, JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
        this.memberRepository = memberRepository;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {


        try{
            for (String url:urls) {
                if(request.getRequestURI().equals(url) || request.getMethod().equals("OPTIONS")) {
                    filterChain.doFilter(request, response);
                    return;
                }
            }

            log.info("jwt 필터 작동");
            String token = parseBearerToken(request);

            String email = jwtProvider.validate(token);
            System.out.println("멤버이메일: " + email);

            if(email==null){
                filterChain.doFilter(request, response);
                return;
            }

//            AbstractAuthenticationToken authenticationToken =
//                    new UsernamePasswordAuthenticationToken(email, null, AuthorityUtils.NO_AUTHORITIES);
//            System.out.println(authenticationToken);
//            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//
//            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
//            securityContext.setAuthentication(authenticationToken);
//
//            SecurityContextHolder.setContext(securityContext);

            jwtProvider.saveAuthentication(memberRepository.findMemberByEmail(email));
        }catch (NullPointerException e){
//            e.printStackTrace();
            throw new BusinessException(CustomErrorCode.EMPTY_TOKEN);
        }

        filterChain.doFilter(request, response);
    }

    private String parseBearerToken(HttpServletRequest request){
            String authorization = request.getHeader("Authorization");
            if (authorization == null) {
                log.error("Authorization 헤더가 비어있습니다.");
                throw new NullPointerException();
            }

            boolean hasAuthorization = StringUtils.hasText("authorization");

            if (!hasAuthorization) {
                log.error("authorization 헤더가 비어있습니다");
                throw new NullPointerException();
            }

            boolean isBearer = authorization.startsWith("Bearer ");
            if (!isBearer) {
                log.error("Bearer로 시작하지 않습니다.");
                throw new NullPointerException();
            }

            String token = authorization.substring(7);

            return token;

    }
}
