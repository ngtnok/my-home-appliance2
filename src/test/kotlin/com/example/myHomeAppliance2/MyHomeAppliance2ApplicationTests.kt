package com.example.myHomeAppliance2

import org.hamcrest.MatcherAssert.assertThat
import org.hamcrest.Matchers.equalTo
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpStatus

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class MyHomeAppliance2ApplicationTests(
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
}
