package org.example.ecommerce.models;

import org.example.ecommerce.enums.Role;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 100)
    private String email;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(length = 10)
    private String phone;

    @Column(length = 255)
    private String address;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "verified", nullable = false)
    private Boolean verified = false;
    @Column(name = "isactive", nullable = false)
    private Boolean isactive = false;

    @Column(name = "verificationToken")
    private String verificationToken;

    public User(){

    }

    public User(Long id, String verificationToken, Boolean verified, LocalDateTime createdAt, Role role, String password, String email, String phone, String address, boolean isactive) {
        this.id = id;
        this.verificationToken = verificationToken;
        this.verified = verified;
        this.createdAt = createdAt;
        this.role = role;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.isactive = isactive;

    }



    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public Role getRole() {
        return role;
    }

    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public Boolean getIsactive() {
        return isactive;
    }

    public void setIsactive(Boolean isactive) {
        this.isactive = isactive;
    }
    //Setters

    public void setId(Long id) {
        this.id = id;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public Boolean getVerified() {
        return verified;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }

    public String getVerificationToken() {
        return verificationToken;
    }

    public void setVerificationToken(String verificationToken) {
        this.verificationToken = verificationToken;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                ", createdAt=" + createdAt +
                ", verified=" + verified +
                ", verificationToken='" + verificationToken + '\'' +
                '}';
    }
}

