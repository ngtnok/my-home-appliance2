package com.example.myHomeAppliance2

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class ApplianceController {
    @GetMapping("/api/appliances/ids")
    fun getIds(): String {
        return "とりあえず200"
    }
}