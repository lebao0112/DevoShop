package org.example.ecommerce.dto;

import java.math.BigDecimal;

public class OrderItemDTO {
    private Long productId;
    private int quantity;
    private BigDecimal price;
    private  String imageUrl;

    public OrderItemDTO() {
    }

    public OrderItemDTO(Long productId, BigDecimal price, int quantity, String imageUrl) {
        this.productId = productId;
        this.price = price;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
