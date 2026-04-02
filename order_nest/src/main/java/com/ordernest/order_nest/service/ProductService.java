package com.ordernest.order_nest.service;

import com.ordernest.order_nest.model.Product;
import com.ordernest.order_nest.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    public List<Product> getVegProducts() {
        return productRepository.findByFoodType(Product.FoodType.VEG);
    }

}