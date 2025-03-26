package org.example.ecommerce.dto;



import org.example.ecommerce.enums.Role;

import java.time.LocalDateTime;

public class UserDTO {

    private Long id;
    private String email;
    private String name;
    private String phone;
    private String address;
    private Role role;
    private LocalDateTime createdAt;
    private Boolean verified;
    private Boolean isActive;

    // Constructor
    public UserDTO(Long id, String email, String name, String phone, String address, Role role, LocalDateTime createdAt, Boolean verified, Boolean isActive) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.role = role;
        this.createdAt = createdAt;
        this.verified = verified;
        this.isActive = isActive;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Boolean getVerified() {
        return verified;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}
