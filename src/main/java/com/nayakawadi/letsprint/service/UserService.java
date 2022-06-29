package com.nayakawadi.letsprint.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nayakawadi.letsprint.dao.UserDao;
import com.nayakawadi.letsprint.entity.User;
import com.nayakawadi.letsprint.response.LongResponse;
//import com.nayakawadi.letsprint.response.StringResponse;

@Service
public class UserService {
	
	@Autowired
	UserDao userDao;
//	Response response;

	public List<User> getUsers() {
		return userDao.findAll();
	}

	public User getUser(Long id) {
		return userDao.getById(id);
	}
	
//	public List<User> getByUsername(String username){
//		
//	}

	public LongResponse addUser(User user) {   
		
		User entity = userDao.save(user);
		return new LongResponse(entity.getId(), "User Added Successfully", true);
	}

	public LongResponse updateUser(User user) {
		User entity = userDao.save(user);
		return new LongResponse(entity.getId(), "User Updated Successfully", true);
	}

	public LongResponse deleteUser(Long id) {
		User entity = userDao.getById(id);
		userDao.delete(entity);
		return new LongResponse(id, "User Deleted Successfully", true);
	}

	public User getByUsername(String username) {
		return userDao.findByUsername(username);
	}

	public List<User> getUserByType(String type) {
		return userDao.findByTypeAndActive(type, true);
	}
	
	public List<User> getAllUsersByType(String type) {
		return userDao.findByType(type);
	}

	public LongResponse updateWallet(String username, Double wallet) {
		User entity = userDao.findByUsername(username);
		userDao.updateWallet(wallet, username);
		return new LongResponse(entity.getId(), "Wallet Updated Successfully", true);
	}
	
	public LongResponse updateStatus(Boolean status, String username){
		User entity = userDao.findByUsername(username);
		userDao.updateStatus(status, username);
		return new LongResponse(entity.getId(), "User Status Updated Successfully", true);
	}

}
