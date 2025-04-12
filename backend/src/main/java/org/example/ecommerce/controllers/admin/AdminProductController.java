package org.example.ecommerce.controllers.admin;

import jakarta.validation.Valid;
import org.example.ecommerce.enums.ProductStatus;
import org.example.ecommerce.models.Brand;
import org.example.ecommerce.models.Category;
import org.example.ecommerce.models.Product;
import org.example.ecommerce.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/admin/products")
public class AdminProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private CacheManager cacheManager;



    @GetMapping
    public ResponseEntity<?> getAllProducts() {

        return ResponseEntity.ok(productService.getAllProducts());
    }

    @PostMapping
    public ResponseEntity<?> createProduct( @RequestParam("image") MultipartFile image,
                                            @RequestParam("name") String name,
                                            @RequestParam("description") String description,
                                            @RequestParam("price") BigDecimal price,
                                            @RequestParam("stockQuantity") int stockQuantity,
                                            @RequestParam("brand") Long brandId,
                                            @RequestParam("scale") String scale,
                                            @RequestParam("category") Long categoryId,
                                            @RequestParam("status") ProductStatus status) {
        try {

            Brand brand = new Brand();
            brand.setId(brandId);

            Category category = new Category();
            category.setId(categoryId);

            Product product = new Product();
            product.setName(name);
            product.setDescription(description);
            product.setPrice(price);
            product.setStockQuantity(stockQuantity);
            product.setBrand(brand);
            product.setScale(scale);
            product.setCategory(category);
            product.setStatus(status);

            Product savedProduct = productService.createProduct(image, product);
            return ResponseEntity.ok(savedProduct);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        Product updatedProduct = productService.updateProduct(id, productDetails);

        cacheManager.getCache("products").evict("getAllProducts");
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

}