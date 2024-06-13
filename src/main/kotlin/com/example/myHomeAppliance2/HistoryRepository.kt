package com.example.myHomeAppliance2

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.jdbc.core.query
import org.springframework.stereotype.Component
import org.springframework.stereotype.Repository
import java.sql.ResultSet

@Component
class HistoryRowMapper :RowMapper<ShortHistory> {
    override fun mapRow(rs: ResultSet, rowNum: Int): ShortHistory? {
        return ShortHistory(rs.getString(1),rs.getLong(2), rs.getLong(3))
    }
}

@Repository
class HistoryRepository(
    @Autowired val jdbcTemplate: JdbcTemplate,
    @Autowired val historyRowMapper: HistoryRowMapper
){
    fun getComments(id: Int):List<ShortHistory> {
        val sql: String = "SELECT comment,buy_date,post_date FROM history WHERE app_id = ?";
        return jdbcTemplate.query(sql,historyRowMapper,id)
    }
}