package com.example.myHomeAppliance2

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.EmptyResultDataAccessException
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
@Component
class IdRowMapper : RowMapper<Id> {
    override fun mapRow(rs: ResultSet, rowNum: Int): Id? {
        return Id(rs.getInt(1))
    }
}

@Repository
class ItemDetailsRepository(
    @Autowired val jdbcTemplate: JdbcTemplate,
    @Autowired val itemRowMapper: ItemRowMapper,
    @Autowired val idRowMapper: IdRowMapper
){
    fun getItemDetails( id :Long): ItemDetails {
        val sql: String = "SELECT appliance.id,appliance.name,maker.name AS maker,category.name AS category,appliance.model_number FROM appliance " +
                "INNER JOIN maker ON maker.id = appliance.maker_id " +
                "INNER JOIN category ON category.id = appliance.category_id " +
                "WHERE appliance.id = ?"
        return jdbcTemplate.queryForObject(
            sql,
            itemRowMapper,
            id
        )!!
    }
    fun insertItem(addAppliance: AddAppliance): Id{
        var selectAppId:Id = Id(0);
        val selectIdSql: String = "SELECT id FROM appliance WHERE model_number = ?"
        // 既存がなかったらエラーになる？
        try {
            selectAppId = jdbcTemplate.queryForObject(selectIdSql, idRowMapper, addAppliance.modelNumber)!!
        } catch (err: EmptyResultDataAccessException) {
            val categoryId: Id = jdbcTemplate.queryForObject("SELECT id FROM category WHERE name = ?", idRowMapper ,addAppliance.categoryName)!!
            val insertAppSql: String = "INSERT INTO appliance(id,name,maker_id,category_id,model_number) VALUES (DEFAULT,?,?,?,?)"
            jdbcTemplate.update(insertAppSql,addAppliance.applianceName,addAppliance.makerId,categoryId,addAppliance.modelNumber) // ここのinsert失敗して、finallyのinsertも失敗
            selectAppId = jdbcTemplate.queryForObject(selectIdSql, idRowMapper, addAppliance.modelNumber)!!
        } finally {
            val insertSql: String = "INSERT INTO family_to_appliance (family_id,appliance_id,use_place_id,buy_date,buy_at) VALUES (?,?,?,?,?)"
            jdbcTemplate.update(insertSql,addAppliance.familyId,selectAppId.id,addAppliance.usePlaceId,addAppliance.buyDate,addAppliance.buyAt)
        }
        return selectAppId;
    }
}