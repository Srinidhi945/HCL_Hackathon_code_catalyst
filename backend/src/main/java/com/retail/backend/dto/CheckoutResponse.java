package com.retail.backend.dto;

import java.util.List;

public class CheckoutResponse {
    private Long userId;
    private Integer totalItems;
    private Double totalAmount;
    private List<OrderResponse> orders;

    public CheckoutResponse() {
    }

    public CheckoutResponse(Long userId, Integer totalItems, Double totalAmount, List<OrderResponse> orders) {
        this.userId = userId;
        this.totalItems = totalItems;
        this.totalAmount = totalAmount;
        this.orders = orders;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Integer getTotalItems() {
        return totalItems;
    }

    public void setTotalItems(Integer totalItems) {
        this.totalItems = totalItems;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public List<OrderResponse> getOrders() {
        return orders;
    }

    public void setOrders(List<OrderResponse> orders) {
        this.orders = orders;
    }
}
