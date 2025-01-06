package com.codingbox.tripjava.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class WishlistDTO {
    private int userId; // 사용자 ID
    private int accomId; // 숙소 ID

    public WishlistDTO() {}

    public WishlistDTO(int userId, int accomId) {
        this.userId = userId;
        this.accomId = accomId;
    }
}
