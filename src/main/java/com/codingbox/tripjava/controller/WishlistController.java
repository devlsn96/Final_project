package com.codingbox.tripjava.controller;

import com.codingbox.tripjava.dto.WishlistDTO;
import com.codingbox.tripjava.dto.WishlistDetailDTO;
import com.codingbox.tripjava.entity.User;
import com.codingbox.tripjava.service.WishlistService;
import com.codingbox.tripjava.session.SessionConst;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/wishlist")
public class WishlistController {
    
    private final WishlistService wishlistService;

    @GetMapping("/{userId}/{accomId}")
    public ResponseEntity<?> isWishlisted(@PathVariable int userId, @PathVariable int accomId) {
        boolean isWishlisted = wishlistService.isWishlisted(userId, accomId);
        return ResponseEntity.ok().body(isWishlisted);
    }

    @PostMapping
    public ResponseEntity<?> addWishlist(@RequestBody WishlistDTO wishlistDTO, HttpSession session) {
    	// 세션에서 로그인 사용자 정보 가져오기
        User user = (User) session.getAttribute(SessionConst.LOGIN_MEMBER);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인되지 않은 사용자입니다.");
        }

        // 세션에서 추출한 userId 사용
        wishlistService.addWishlist(user.getUserId(), wishlistDTO.getAccomId());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{userId}/{accomId}")
    public ResponseEntity<?> removeWishlist(@PathVariable int userId, @PathVariable int accomId) {
        wishlistService.removeWishlist(userId, accomId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{userId}/details")
    public ResponseEntity<List<WishlistDetailDTO>> getWishlistDetails(@PathVariable int userId) {
        List<WishlistDetailDTO> wishlistDetails = wishlistService.getWishlistDetails(userId);
        return ResponseEntity.ok(wishlistDetails);
    }
}
