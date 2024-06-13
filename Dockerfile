#RUN cd /frontend && npm i && npm run build




FROM amazoncorretto:21 AS build
COPY ./ /home/app
RUN cd /home/app && ./gradlew build -x test

#FROM amazoncorretto:21-alpine
#EXPOSE 8081
ENTRYPOINT ["java","-jar","-Dfile.encoding=UTF-8","/home/app/build/libs/myHomeAppliance2-0.0.1-SNAPSHOT.jar"]