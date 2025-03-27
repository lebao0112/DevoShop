package org.example.ecommerce.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import org.example.ecommerce.enums.ProductStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;


    @Column(columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "Product price is required")
    @Column(nullable = false, precision = 10, scale = 2)
    @Min(value = 0, message = "Price must be positive number")
    private BigDecimal price;

    @Column(nullable = false)
    @Min(value = 0, message = "stockQuantity must be positive number")
    private int stockQuantity;

    @Column(nullable = false, length = 4)
    private String scale;

    @Column(columnDefinition = "TEXT")
    private String imageUrl;

    @NotNull(message = "Category cannot be null")
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProductStatus status;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Product() {
    }

    public Product(Long id, LocalDateTime createdAt, ProductStatus status, Category category, int stockQuantity, BigDecimal price, String description, String name, String scale, String imageUrl, Brand brand) {
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

    //Getters
    public String getName() {
        return name;
    }

    public Long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public int getStockQuantity() {
        return stockQuantity;
    }

    public Category getCategory() {
        return category;
    }

    public ProductStatus getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public String getScale() {
        return scale;
    }

    public Brand getBrand() {
        return brand;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    //Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setStockQuantity(int stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public void setStatus(ProductStatus status) {
        this.status = status;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setScale(String scale) {
        this.scale = scale;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }
}