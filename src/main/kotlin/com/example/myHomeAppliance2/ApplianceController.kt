package com.example.myHomeAppliance2

import jakarta.websocket.server.PathParam
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class ApplianceController(
    val idsRepository: IdsRepository,
    val itemDetailsRepository: ItemDetailsRepository,
    val placeRepository: PlaceRepository,
    val detailsRepository: DetailsRepository,
    val havingRepository: HavingRepository,
    val historyRepository: HistoryRepository
) {
    @GetMapping("/api/ids") //修正済み未テスト
    fun getIds(): List<Ids> {
        return idsRepository.getIds()
    }
    @PostMapping("/api/ids")
    fun getMyIds(@RequestBody id: Id):List<Ids> {
        return idsRepository.getMyIds(id.id)
    }
    @GetMapping("/api/appliances/{id}")
    fun getId(@PathVariable("id") id : Long): ItemDetails {
        return itemDetailsRepository.getItemDetails(id)
    }
    @PostMapping("/api/appliances")
    fun addMyAppliance(@RequestBody addAppliance: AddAppliance):Id{
        return itemDetailsRepository.insertItem(addAppliance)
    }
    @PostMapping("/api/details")
    fun getDetailsById(@RequestBody idPair: IdPair): Details {
        return detailsRepository.getMyApp(idPair)
    }
    @PostMapping("/api/havings")
    fun addMyApp(@RequestBody edit:Edit): Id {
        return havingRepository.insertMyApp(edit)
    }
    @PatchMapping("/api/havings")
    fun patchMyApp(@RequestBody edit: Edit){
        havingRepository.fixMyApp(edit);
    }
    @DeleteMapping("/api/havings")
    fun delMyApp(@RequestBody idPair: IdPair){
        havingRepository.deleteMyApp(idPair)
    }
    @GetMapping("/api/use_places")
    fun getUsePlace(): List<IdName>{
        return placeRepository.getIdName()
    }
    @GetMapping("/api/comments/{id}")
    fun getComments(@PathVariable("id") id : Int): List<ShortHistory> {
        return historyRepository.getComments(id)
    }
}