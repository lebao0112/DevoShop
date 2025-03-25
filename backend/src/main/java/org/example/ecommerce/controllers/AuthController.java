package org.example.ecommerce.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.example.ecommerce.services.JwtService;
import org.example.ecommerce.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.example.ecommerce.models.User;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        String name = request.get("name");
        String message = userService.registerUser(email, password, name);

        if (message.equals("Email đã tồn tại!")) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", message));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", message));
    }

    // Kích hoạt tài khoản
    @GetMapping("/verify")
    public String verify(@RequestParam String token) {
        boolean verified = userService.verifyUser(token);
        return verified ? "Xác minh thành công! Bạn có thể đăng nhập." : "Xác minh thất bại!";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user){
        String token = userService.verify(user);
        if(token != null){
            return ResponseEntity.ok(Map.of("token", token));
        } else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Sai email hoặc mật khẩu!"));
        }
    }

    @GetMapping("/google-login")
    public String googleLogin() {
        return "Vui lòng đăng nhập bằng Google tại: <a href='/oauth2/authorization/google'>Đăng nhập</a>";
    }

   

    @GetMapping("/google-success")
    public Map<String, Object> googleSuccess(OAuth2AuthenticationToken token) {
        if (token == null) {
            throw new IllegalArgumentException("Token is null");
        }
        OAuth2User user = token.getPrincipal();
        return user.getAttributes();
    }


    @GetMapping("/profile")
    public ResponseEntity<?> getProfileInfo(HttpServletRequest request){
        String authorizationHeader = request.getHeader("Authorization");
        if(authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")){
            return ResponseEntity.status(401).body(Map.of(
                    "error", "Missing or invalid token"
            ));
        }

        String token = authorizationHeader.substring(7);
        String email = jwtService.extractEmail(token);

        Optional<User> userOptional = userService.getUserByEmail(email);

        if(userOptional.isEmpty()){
            return ResponseEntity.status(404).body(Map.of(
                    "error", "User not found"
            ));
        }

        User user = userOptional.get();

        return ResponseEntity.ok(Map.of(
                "name", user.getName() != null ? user.getName() : "",
                "email", user.getEmail() != null ? user.getEmail() : "",
                "phone", user.getPhone() != null ? user.getPhone() : "",
                "address", user.getAddress() != null ? user.getAddress() : ""

        ));
    }

}
