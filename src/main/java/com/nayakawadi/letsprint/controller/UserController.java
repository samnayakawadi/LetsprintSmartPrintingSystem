package com.nayakawadi.letsprint.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nayakawadi.letsprint.entity.User;
import com.nayakawadi.letsprint.response.LongResponse;
//import com.nayakawadi.letsprint.response.StringResponse;
import com.nayakawadi.letsprint.service.UserService;

@RestController
//http://localhost:3000
@CrossOrigin(origins = "*")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/users")
	public List<User> getUsers(){
		return userService.getUsers();
	}
	
	@GetMapping("/users/{userId}")
	public User getUser(@PathVariable Long userId) {
		return userService.getUser(userId);
	}
	
	@GetMapping("/users/username/{username}")
	public User getByUsername(@PathVariable String username){
		return userService.getByUsername(username);
	}
	
	@PutMapping("/users/username/{username}/wallet/{wallet}")
	public LongResponse updateWallet(@PathVariable String username,@PathVariable Double wallet) {
		return userService.updateWallet(username, wallet);
	}
	
	@PutMapping("/users/username/{username}/status/{status}")
	public LongResponse updateStatus(@PathVariable Boolean status,@PathVariable String username) {
		return userService.updateStatus(status, username);
	}
	
	@GetMapping("/users/type/{type}")
	public List<User> getUserByType(@PathVariable String type){
		return userService.getUserByType(type);
	}
	
	@GetMapping("/users/type/{type}/all")
	public List<User> getAllUsersByType(@PathVariable String type){
		return userService.getAllUsersByType(type);
	}
	
	@PostMapping("/users")
	public LongResponse addUser(@RequestBody User user) {
		return userService.addUser(user);
	}
	
	@PutMapping("/users")
	public LongResponse updateUser(@RequestBody User user) {
		return userService.updateUser(user);
	}
	
	@DeleteMapping("/users/{userId}")
	public LongResponse deleteUser(@PathVariable Long userId) {
		return userService.deleteUser(userId);
	}
}
