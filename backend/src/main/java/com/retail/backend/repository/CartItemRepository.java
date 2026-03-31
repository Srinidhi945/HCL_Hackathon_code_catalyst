package com.retail.backend.repository;

import com.retail.backend.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser_UserId(Long userId);
    Optional<CartItem> findByUser_UserIdAndProduct_ProductId(Long userId, Long productId);
    void deleteByUser_UserId(Long userId);
}
