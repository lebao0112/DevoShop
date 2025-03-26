package org.example.ecommerce.models;

import jakarta.persistence.*;


@Entity
@Table(name = "product_sub_images")
public class ProductSubImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    public ProductSubImage() {
    }

    public ProductSubImage(Product product, String imageUrl, Long id) {
        this.product = product;
        this.imageUrl = imageUrl;
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    @Override
    public String toString() {
        return "ProductImage{" +
                "id=" + id +
                ", imageUrl='" + imageUrl + '\'' +
                ", product=" + product +
                '}';
    }
}
