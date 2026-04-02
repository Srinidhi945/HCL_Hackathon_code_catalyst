package com.ordernest.order_nest.repository;

import com.ordernest.order_nest.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}