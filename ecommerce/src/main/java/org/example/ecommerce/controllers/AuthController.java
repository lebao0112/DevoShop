package org.example.ecommerce.controllers;

import org.example.ecommerce.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthController {
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

    @GetMapping("/verify")
    public String verify(@RequestParam String token) {
        boolean verified = userService.verifyUser(token);
        return verified ? "Xác minh thành công! Bạn có thể đăng nhập." : "Xác minh thất bại!";
    }
}
