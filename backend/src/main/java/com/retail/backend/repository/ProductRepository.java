package com.retail.backend.repository;

import com.retail.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory_CategoryId(Long categoryId);
    List<Product> findByBrandIgnoreCase(String brand);
    boolean existsByCategory_CategoryId(Long categoryId);

    @Query("""
            select p from Product p
            where (:keyword is null or lower(p.name) like lower(concat('%', :keyword, '%')))
              and (:brand is null or lower(p.brand) = lower(:brand))
              and (:categoryId is null or p.category.categoryId = :categoryId)
            """)
    List<Product> searchProducts(@Param("keyword") String keyword,
                                 @Param("brand") String brand,
                                 @Param("categoryId") Long categoryId);
}
