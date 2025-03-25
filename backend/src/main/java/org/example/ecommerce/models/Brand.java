package org.example.ecommerce.models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "brands")
public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true, nullable = false, length = 20)
    private String brandName;

    @Column(name = "created_at", nullable = false)
    private Date createAt;

    public Brand(int id, String brandName, Date createAt) {
        this.id = id;
        this.brandName = brandName;
        this.createAt = createAt;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }

    @Override
    public String toString() {
        return "Brand{id=" + id + ", brandName='" + brandName + "', createAt=" + createAt + "}";
    }
}

