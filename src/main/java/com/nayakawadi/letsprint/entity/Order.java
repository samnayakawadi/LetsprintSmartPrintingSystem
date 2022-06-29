package com.nayakawadi.letsprint.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Orders")
//@ManagedBean(value = "course")
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
//	@GeneratedValue(generator = "uuid")
//	@GenericGenerator(name = "uuid", strategy = "uuid2")
	private Long id;
	private String sender;
	private String reciever;
	private String shopName;
	private String date;
	private String time;
	private String fileId;
	private String fileName;
	private String fileType;
	private String fileUrl;
	private long fileSize;
	private Integer pages;
	private Double amount;
	private String status = "Pending";
//	private String type = "Order"; // Also "Recharge"

	public Order() {
		super();
	}

	public Order(Long id, String sender, String reciever, String shopName, String date, String time, String fileId,
			String fileName, String fileType, String fileUrl, long fileSize, Integer pages, Double amount,
			String status) {
		super();
		this.id = id;
		this.sender = sender;
		this.reciever = reciever;
		this.shopName = shopName;
		this.date = date;
		this.time = time;
		this.fileId = fileId;
		this.fileName = fileName;
		this.fileType = fileType;
		this.fileUrl = fileUrl;
		this.fileSize = fileSize;
		this.pages = pages;
		this.amount = amount;
		this.status = status;
	}

	public String getShopName() {
		return shopName;
	}

	public void setShopName(String shopName) {
		this.shopName = shopName;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public String getFileUrl() {
		return fileUrl;
	}

	public void setFileUrl(String fileUrl) {
		this.fileUrl = fileUrl;
	}

	public long getFileSize() {
		return fileSize;
	}

	public void setFileSize(long fileSize) {
		this.fileSize = fileSize;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getFileId() {
		return fileId;
	}

	public void setFileId(String fileId) {
		this.fileId = fileId;
	}

	public Integer getPages() {
		return pages;
	}

	public void setPages(Integer pages) {
		this.pages = pages;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getReciever() {
		return reciever;
	}

	public void setReciever(String reciever) {
		this.reciever = reciever;
	}

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

}
