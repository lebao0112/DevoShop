package org.example.ecommerce.repositories;

import org.example.ecommerce.models.Payment;
import org.example.ecommerce.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByOrderId(Long orderId);
    List<Payment> findByStatus(PaymentStatus status);
}