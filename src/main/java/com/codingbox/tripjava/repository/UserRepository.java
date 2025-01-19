package com.codingbox.tripjava.repository;

import static com.codingbox.tripjava.entity.QUser.*;
// import java.util.List;

import org.springframework.stereotype.Repository;

import com.codingbox.tripjava.entity.User;
import com.querydsl.jpa.impl.JPAQueryFactory;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UserRepository implements UserRepositoryImpl {

	private final EntityManager em;

	// 회원 정보 입력
	@Override
	public User save(User user) {
		em.persist(user);
		return user;
	}

	// 단건 조회
	@Override
	public User findById(Integer userId) {
		return em.find(User.class, userId);
	}

	// 로그인하기
	@Override
	public User login(String loginId, String password) {
		JPAQueryFactory queryFactory = new JPAQueryFactory(em);
		return queryFactory.selectFrom(user)
				.where(user.email.eq(loginId).and(user.password.eq(password)))
				.fetchOne();
	}

	// 회원정보 삭제
	@Override
	public void delete(User user) {
		em.remove(user);
	}

	// 이메일 중복 체크
	@Override
	public Long existByEmail(String email) {
		// 이메일 조회하는 쿼리
		// QUser user = QUser.user; // QUser 객체 생성
		JPAQueryFactory queryFactory = new JPAQueryFactory(em);
		return queryFactory.select(user.count())
				.from(user)
				.where(user.email.eq(email))
				.fetchOne();
	}

	// 이메일로 조회
	@Override
	public User findByEmail(String email) {
		JPAQueryFactory queryFactory = new JPAQueryFactory(em);
		return queryFactory.selectFrom(user)
				.where(user.email.eq(email))
				.fetchOne();
	}

	// 이름으로 조회
	@Override
	public User findByUsername(String username) {
		JPAQueryFactory queryFactory = new JPAQueryFactory(em);
		return queryFactory.selectFrom(user)
				.where(user.username.eq(username))
				.fetchOne();
	}
}
