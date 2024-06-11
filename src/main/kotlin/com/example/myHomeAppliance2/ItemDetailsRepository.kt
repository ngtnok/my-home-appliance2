package com.example.myHomeAppliance2

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.jdbc.core.queryForObject
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
        return Id(rs.getLong(1))
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
        val selectIdSql: String = "SELECT id FROM appliance WHERE model_number = ?"
        // 既存がなかったらエラーになる？
        val selectAppId: Id = jdbcTemplate.queryForObject(selectIdSql, idRowMapper, addAppliance.modelNumber)!!
        val categoryId = jdbcTemplate.queryForObject("SELECT id FROM category WHERE name = ?", idRowMapper ,addAppliance.categoryName)
        // 既存がないときだけ、INSERTすべき
        val insertAppSql: String = "INSERT INTO appliance(name, maker_id, category_id,model_number) VALUES (?,?,?,?)"
        jdbcTemplate.update(insertAppSql,addAppliance.applianceName,addAppliance.makerId,categoryId,addAppliance.modelNumber)

        val insertSql: String = "INSERT INTO family_to_appliance (family_id,appliance_id,use_place_id,buy_date,buy_at) " +
                "VALUES (?,?,?,?,?)"
        jdbcTemplate.update(insertSql,addAppliance.familyId,selectAppId.id,addAppliance.usePlaceId,addAppliance.buyDate,addAppliance.buyAt)
        return selectAppId;
    }
}