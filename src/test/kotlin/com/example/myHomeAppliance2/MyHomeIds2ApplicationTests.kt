package com.example.myHomeAppliance2

import org.hamcrest.MatcherAssert.assertThat
import org.hamcrest.Matchers.equalTo
import org.hamcrest.Matchers.not
import org.jetbrains.annotations.NotNull
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.test.context.jdbc.Sql

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@Sql("/insert_appliance.sql")
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
		assertThat(todos[0].id, equalTo(76))
		assertThat(todos[0].name, equalTo("キーボード"))
		assertThat(todos[2].id, equalTo(78))
		assertThat(todos[2].name, equalTo("ホットクック"))
	}
	@Test
	fun `GET-api-appliances-idリクエストに200を返す`(){
		val response = restTemplate.getForEntity("http://localhost:$port/api/appliances/78", String::class.java)
		assertThat(response.statusCode, equalTo(HttpStatus.OK))
	}
	@Test
	fun `GET-api-appliances-idリクエストにリストを返す`() {
		val response = restTemplate.getForEntity("http://localhost:$port/api/appliances/78", ItemDetails::class.java)
		assertThat(response.headers.contentType, equalTo(MediaType.APPLICATION_JSON))
		val todos = response.body!!
		assertThat(todos.name, equalTo("ホットクック"))
		assertThat(todos.maker, equalTo("SHARP"))
		assertThat(todos.modelNumber, equalTo("KN-HW24F-R"))
	}
}
