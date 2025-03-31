package org.example.ecommerce.repositories;

import org.example.ecommerce.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p WHERE p.stockQuantity > :quantity")
    List<Product> findProductWithInStockQuantityBetterThan(@Param("quantity") int quantity);
}