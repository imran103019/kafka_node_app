# KAFKA NODE APP

# set up kafka, zookeeper, kafhq(monitor), mysql service
(before running the following command, please check the specified ports in docker-compose-kafka.yaml are free)
1. docker-compose -f docker-compose-kafka.yaml up

# kafka monitor: 
http://localhost:8089

# kafka connector api: 
http://localhost:8083


# connectiong to mysql
1. curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d @register-mysql.json


# set up producer and consumer
1. docker-compose up


# to send mysql event logs
1. login to mysql container and edit some information of customers and watch node consumer
