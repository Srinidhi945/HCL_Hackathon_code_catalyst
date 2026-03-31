package com.retail.backend.service;

import com.retail.backend.entity.Category;
import com.retail.backend.repository.CategoryRepository;
import com.retail.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    public Category createCategory(Category category) {
        if (category == null || category.getCategoryName() == null || category.getCategoryName().isBlank()) {
            throw new IllegalArgumentException("Category name is required");
        }
        category.setCategoryName(category.getCategoryName().trim());
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public void deleteCategory(Long categoryId) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new IllegalArgumentException("Category not found");
        }
        if (productRepository.existsByCategory_CategoryId(categoryId)) {
            throw new IllegalArgumentException("Cannot delete category with existing products");
        }
        categoryRepository.deleteById(categoryId);
    }
}
