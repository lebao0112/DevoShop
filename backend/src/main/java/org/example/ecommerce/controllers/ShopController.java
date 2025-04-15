package org.example.ecommerce.controllers;

import org.example.ecommerce.dto.ProductDTO;
import org.example.ecommerce.models.Product;
import org.example.ecommerce.services.ProductService;
import org.example.ecommerce.services.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/shop")
public class ShopController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ShopService shopService;

    @GetMapping("/all")

    public Page<Product> getPaginatedProducts(

            @RequestParam(defaultValue = "0") int page,  // Default to page 0
            @RequestParam(defaultValue = "20") int size  // Default to 20 products per page
    ) {
        return shopService.getPaginatedProducts(page, size);
    }

    @GetMapping("/get-product")
    public Product getProductById(@RequestParam Long id) {
        return shopService.getProductById(id);
    }


    @GetMapping("/get-products-in-stock-better-than")
    public List<Product> getProductsInStockBetterThan(@RequestParam(defaultValue = "20") int quantity) {
        return productService.getProductsWithInStockBetterThan(quantity);
    }
}
