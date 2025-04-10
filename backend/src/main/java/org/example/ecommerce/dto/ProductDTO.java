package org.example.ecommerce.dto;

import org.example.ecommerce.enums.ProductStatus;
import org.example.ecommerce.models.Brand;
import org.example.ecommerce.models.Category;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private int stockQuantity;
    private String scale;
    private String imageUrl;
    private Category category;
    private Brand brand;
    private ProductStatus status;
    private LocalDateTime createdAt;

    public ProductDTO() {
    }

    public ProductDTO(Long id, LocalDateTime createdAt, ProductStatus status, Category category, int stockQuantity, BigDecimal price, String description, String name, String scale, String imageUrl, Brand brand) {
        this.id = id;
        this.createdAt = createdAt;
        this.status = status;
        this.category = category;
        this.stockQuantity = stockQuantity;
        this.price = price;
        this.description = description;
        this.name = name;
        this.scale = scale;
        this.brand = brand;
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProductStatus getStatus() {
        return status;
    }

    public void setStatus(ProductStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getScale() {
        return scale;
    }

    public void setScale(String scale) {
        this.scale = scale;
    }

    public int getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(int stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}

