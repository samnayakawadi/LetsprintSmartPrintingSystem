package com.nayakawadi.letsprint.service;

import java.io.IOException;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.nayakawadi.letsprint.dao.FileDao;
import com.nayakawadi.letsprint.entity.File;

@Service
public class FileService {
	
	@Autowired
	FileDao fileDao;
	
	public Stream<File> getFiles(){
		return fileDao.findAll().stream();
	}
	
	public File getFile(String id) {
		return fileDao.getById(id);
	}
	
	public File addFile(MultipartFile file) throws IOException {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		File entity = new File(fileName, file.getContentType(), file.getBytes());
		// here we will get entity with id
		return fileDao.save(entity); // Here that entity is saved to database and also returned
	}
	
	public File deleteFile(String id) {
		File entity = fileDao.getById(id);
		fileDao.delete(entity);
		return entity;
	}
}
