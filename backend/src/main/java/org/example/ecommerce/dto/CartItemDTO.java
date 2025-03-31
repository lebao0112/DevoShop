package org.example.ecommerce.dto;

import java.math.BigDecimal;

public class CartItemDTO {
    private Long productId;
    private String name;
    private int quantity;
    private BigDecimal price;
    private String imageUrl;

    public CartItemDTO() {
    }

    public CartItemDTO(Long productId, String imageUrl, BigDecimal price, int quantity, String name) {
        this.productId = productId;
        this.imageUrl = imageUrl;
        this.price = price;
        this.quantity = quantity;
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }




}
