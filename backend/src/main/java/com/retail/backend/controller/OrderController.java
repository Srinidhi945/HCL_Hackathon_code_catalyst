package com.retail.backend.controller;

import com.retail.backend.dto.OrderRequest;
import com.retail.backend.dto.OrderResponse;
import com.retail.backend.entity.Order;
import com.retail.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> placeOrder(@RequestBody OrderRequest orderRequest) {
        return ResponseEntity.ok(orderService.placeOrder(orderRequest));
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.getOrdersByUser(userId));
    }

    @GetMapping("/history/{userId}")
    public ResponseEntity<List<OrderResponse>> getOrderHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.getOrderHistory(userId));
    }

    @PostMapping("/reorder/{orderId}")
    public ResponseEntity<OrderResponse> reorder(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.reorder(orderId));
    }
}
