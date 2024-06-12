FROM amazoncorretto:21 AS build
COPY ./ /home/app
RUN cd /home/app && ./gradlew build

FROM amazoncorretto:21-alpine
COPY --from=build /home/app/build/libs/spring-render-deploy-0.0.1-SNAPSHOT.jar /usr/local/lib/myHomeAppliance2.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","-Dfile.encoding=UTF-8","/usr/local/lib/myHomeAppliance2.jar"]