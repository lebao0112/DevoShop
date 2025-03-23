package org.example.ecommerce.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {


    private String secretKey = "9655b613d476144f50f8fe8caebcbab05eb47cfd8cd26e5d8a494d35e4c90e021871c6bf5d8938d4b7c52851d18781c105186a30a813ddd933a87c4ccd9975982630c8ecb3f884f38998e37274ddf733d294eac5bf0e19c469e6c5aa6f1cba5ea8782d7fe28b223cb6d503ecb9be7bd484099708c121fa3ff8e7bd85247a4bbcbd60356a8b3376552b916681a7bda37eaab9c52d6cac0e9e3f390e908ba3f877b27e6d9b4bf36af23a9393b2059149262e43fae6d4e9f3a3ffa5d6747dc0d6563272c8022ec963f40b8ce809a0f62312f623a8b3b0af95a12a1bec2e865ee268451c36ee191903728e0b22d6c77a90e17944120fb193ad9dcfc7a77ccc399956";

//    public JwtService(){
//        try{
//            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
//            SecretKey sk = keyGen.generateKey();
//            secretKey = Base64.getEncoder().encodeToString(sk.getEncoded());
//        } catch(NoSuchAlgorithmException e){
//            throw new RuntimeException(e);
//        }
//    }

    public String generateToken(String username, String role) {
        Map<String, Object> claims = new HashMap<>();

        claims.put("role", role);

        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 60 * 60 * 60 * 30))
                .and()
                .signWith(getKey())
                .compact();


    }

    private SecretKey getKey(){
        byte[] keyBites = Decoders.BASE64.decode(secretKey);

        return Keys.hmacShaKeyFor(keyBites);
    }

    public String extractEmail(String token) {

        return extractClaims(token, Claims::getSubject);
    }

    private <T> T extractClaims(String token, Function<Claims, T> claimResolver) {
        final Claims claims = ExtractAllClaims(token);
        return claimResolver.apply(claims);
    }

    private Claims ExtractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build().parseSignedClaims(token)
                .getPayload();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String userEmail = extractEmail(token);

        return (userEmail.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaims(token, Claims::getExpiration);
    }
}
