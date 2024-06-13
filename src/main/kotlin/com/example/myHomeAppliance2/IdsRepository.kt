package com.example.myHomeAppliance2

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.jdbc.core.queryForObject
import org.springframework.stereotype.Component
import org.springframework.stereotype.Repository
import org.springframework.web.bind.annotation.RequestBody
import java.sql.ResultSet

@Component
class IdsRowMapper : RowMapper<Ids>{
    override fun mapRow(rs: ResultSet,rowNum: Int): Ids {
        return Ids(rs.getInt(1),rs.getString(2),rs.getString(3),rs.getString(4))
    }
}

@Repository
class IdsRepository(
    @Autowired val jdbcTemplate: JdbcTemplate,
    @Autowired val idsRowMapper: IdsRowMapper
){
    fun getIds(): List<Ids> {
        return jdbcTemplate.query("SELECT appliance.id,appliance.name,maker.name AS maker,model_number FROM appliance INNER JOIN maker ON maker.id = maker_id", idsRowMapper)
    }
    fun getMyIds(id: Int): List<Ids> {
        val sql:String = "SELECT appliance_id AS id, appliance.name AS name,maker.name AS maker, appliance.model_number " +
                "FROM family_to_appliance " +
                "INNER JOIN appliance ON appliance.id = family_to_appliance.appliance_id " +
                "INNER JOIN maker ON appliance.maker_id = maker.id " +
                "WHERE family_id = ?"
        return jdbcTemplate.query(sql,idsRowMapper,id)
    }
}

