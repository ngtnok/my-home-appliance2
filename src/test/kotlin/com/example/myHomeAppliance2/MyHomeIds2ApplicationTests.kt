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
import org.springframework.test.context.jdbc.Sql

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Sql("/insert_appliance.sql")
class MyHomeIds2ApplicationTests(
	@Autowired val restTemplate: TestRestTemplate,
	@LocalServerPort val port: Int
) {
	@Test
	fun contextLoads() {
	}
	@Test
	fun `GET-api-appliances-idsリクエストに200を返す`() {
		val response = restTemplate.getForEntity("http://localhost:$port/api/appliances/ids", String::class.java)
		assertThat(response.statusCode, equalTo(HttpStatus.OK))
	}
	@Test
	fun `GET-api-appliances-idsリクエストにリストを返す`(){
		val response = restTemplate.getForEntity("http://localhost:$port/api/appliances/ids", Array<Ids>::class.java)
		assertThat(response.headers.contentType, equalTo(MediaType.APPLICATION_JSON))
		val todos = response.body!!
		assertThat(todos.size, equalTo(3))
		assertThat(todos[0].id, equalTo(1))
		assertThat(todos[0].name, equalTo("キーボード"))
		assertThat(todos[2].id, equalTo(3))
		assertThat(todos[2].name, equalTo("ホットクック"))
	}
	@Test
	fun `POST-api-appliance-idsリクエストに200を返す`() {
		val request = Id(1)
		val response = restTemplate.postForEntity("http://localhost:$port/api/appliances/ids",request,String::class.java)
		assertThat(response.statusCode, equalTo(HttpStatus.OK))
	}
	@Test
	fun `POST-api-appliance-idsリクエストに家族ID一致するIdsリストを返す`(){
		val request = Id(1)
		val response = restTemplate.postForEntity("http://localhost:$port/api/appliances/ids",request,Array<Ids>::class.java)
		assertThat(response.headers.contentType, equalTo(MediaType.APPLICATION_JSON))
		val arrayIds = response.body!!
		assertThat(arrayIds.size, equalTo(2))
		assertThat(arrayIds[0].id, equalTo(1))
		assertThat(arrayIds[0].name, equalTo("キーボード"))
		assertThat(arrayIds[1].id, equalTo(3))
		assertThat(arrayIds[1].name, equalTo("ホットクック"))
	}
	@Test
	fun `GET-api-appliances-idリクエストに200を返す`(){
		val response = restTemplate.getForEntity("http://localhost:$port/api/appliances/3", String::class.java)
		assertThat(response.statusCode, equalTo(HttpStatus.OK))
	}
	@Test
	fun `GET-api-appliances-idリクエストにリストを返す`() {
		val response = restTemplate.getForEntity("http://localhost:$port/api/appliances/3", ItemDetails::class.java)
		assertThat(response.headers.contentType, equalTo(MediaType.APPLICATION_JSON))
		val todos = response.body!!
		assertThat(todos.name, equalTo("ホットクック"))
		assertThat(todos.maker, equalTo("SHARP"))
		assertThat(todos.category, equalTo("大型家電"))
		assertThat(todos.modelNumber, equalTo("KN-HW24F-R"))
	}
//	@Test
//	fun `POST-api-appliances&bodyリクエストに200返す`(){
//		val request = AddAppliance(1)
//		val response = restTemplate.postForEntity("http://localhost:$port/api/appliances",request,String::class.java)
//		assertThat(response.statusCode, equalTo(HttpStatus.OK))
//	}
	@Test
	fun `POST-api-appliances&bodyリクエストに、既存appliance_idを返す`() {
//		buyDate = "2011-12-01"
		val request = AddAppliance(1,"スマホ", "CPH2523",11,"小型家電",8,1322697600000,"楽天モバイル")
		val response = restTemplate.postForEntity("http://localhost:$port/api/appliances",request,Id::class.java)
		assertThat(response.headers.contentType, equalTo(MediaType.APPLICATION_JSON))
		val addId = response.body!!
		assertThat(addId.id, equalTo(2))
	}
	@Test
	fun `POST-api-appliances&bodyリクエストに、登録したappliance_idを返す`() {
//		buyDate = "2011-12-01"
		val request = AddAppliance(1,"パソコン", "sample-model-number",3,"小型家電",4,1322697600000,"電気屋さん")
		val response = restTemplate.postForEntity("http://localhost:$port/api/appliances",request,Id::class.java)
		assertThat(response.headers.contentType, equalTo(MediaType.APPLICATION_JSON))
		val addId = response.body!!
		assertThat(addId.id, equalTo(4))
	}
	@Test
	fun `GET-api-use_placesリクエストに、use_placeテーブルからid,nameを返す`(){
		val response = restTemplate.getForEntity("http://localhost:${port}/api/use_places", Array<IdName>::class.java)
		assertThat(response.headers.contentType, equalTo(MediaType.APPLICATION_JSON))
		val placeIdName = response.body!!
		assertThat(placeIdName.size, equalTo(8))
		assertThat(placeIdName[1].id, equalTo(2))
		assertThat(placeIdName[1].name, equalTo("ダイニング"))
	}
}
