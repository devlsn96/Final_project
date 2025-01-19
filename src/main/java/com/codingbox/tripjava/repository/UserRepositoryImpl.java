package com.codingbox.tripjava.repository;

import com.codingbox.tripjava.entity.User;

public interface UserRepositoryImpl {

    // 회원 정보 입력
	public User save(User user);

    // 단건 조회
	public User findById(Integer userId);

    // 로그인 하기
    public User login(String loginId, String password);

    // 회원정보 삭제
    public void delete(User user);

    // 이메일 중복 체크
    public Long existByEmail (String email);

    // 이메일로 조회
    public User findByEmail(String email);

    // 이름으로 조회
    public User findByUsername(String username);
}
