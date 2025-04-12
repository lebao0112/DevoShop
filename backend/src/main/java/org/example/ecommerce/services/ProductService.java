package org.example.ecommerce.services;

import com.cloudinary.Cloudinary;
import org.example.ecommerce.models.Product;
import org.example.ecommerce.repositories.ProductRepository;
import org.example.ecommerce.util.FileUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Cacheable(value = "products", key = "'getAllProducts'")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }


    public Product getProductById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        if(product.isEmpty()){
            throw new RuntimeException("Product not found");
        }

        return product.get();
    }

    public List<Product> getProductsWithInStockBetterThan(int quantity){
        return productRepository.findProductWithInStockQuantityBetterThan(quantity);
    }


    public Page<Product> getPaginatedProducts(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAll(pageable);
    }

    public Product createProduct(MultipartFile file, Product product) throws IOException {
        if(!file.isEmpty()) {
            FileUploadUtil.assertAllowed(file, FileUploadUtil.IMAGE_PARTEN);

            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), Map.of("folder", "DevoShop/products"));
            String imageUrl = (String) uploadResult.get("secure_url");
            product.setImageUrl(imageUrl);
        }

        Product savedProduct = productRepository.save(product);
        evictAllProductListCaches();
        return savedProduct;
    }

    public Product updateProduct(Long id, Product productDetails) {
        return productRepository.findById(id).map(product -> {
            product.setName(productDetails.getName());
            product.setDescription(productDetails.getDescription());
            product.setPrice(productDetails.getPrice());
            product.setStockQuantity(productDetails.getStockQuantity());
            product.setCategory(productDetails.getCategory());
            product.setBrand(productDetails.getBrand());
            product.setStatus(productDetails.getStatus());
            product.setScale(productDetails.getScale());
            return productRepository.save(product);
        }).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }


    private void evictAllProductListCaches() {
        Set<String> keys = redisTemplate.keys("products::all_products*");
        if (!keys.isEmpty()) {
            redisTemplate.delete(keys);
        }
    }
}