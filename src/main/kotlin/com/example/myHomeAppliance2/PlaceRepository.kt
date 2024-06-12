package com.example.myHomeAppliance2

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Component
import org.springframework.stereotype.Repository
import java.sql.ResultSet

@Component
class PlaceIdNameRowMapper : RowMapper<IdName> {
    override fun mapRow(rs: ResultSet, rowNum: Int): IdName? {
        return IdName(rs.getInt(1),rs.getString(2))
    }
}

@Repository
class PlaceRepository(
    @Autowired val jdbcTemplate: JdbcTemplate,
    @Autowired val placeIdNameRowMapper: PlaceIdNameRowMapper
) {
    fun getIdName(): List<IdName> {
        return jdbcTemplate.query("SELECT id,name FROM use_place",placeIdNameRowMapper)
    }
}