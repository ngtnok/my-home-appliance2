package com.example.myHomeAppliance2

import org.hamcrest.MatcherAssert.assertThat
import org.hamcrest.Matchers.equalTo
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.client.getForEntity
import org.springframework.boot.test.web.client.postForEntity
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Component
import org.springframework.test.context.jdbc.Sql
import java.sql.ResultSet

@Component
class FamilyRowMapper : RowMapper<Id> {
	override fun mapRow(rs: ResultSet, rowNum: Int): Id? {
		return Id(rs.getInt(1))
	}
}

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Sql("/insert_appliance.sql")
class MyHomeIds2ApplicationTests(
	@Autowired val restTemplate: TestRestTemplate,
	@LocalServerPort val port: Int,
	@Autowired val jdbcTemplate: JdbcTemplate,
	@Autowired val familyRowMapper: FamilyRowMapper
) {
	@Test
	fun contextLoads() {
	}
	@Test
	fun `GET-api-idsリクエストに200を返す`() {
		val response = restTemplate.getForEntity("http://localhost:$port/api/ids", String::class.java)
		assertThat(response.statusCode, equalTo(HttpStatus.OK))
	}
	@Test
	fun `GET-api-idsリクエストにリストを返す`(){
		val response = restTemplate.getForEntity("http://localhost:$port/api/ids", Array<Ids>::class.java)
		assertThat(response.headers.contentType, equalTo(MediaType.APPLICATION_JSON))
		val todos = response.body!!
		assertThat(todos.size, equalTo(3))
		assertThat(todos[0].appId, equalTo(1))
		assertThat(todos[0].appName, equalTo("キーボード"))
		assertThat(todos[0].maker, equalTo("logicool"))
		assertThat(todos[0].modelNumber, equalTo("K855"))
		assertThat(todos[2].appId, equalTo(3))
		assertThat(todos[2].appName, equalTo("ホットクック"))
	}
	@Test
	fun `POST-api-idsリクエストに200を返す`() {
		val request = Id(1)
		val response = restTemplate.postForEntity("http://localhost:$port/api/ids",request,String::class.java)
		assertThat(response.statusCode, equalTo(HttpStatus.OK))
	}
	@Test
	fun `POST-api-idsリクエストに家族ID一致するIdsリストを返す`(){
		val request = Id(1)
		val response = restTemplate.postForEntity("http://localhost:$port/api/ids",request,Array<Ids>::class.java)
		assertThat(response.headers.contentType, equalTo(MediaType.APPLICATION_JSON))
		val arrayIds = response.body!!
		assertThat(arrayIds.size, equalTo(2))
		assertThat(arrayIds[0].appId, equalTo(1))
		assertThat(arrayIds[0].appName, equalTo("キーボード"))
		assertThat(arrayIds[1].appId, equalTo(3))
		assertThat(arrayIds[1].appName, equalTo("ホットクック"))
		assertThat(arrayIds[1].maker, equalTo("SHARP"))
		assertThat(arrayIds[1].modelNumber, equalTo("KN-HW24F-R"))
	}
//	@Test
	fun `GET-api-appliances-idリクエストに200を返す`(){
		val response = restTemplate.getForEntity("http://localhost:$port/api/appliances/3", String::class.java)
		assertThat(response.statusCode, equalTo(HttpStatus.OK))
	}
//	@Test
	fun `GET-api-appliances-idリクエストにリストを返す`() {
		val response = restTemplate.getForEntity("http://localhost:$port/api/appliances/3", ItemDetails::class.java)
		assertThat(response.headers.contentType, equalTo(MediaType.APPLICATION_JSON))
		val todos = response.body!!
		assertThat(todos.name, equalTo("ホットクック"))
		assertThat(todos.maker, equalTo("SHARP"))
		assertThat(todos.category, equalTo("大型家電"))
		assertThat(todos.modelNumber, equalTo("KN-HW24F-R"))
	}
	@Test
	fun `POST-api-details&bodyリクエストに200返す`(){
		val request = IdPair(1,3)
		val response = restTemplate.postForEntity("http://localhost:$port/api/details",request,String::class.java)
		assertThat(response.statusCode, equalTo(HttpStatus.OK))
	}
	@Test
	fun `POST-api-details&bodyリクエストに、Detailsを1件返す`() {
		val request = IdPair(1,1)
		val response = restTemplate.postForEntity("http://localhost:$port/api/details",request,Details::class.java)
		assertThat(response.headers.contentType, equalTo(MediaType.APPLICATION_JSON))
		val details = response.body!!
//		assertThat(details.size, equalTo(1))
		assertThat(details.appId, equalTo(1))
		assertThat(details.usePlace, equalTo("キッチン"))
		assertThat(details.buyAt, equalTo("楽天市場"))
	}
//	@Test
	fun `POST-api-appliances&bodyリクエストに、登録したappliance_idを返す`() {
//		buyDate = "2011-12-01"
		val request = AddAppliance(1,"パソコン", "sample-model-number",3,"小型家電",4,1322697600000,"電気屋さん")
		val response = restTemplate.postForEntity("http://localhost:$port/api/appliances",request,Id::class.java)
		assertThat(response.headers.contentType, equalTo(MediaType.APPLICATION_JSON))
		val addId = response.body!!
		assertThat(addId.id, equalTo(4))
	}
//	@Test
	fun `GET-api-use_placesリクエストに、use_placeテーブルからid,nameを返す`(){
		val response = restTemplate.getForEntity("http://localhost:${port}/api/use_places", Array<IdName>::class.java)
		assertThat(response.headers.contentType, equalTo(MediaType.APPLICATION_JSON))
		val placeIdName = response.body!!
		assertThat(placeIdName.size, equalTo(8))
		assertThat(placeIdName[1].id, equalTo(2))
		assertThat(placeIdName[1].name, equalTo("ダイニング"))
	}

	@Test
	fun `POST-api-havings-with-bodyリクエストで、family_to_applianceにinsertする。appIdを返す`(){
		val before = jdbcTemplate.query("SELECT * FROM family_to_appliance", familyRowMapper)
//		"buy-date:2011-11-25"
		val request = Edit(2,2,"その他",1322179200000,"")
		val response = restTemplate.postForEntity("http://localhost:${port}/api/havings",request, Id::class.java)
		val id: Id = response.body!!
		assertThat(id.id, equalTo(2))
		val after = jdbcTemplate.query("SELECT * FROM family_to_appliance", familyRowMapper)
		assertThat(before.size + 1, equalTo(after.size))
	}
//	@Test
//	fun `PATCH-api-havings-with-bodyリクエストで、family_to_applianceにupdateする。appIdを返す`(){
//		"buy-date:2011-11-25"
//		val request = Edit(2,2,"リビング",1322179200000,"ケーヨーデイツー")
//		restTemplate.setRequest
//		val response = restTemplate.patchForObject("http://localhost:${port}/api/havings",request, Id::class.java)
//		val id = response.body!!
//		assertThat(id.id, equalTo(2))
//	}
	@Test
	fun `DELETE`(){
		val before = jdbcTemplate.query("SELECT * FROM family_to_appliance", familyRowMapper)
		val request = IdPair(1,1)
		restTemplate.delete("http://localhost:${port}/api/havings",request)
		val after = jdbcTemplate.query("SELECT * FROM family_to_appliance", familyRowMapper)
		assertThat(before.size - 1, equalTo(after.size))
	}
}
