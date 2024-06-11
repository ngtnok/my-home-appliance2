package com.example.myHomeAppliance2

import jakarta.websocket.server.PathParam
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class ApplianceController(val idsRepository: IdsRepository, val itemDetailsRepository: ItemDetailsRepository) {
    @GetMapping("/api/appliances/ids")
    fun getIds(): List<Ids> {
        return idsRepository.getIds()
    }
    @GetMapping("/api/appliances/{id}")
    fun getId(@PathVariable("id") id : Long): ItemDetails {
        return itemDetailsRepository.getItemDetails(id)
    }
    @PostMapping("/api/appliances")
    fun addMyAppliance(@RequestBody addAppliance: AddAppliance):String {
        return "家電登録したいよ"
    }
    @PostMapping("/api/appliances/ids")
    fun getMyIds(@RequestBody id: Id):List<Ids> {
        return idsRepository.getMyIds(id.id)
    }
}