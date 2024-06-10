package com.example.myHomeAppliance2

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Component
import org.springframework.stereotype.Repository
import java.sql.ResultSet

@Component
class IdsRowMapper : RowMapper<Ids>{
    override fun mapRow(rs: ResultSet,rowNum: Int): Ids {
        return Ids(rs.getLong(1),rs.getString(2))
    }
}

@Repository
class IdsRepository(
    @Autowired val jdbcTemplate: JdbcTemplate,
    @Autowired val idsRowMapper: IdsRowMapper
){
    fun getIds(): List<Ids> {
        return jdbcTemplate.query("SELECT id,name FROM appliance", idsRowMapper)
    }
}

