package com.retail.backend.service;

import com.retail.backend.entity.Product;
import com.retail.backend.repository.CategoryRepository;
import com.retail.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public Product saveProduct(Product product) {
        validateProduct(product);

        Long categoryId = product.getCategory().getCategoryId();
        product.setCategory(categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Category not found")));
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new IllegalArgumentException("Category not found");
        }
        return productRepository.findByCategory_CategoryId(categoryId);
    }

    public Product updateProduct(Long id, Product product) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        validateProduct(product);

        Long categoryId = product.getCategory().getCategoryId();
        existingProduct.setName(product.getName().trim());
        existingProduct.setBrand(product.getBrand().trim());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setPackaging(product.getPackaging().trim());
        existingProduct.setStockQuantity(product.getStockQuantity());
        existingProduct.setCategory(categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Category not found")));

        return productRepository.save(existingProduct);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new IllegalArgumentException("Product not found");
        }
        productRepository.deleteById(id);
    }

    public List<Product> searchProducts(String keyword, String brand, Long categoryId) {
        String normalizedKeyword = normalize(keyword);
        String normalizedBrand = normalize(brand);

        if (normalizedKeyword == null && normalizedBrand == null && categoryId == null) {
            return productRepository.findAll();
        }

        return productRepository.searchProducts(normalizedKeyword, normalizedBrand, categoryId);
    }

    private void validateProduct(Product product) {
        if (product == null) {
            throw new IllegalArgumentException("Product details are required");
        }
        if (product.getName() == null || product.getName().isBlank()) {
            throw new IllegalArgumentException("Product name is required");
        }
        if (product.getBrand() == null || product.getBrand().isBlank()) {
            throw new IllegalArgumentException("Brand is required");
        }
        if (product.getPrice() == null || product.getPrice() <= 0) {
            throw new IllegalArgumentException("Price must be greater than zero");
        }
        if (product.getPackaging() == null || product.getPackaging().isBlank()) {
            throw new IllegalArgumentException("Packaging is required");
        }
        if (product.getStockQuantity() == null || product.getStockQuantity() < 0) {
            throw new IllegalArgumentException("Stock quantity must be zero or more");
        }
        if (product.getCategory() == null || product.getCategory().getCategoryId() == null) {
            throw new IllegalArgumentException("Category id is required");
        }
    }

    private String normalize(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
