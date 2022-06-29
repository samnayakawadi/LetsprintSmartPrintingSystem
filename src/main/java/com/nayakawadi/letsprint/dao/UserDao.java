package com.nayakawadi.letsprint.dao;
//import java.util.List;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.nayakawadi.letsprint.entity.User;

@Repository
public interface UserDao extends JpaRepository<User, Long> {
	User findByUsername(String username);
	List<User> findByTypeAndActive(String type, Boolean active);
	
	List<User> findByType(String type);
	
	@Transactional
	@Modifying
	@Query("UPDATE User SET wallet = :wallet WHERE username = :username")
	Integer updateWallet(Double wallet,String username);
	
	@Transactional
	@Modifying
	@Query("UPDATE User SET active = :status WHERE username = :username")
	Integer updateStatus(Boolean status,String username);
	
}

// Give Entity Class Name User & Not Users or users

//@Query annotation is used to write the JPQL query. JPQL queries take field names instead of column names
//@Modifying annotation is used whenever we writing JPQL query for modifying the records (create, update, delete)
//JPQL query always returns either void or integer whenever we are writing a query for modifying.
//@Transactional annotation is used whenever we are writing JPQL queries, it is from the org.springframework.transaction.annotation.Transactional package
