package com.ordernest.order_nest.repository;

import com.ordernest.order_nest.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategoryId(Long categoryId);

    List<Product> findByFoodType(Product.FoodType foodType);

}