package com.codingbox.tripjava.service;

import com.codingbox.tripjava.dto.AccommodationDTO;
import com.codingbox.tripjava.dto.ReviewDTO;
import com.codingbox.tripjava.dto.RoomTypePriceDTO2;
import com.codingbox.tripjava.entity.Accommodation;
import com.codingbox.tripjava.entity.Review;
import com.codingbox.tripjava.entity.RoomTypePrice;
import com.codingbox.tripjava.repository.AccommodationRepository;
import com.codingbox.tripjava.repository.ReviewRepository;
import com.codingbox.tripjava.repository.RoomTypePriceRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccommodationService {

    private AccommodationRepository accommodationRepository;
    private ReviewRepository reviewRepository;
    private RoomTypePriceRepository roomTypePriceRepository;

    public AccommodationDTO getAccommodationDetails(Integer accomId) {
        // 숙소 정보 조회
        Accommodation accommodation = accommodationRepository.findById(accomId)
                .orElseThrow(() -> new RuntimeException("Accommodation not found"));
        
        // RoomTypePrice 목록을 accommodation 객체를 기준으로 조회
        List<RoomTypePrice> roomTypePrices = roomTypePriceRepository.findByAccommodation(accommodation);
        List<RoomTypePriceDTO2> roomTypePriceDTOs = roomTypePrices.stream()
                .map(roomTypePrice -> new RoomTypePriceDTO2(
                        roomTypePrice.getRoomType(),  // RoomType
                        roomTypePrice.getAccomId(),   // accomId
                        roomTypePrice.getMaxGuests(), // maxGuests
                        roomTypePrice.getRoomPrice()  // roomPrice
                ))
                .collect(Collectors.toList());
        
        // 리뷰 정보 조회
        List<Review> reviews = reviewRepository.findByAccommodation(accommodation);

        // ReviewDTO 리스트로 변환 (null 값에 대한 체크 추가)
        List<ReviewDTO> reviewDTOs = reviews.stream()
                .map(review -> new ReviewDTO(
                        review.getReviewId(),
                        review.getUser().getUserId(),  // User 엔티티에서 userId 가져오기
                        review.getUser().getUsername(),
                        review.getAccommodation().getAccomId(),  // Accommodation 엔티티에서 accomId 가져오기
                        review.getRating(),
                        review.getReviewText(),
                        review.getReviewDate(),
                        review.getReviewImagePath() != null ? review.getReviewImagePath() : ""  // null 처리
                ))
                .collect(Collectors.toList());

        // AccommodationDTO 생성
        return new AccommodationDTO(
                accommodation.getAccomId(),
                accommodation.getAccomName(),
                accommodation.getType().name(),
                accommodation.getDescription(),
                accommodation.getAddress(),
                accommodation.getLatitude(),
                accommodation.getLongitude(),
                accommodation.getAccomTel(),
                accommodation.getAvaDatesStart() != null ? accommodation.getAvaDatesStart().toString() : "",
                accommodation.getAvaDatesEnd() != null ? accommodation.getAvaDatesEnd().toString() : "",
                accommodation.getAmenities() != null ? accommodation.getAmenities().stream().map(amenity -> amenity.getAmenityName()).collect(Collectors.toList()) : new ArrayList<>(),  // null 처리
                accommodation.getImages() != null ? accommodation.getImages().stream().map(image -> image.getImagePath()).collect(Collectors.toList()) : new ArrayList<>(),  // null 처리
                reviewDTOs,
                roomTypePriceDTOs  // RoomTypePriceDTO 목록 반환
        );
        
        
    }
    
}
