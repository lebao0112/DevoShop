package org.example.ecommerce.controllers.customer;


import jakarta.servlet.http.HttpServletRequest;
import org.example.ecommerce.models.User;
import org.example.ecommerce.services.JwtService;
import org.example.ecommerce.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/customer/user")
public class UserController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

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
