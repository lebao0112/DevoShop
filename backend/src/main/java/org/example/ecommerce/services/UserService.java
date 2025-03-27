package org.example.ecommerce.services;

import io.jsonwebtoken.Jwt;
import org.example.ecommerce.dto.UserDTO;
import org.example.ecommerce.enums.AuthProvider;
import org.example.ecommerce.enums.Role;
import org.example.ecommerce.models.User;
import org.example.ecommerce.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtService jwtService;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String registerUser(String email, String password, String name) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            return "Email đã tồn tại!";
        }

        String hashedPassword = passwordEncoder.encode(password);
        String verificationToken = UUID.randomUUID().toString();

        User user = new User();
        user.setEmail(email);
        user.setName(name);
        user.setPassword(hashedPassword);
        user.setRole(Role.CUSTOMER);
        user.setVerificationToken(verificationToken);
        user.setAuthProvider(AuthProvider.LOCAL);
        userRepository.save(user);

        String verificationLink = "http://localhost:8080/api/auth/verify?token=" + verificationToken;
        emailService.sendVerificationEmail(email, verificationLink, name);
        return "Vui lòng kiểm tra email để xác minh tài khoản.";
    }

    public User registerUserGoogle(OAuth2AuthenticationToken auth2AuthenticationToken){
        OAuth2User oAuth2User = auth2AuthenticationToken.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        System.out.println("User Email From Google: " + email);
        System.out.println("User Name From Google: " + name);

        User user = userRepository.findByEmail(email).orElse(null);
        if(user == null){
            user = new User();
            user.setEmail(email);
            user.setName(name);
            user.setRole(Role.CUSTOMER);
            user.setPassword("");
            user.setVerified(true);
            user.setIsactive(true);
            user.setAuthProvider(AuthProvider.GOOGLE);
            userRepository.save(user);
        }
        return user;
    }

    public boolean verifyUser(String token) {
        Optional<User> userOpt = userRepository.findByVerificationToken(token);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setVerified(true);
            user.setVerificationToken(null);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User updateUser(Long id, User userDetails) {
        return userRepository.findById(id).map(user -> {
            user.setEmail(userDetails.getEmail());
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public String verify(User user) {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        if (authentication.isAuthenticated()) {
            String role = authentication.getAuthorities().stream()
                    .findFirst()
                    .map(GrantedAuthority::getAuthority)
                    .orElse("ROLE_ANONYMOUS"); // default role

            return jwtService.generateToken(user.getEmail(), role);
        }
        return "Fail";
    }
}