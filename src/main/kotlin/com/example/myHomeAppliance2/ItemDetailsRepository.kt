package com.example.myHomeAppliance2

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Component
import org.springframework.stereotype.Repository
import java.sql.ResultSet

@Component
class ItemRowMapper : RowMapper<ItemDetails> {
    override fun mapRow(rs: ResultSet, rowNum: Int): ItemDetails? {
        return ItemDetails(rs.getLong(1),rs.getString(2),
            rs.getString(3),rs.getString(4),rs.getString(5))
    }
}

@Repository
class ItemDetailsRepository(
    @Autowired val jdbcTemplate: JdbcTemplate,
    @Autowired val itemRowMapper: ItemRowMapper
){
    fun getItemDetails( id :Long): ItemDetails {
        val sql: String = "SELECT appliance.id,appliance.name,maker.name AS maker,category.name AS category,appliance.model_number FROM appliance " +
                "INNER JOIN maker ON maker.id = appliance.maker_id " +
                "INNER JOIN category ON category.id = appliance.category_id " +
                "WHERE appliance.id = " + id
        val list: List<ItemDetails> =jdbcTemplate.query(
            sql,
            itemRowMapper
        )
        return list[0]
    }
}