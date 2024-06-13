package com.example.myHomeAppliance2

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.jdbc.core.query
import org.springframework.stereotype.Component
import org.springframework.stereotype.Repository
import java.sql.ResultSet

@Component
class ShortHistoryRowMapper :RowMapper<ShortHistory> {
    override fun mapRow(rs: ResultSet, rowNum: Int): ShortHistory? {
        return ShortHistory(rs.getString(1),rs.getLong(2), rs.getLong(3))
    }
}

@Component
class HistoryRowMapper : RowMapper<History> {
    override fun mapRow(rs: ResultSet, rowNum: Int): History? {
        return History(rs.getInt(1),rs.getInt(2),rs.getLong(3),rs.getLong(4),rs.getString(5))
    }
}

@Repository
class HistoryRepository(
    @Autowired val jdbcTemplate: JdbcTemplate,
    @Autowired val shortHistoryRowMapper: ShortHistoryRowMapper
){
    fun getComments(id: Int):List<ShortHistory> {
        val sql: String = "SELECT comment,buy_date,post_date FROM history WHERE app_id = ?";
        return jdbcTemplate.query(sql,shortHistoryRowMapper,id)
    }
    fun insertComment(history: History): Id {
        val sql: String = "insert into history values (10,?,?,?,?,?);"
        jdbcTemplate.update(sql,history.familyId,history.appId,history.buyDate,history.postDate,history.comment)
        return Id(history.appId)
    }
}