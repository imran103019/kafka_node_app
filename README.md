# KAFKA NODE APP

# Ket up kafka, zookeeper, kafhq(monitor), mysql service
(before running the following command, please check the specified ports in docker-compose-kafka.yaml are free)
1. docker-compose -f docker-compose-kafka.yaml up

# Kafka monitor: 
http://localhost:8089

# Kafka connector api: 
http://localhost:8083

# Connectiong to mysql
1. curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d @register-mysql.json

# Set up producer and consumer
1. docker-compose up

# To send mysql event logs
1. login to mysql container and edit some information of customers and watch node consumer
