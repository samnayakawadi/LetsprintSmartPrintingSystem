package com.nayakawadi.letsprint.response;

public class FileStringResponse {
	
	private String id;
	private String name;
	private String url;
	private String type;
	private long size;
	private String msg;
	private Boolean status = false;
	
	public FileStringResponse() {
		super();
	}

	public FileStringResponse(String msg, Boolean status) {
		super();
		this.msg = msg;
		this.status = status;
	}

	public FileStringResponse(String id, String name, String url, String type, long size, String msg, Boolean status) {
		super();
		this.id = id;
		this.name = name;
		this.url = url;
		this.type = type;
		this.size = size;
		this.msg = msg;
		this.status = status;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public long getSize() {
		return size;
	}

	public void setSize(long size) {
		this.size = size;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	

}
