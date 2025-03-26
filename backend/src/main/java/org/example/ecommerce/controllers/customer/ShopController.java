package org.example.ecommerce.controllers.customer;

import org.example.ecommerce.models.Product;
import org.example.ecommerce.repositories.ProductRepository;
import org.example.ecommerce.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/customer/products")
public class ShopController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public Page<Product> getPaginatedProducts(
            @RequestParam(defaultValue = "0") int page,  // Default to page 0
            @RequestParam(defaultValue = "20") int size  // Default to 20 products per page
    ) {
        return productService.getPaginatedProducts(page, size);
    }


}
