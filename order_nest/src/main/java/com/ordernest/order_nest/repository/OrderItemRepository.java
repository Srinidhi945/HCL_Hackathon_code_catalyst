package com.ordernest.order_nest.repository;

import com.ordernest.order_nest.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}