package com.app.repository;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE LOWER(p.productName) LIKE LOWER(concat('%', :query, '%')) OR LOWER(p.productDescription) LIKE LOWER(concat('%', :query, '%'))")
    List<Product> searchProducts(@Param("query") String query);
    List<Product> findByCategoryId(Long categoryId);

    Product findByProductId(Long pid);

    void deleteByProductId(Long pid);



}
