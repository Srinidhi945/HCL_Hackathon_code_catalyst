package com.ordernest.order_nest.controller;

import com.ordernest.order_nest.model.Product;
import com.ordernest.order_nest.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/category/{id}")
    public List<Product> getProductsByCategory(@PathVariable Long id) {
        return productService.getProductsByCategory(id);
    }

    @GetMapping("/veg")
    public List<Product> getVegProducts() {
        return productService.getVegProducts();
    }
}