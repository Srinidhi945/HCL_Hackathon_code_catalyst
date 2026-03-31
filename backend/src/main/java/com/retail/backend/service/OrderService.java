package com.retail.backend.service;

import com.retail.backend.dto.OrderRequest;
import com.retail.backend.dto.OrderResponse;
import com.retail.backend.entity.Order;
import com.retail.backend.entity.Product;
import com.retail.backend.entity.User;
import com.retail.backend.repository.OrderRepository;
import com.retail.backend.repository.ProductRepository;
import com.retail.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public OrderResponse placeOrder(OrderRequest orderRequest) {
        validateOrderRequest(orderRequest);

        User user = userRepository.findById(orderRequest.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Product product = productRepository.findById(orderRequest.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        if (product.getStockQuantity() == null || product.getStockQuantity() < orderRequest.getQuantity()) {
            throw new IllegalArgumentException("Insufficient stock for product " + product.getName());
        }

        product.setStockQuantity(product.getStockQuantity() - orderRequest.getQuantity());
        productRepository.save(product);

        Order order = new Order();
        order.setUser(user);
        order.setProduct(product);
        order.setQuantity(orderRequest.getQuantity());
        order.setTotalPrice(product.getPrice() * orderRequest.getQuantity());
        order.setOrderDate(LocalDateTime.now());
        order.setConfirmationMessage(buildConfirmationMessage(user, product, orderRequest.getQuantity()));

        return mapToResponse(orderRepository.save(order));
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getOrdersByUser(Long userId) {
        return orderRepository.findByUser_UserId(userId);
    }

    public List<OrderResponse> getOrderHistory(Long userId) {
        return orderRepository.findByUser_UserIdOrderByOrderDateDesc(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional
    public OrderResponse reorder(Long orderId) {
        Order existingOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));

        OrderRequest orderRequest = new OrderRequest(
                existingOrder.getUser().getUserId(),
                existingOrder.getProduct().getProductId(),
                existingOrder.getQuantity()
        );

        return placeOrder(orderRequest);
    }

    private void validateOrderRequest(OrderRequest orderRequest) {
        if (orderRequest == null) {
            throw new IllegalArgumentException("Order request is required");
        }
        if (orderRequest.getUserId() == null) {
            throw new IllegalArgumentException("User id is required");
        }
        if (orderRequest.getProductId() == null) {
            throw new IllegalArgumentException("Product id is required");
        }
        if (orderRequest.getQuantity() == null || orderRequest.getQuantity() <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than zero");
        }
    }

    private String buildConfirmationMessage(User user, Product product, Integer quantity) {
        return "Order confirmed for " + user.getName() + ": " + quantity + " x " + product.getName()
                + " (" + product.getPackaging() + ")";
    }

    private OrderResponse mapToResponse(Order order) {
        return new OrderResponse(
                order.getOrderId(),
                order.getUser().getUserId(),
                order.getUser().getName(),
                order.getProduct().getProductId(),
                order.getProduct().getName(),
                order.getQuantity(),
                order.getTotalPrice(),
                order.getOrderDate(),
                order.getConfirmationMessage()
        );
    }
}
