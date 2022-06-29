package com.nayakawadi.letsprint.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Wallets")
public class Wallet {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String sender;
	private String reciever;
	private String date;
	private Double amount;
	private String type;
	
	public Wallet() {
		super();
	}

	public Wallet(Long id, String sender, String reciever, String date, Double amount, String type) {
		super();
		this.id = id;
		this.sender = sender;
		this.reciever = reciever;
		this.date = date;
		this.amount = amount;
		this.type = type;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public String getReciever() {
		return reciever;
	}

	public void setReciever(String reciever) {
		this.reciever = reciever;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

}
