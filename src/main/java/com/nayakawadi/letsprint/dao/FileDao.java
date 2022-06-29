package com.nayakawadi.letsprint.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nayakawadi.letsprint.entity.File;

@Repository
public interface FileDao extends JpaRepository<File, String> {

}
