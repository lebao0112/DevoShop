package org.example.ecommerce.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PaymentRequest {

    @JsonProperty("amount")
    private long amount;
    private String description;
    private String orderId;

    // Constructors
    public PaymentRequest() {}

    public PaymentRequest(long amount, String description, String orderId) {
        this.amount = amount;
        this.description = description;
        this.orderId = orderId;
    }

    // Getters and Setters
    public long getAmount() {
        return amount;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }
}
