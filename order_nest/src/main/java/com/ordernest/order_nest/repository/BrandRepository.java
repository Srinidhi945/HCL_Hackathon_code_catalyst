package com.ordernest.order_nest.repository;

import com.ordernest.order_nest.model.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrandRepository extends JpaRepository<Brand, Long> {
}