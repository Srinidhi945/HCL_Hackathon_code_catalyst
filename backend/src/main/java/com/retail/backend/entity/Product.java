package com.retail.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    private String name;
    private String brand;
    private Double price;
    
    // Core feature: Packaging
    private String packaging;

    // Core feature: Automatic inventory updates
    private Integer stockQuantity;

    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id")
    private Category category;

    public Product() {
    }

    public Product(Long productId, String name, String brand, Double price, String packaging, Integer stockQuantity,
                   Category category) {
        this.productId = productId;
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.packaging = packaging;
        this.stockQuantity = stockQuantity;
        this.category = category;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getPackaging() {
        return packaging;
    }

    public void setPackaging(String packaging) {
        this.packaging = packaging;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
