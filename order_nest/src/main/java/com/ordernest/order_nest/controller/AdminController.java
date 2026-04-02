package com.ordernest.order_nest.controller;

import com.ordernest.order_nest.model.*;
import com.ordernest.order_nest.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private OrderRepository orderRepository;

    // ---------------- PRODUCTS ----------------

    @PostMapping("/products")
    public Product addProduct(@RequestBody Product product){
        return productRepository.save(product);
    }

    @GetMapping("/products")
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    @PutMapping("/products/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product){

        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existing.setName(product.getName());
        existing.setPrice(product.getPrice());
        existing.setStock(product.getStock());
        existing.setFoodType(product.getFoodType());
        existing.setBrand(product.getBrand());
        existing.setCategory(product.getCategory());

        return productRepository.save(existing);
    }

    @DeleteMapping("/products/{id}")
    public String deleteProduct(@PathVariable Long id){

        productRepository.deleteById(id);

        return "Product deleted successfully";
    }

    // ---------------- BRANDS ----------------

    @PostMapping("/brands")
    public Brand addBrand(@RequestBody Brand brand){
        return brandRepository.save(brand);
    }

    @GetMapping("/brands")
    public List<Brand> getAllBrands(){
        return brandRepository.findAll();
    }

    @PutMapping("/brands/{id}")
    public Brand updateBrand(@PathVariable Long id, @RequestBody Brand brand){

        Brand existing = brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Brand not found"));

        existing.setName(brand.getName());

        return brandRepository.save(existing);
    }

    @DeleteMapping("/brands/{id}")
    public String deleteBrand(@PathVariable Long id){

        brandRepository.deleteById(id);

        return "Brand deleted successfully";
    }

    // ---------------- CATEGORIES ----------------

    @PostMapping("/categories")
    public Category addCategory(@RequestBody Category category){
        return categoryRepository.save(category);
    }

    @GetMapping("/categories")
    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }

    @PutMapping("/categories/{id}")
    public Category updateCategory(@PathVariable Long id, @RequestBody Category category){

        Category existing = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        existing.setName(category.getName());

        return categoryRepository.save(existing);
    }

    @DeleteMapping("/categories/{id}")
    public String deleteCategory(@PathVariable Long id){

        categoryRepository.deleteById(id);

        return "Category deleted successfully";
    }

    // ---------------- ORDERS ----------------

    @GetMapping("/orders")
    public List<Order> getAllOrders(){
        return orderRepository.findAll();
    }

}