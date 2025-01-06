package com.codingbox.tripjava.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.codingbox.tripjava.entity.Accommodation;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccommodationResponseDTO {
    private int accomId;
    private String accomName;
    private String address;
    private List<RoomTypePriceDTO1> roomTypePrices;
    private List<String> amenities; // Amenity 이름 리스트

    // 엔티티에서 DTO로 변환하는 생성자
    public AccommodationResponseDTO(Accommodation accommodation) {
        if (accommodation == null) {
            throw new IllegalArgumentException("Accommodation cannot be null");
        }

        this.accomId = accommodation.getAccomId();
        this.accomName = accommodation.getAccomName();
        this.address = accommodation.getAddress();
        this.roomTypePrices = accommodation.getRoomTypePrices() != null
            ? accommodation.getRoomTypePrices()
                .stream()
                .filter(roomTypePrice -> roomTypePrice.getRoomType() != null) // Null-safe check
                .map(RoomTypePriceDTO1::new)
                .collect(Collectors.toList())
            : null;
        this.amenities = accommodation.getAmenities() != null
                ? accommodation.getAmenities().stream()
                    .map(amenity -> amenity.getAmenity().getAmenityName())
                    .collect(Collectors.toList())
                : null;
    }
}

