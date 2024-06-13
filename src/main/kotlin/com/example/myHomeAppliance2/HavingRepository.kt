package com.example.myHomeAppliance2

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Component
import org.springframework.stereotype.Repository
import java.sql.ResultSet

//@Component
//class IdRowMapper : RowMapper<Id> {
//    override fun mapRow(rs: ResultSet, rowNum: Int): Id? {
//        return Id(rs.getInt(1))
//    }
//}

@Repository
class HavingRepository(
    @Autowired val jdbcTemplate: JdbcTemplate,
    @Autowired val idRowMapper: IdRowMapper
    ){
    fun insertMyApp(edit: Edit):Id{
        val usePlaceId: Id = jdbcTemplate.queryForObject("SELECT id FROM use_place WHERE name = ?",idRowMapper,edit.usePlace)!!
        val sql: String = "INSERT INTO family_to_appliance(" +
                "family_id,appliance_id,use_place_id,buy_date,buy_at" +
                ") VALUES (?,?,?,?,?)"
        jdbcTemplate.update(sql,edit.familyId,edit.appId,usePlaceId.id,edit.buyDate,edit.buyAt)
        return Id(edit.appId)
    }
    fun fixMyApp(edit: Edit) {
        if (edit.usePlace.toBoolean()) {
            val sql: String = "UPDATE family_to_appliance SET use_place = ? WHERE family_id = ? AND appliance_id = ?";
            jdbcTemplate.update(sql,edit.usePlace,edit.familyId,edit.appId);
        }
        if (edit.usePlace.toBoolean()) {
            val sql: String = "UPDATE family_to_appliance SET buy_date = ? WHERE family_id = ? AND appliance_id = ?";
            jdbcTemplate.update(sql,edit.buyDate,edit.familyId,edit.appId);
        }
        if (edit.usePlace.toBoolean()) {
            val sql: String = "UPDATE family_to_appliance SET buy_at = ? WHERE family_id = ? AND appliance_id = ?";
            jdbcTemplate.update(sql,edit.buyAt,edit.familyId,edit.appId);
        }
    }
    fun deleteMyApp(idPair: IdPair) {
        val sql: String = "DELETE FROM family_to_appliance WHERE family_id = ? AND appliance_id = ?"
        jdbcTemplate.update(sql,idPair.familyId,idPair.appId)
    }
}