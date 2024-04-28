package smw.capstone.common.filter;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import smw.capstone.entity.Member;
import smw.capstone.repository.MemberRepository;

@RequiredArgsConstructor
@Component
public class CustomUserDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Member memberEntity = memberRepository.findMemberByEmail(email);
        return new PrincipalDetails(memberEntity);
    }
}
