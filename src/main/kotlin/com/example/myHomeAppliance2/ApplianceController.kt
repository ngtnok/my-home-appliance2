package com.example.myHomeAppliance2

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class ApplianceController(val idsRepository: IdsRepository) {
    @GetMapping("/api/appliances/ids")
    fun getIds(): List<Ids> {
        return idsRepository.getIds()
    }
}