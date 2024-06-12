package com.example.myHomeAppliance2

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.jdbc.core.queryForObject
import org.springframework.stereotype.Component
import org.springframework.stereotype.Repository
import java.sql.ResultSet

@Component
class DetailsRowMapper: RowMapper<Details> {
    override fun mapRow(rs: ResultSet, rowNum: Int): Details? {
        return Details(
            rs.getInt(1),
            rs.getString(2),
            rs.getString(3),
            rs.getString(4),
            rs.getString(5),
            rs.getLong(6),
            rs.getString(7)
            )
    }
}

@Repository
class DetailsRepository(
    @Autowired val jdbcTemplate: JdbcTemplate,
    @Autowired val detailsRowMapper: DetailsRowMapper
){
    fun getMyApp(idPair: IdPair): Details{
        val sql: String = "SELECT appliance.id, appliance.name, maker.name AS maker, " +
                "appliance.model_number, use_place.name AS use_place, family_to_appliance.buy_date, " +
                "family_to_appliance.buy_at FROM family_to_appliance " +
                "INNER JOIN appliance ON appliance.id = family_to_appliance.appliance_id " +
                "INNER JOIN maker ON maker.id = appliance.maker_id " +
                "INNER JOIN use_place ON use_place.id = family_to_appliance.use_place_id " +
                "WHERE family_to_appliance.family_id = ? AND family_to_appliance.appliance_id = ?;"
        return jdbcTemplate.queryForObject(sql,detailsRowMapper,idPair.familyId,idPair.appId)!!
    }
}