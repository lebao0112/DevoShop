package org.example.ecommerce.models;

import jakarta.persistence.*;
import org.example.ecommerce.enums.PaymentMethod;
import org.example.ecommerce.enums.PaymentStatus;

import java.time.LocalDateTime;

@Entity
@Table(name = "payments")

public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus status;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    public Payment(Long id, LocalDateTime createdAt, PaymentStatus status, Order order, PaymentMethod paymentMethod) {
        this.id = id;
        this.createdAt = createdAt;
        this.status = status;
        this.order = order;
        this.paymentMethod = paymentMethod;
    }

    // Getters

    public Long getId() {
        return id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public PaymentStatus getStatus() {
        return status;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public Order getOrder() {
        return order;
    }

    //Setters

    public void setId(Long id) {
        this.id = id;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setStatus(PaymentStatus status) {
        this.status = status;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}