package com.codingbox.tripjava.controller;

import com.codingbox.tripjava.dto.AccommodationRecommendationDTO;
import com.codingbox.tripjava.dto.SearchAccommodationRequestDTO;
import com.codingbox.tripjava.dto.SearchResultDTO;
import com.codingbox.tripjava.entity.Accommodation;
import com.codingbox.tripjava.enums.AccommodationType;
import com.codingbox.tripjava.service.AccommodationService1;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accommodations")
@RequiredArgsConstructor
public class SearchBarController {

    private final AccommodationService1 accommodationService;

    @GetMapping("/all")
    public List<Accommodation> searchAccommodations(
            @RequestParam(value = "accomname", required = false) String accomName,
            @RequestParam(value = "accomaddress", required = false) String accomAddress,
            @RequestParam(value = "checkIn", required = false) String checkIn,
            @RequestParam(value = "checkOut", required = false) String checkOut,
            @RequestParam(value = "guests", required = false) Integer guests, 
    		@RequestParam(value = "type", required = false) AccommodationType type,
    		@RequestParam(value = "minPrice", required = false) Integer minPrice,
    		@RequestParam(value = "maxPrice", required = false) Integer maxPrice) {
    		
        SearchAccommodationRequestDTO request = new SearchAccommodationRequestDTO(
                accomName,
                accomAddress,
                checkIn,
                checkOut,
                guests,
                type,
                minPrice,
                maxPrice
        );

        return accommodationService.searchAccommodations(request);
    }
    
    // 숙소 검색 필터링 
    @PostMapping("/search")
    public ResponseEntity<List<SearchResultDTO>> searchAccommodations(@RequestBody SearchAccommodationRequestDTO request) {
    	System.out.println("검색 조건: " + request);
    	List<SearchResultDTO> results = accommodationService.searchAccommodationsWithImage(request);
        System.out.println("검색 결과: " + results);
        return ResponseEntity.ok(results);
    }
    
    // 추천 숙소 가져오는 컨트롤러
    @GetMapping()
    public List<AccommodationRecommendationDTO> getTop12Accommodations() {
        return accommodationService.getTop12Accommodations();
    }
   
}
