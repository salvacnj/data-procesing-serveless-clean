#!/usr/bin/env bash


# Configuration
ENDPOINT="a2l07mkudbm5av-ats.iot.eu-west-1.amazonaws.com"
CLIENT_ID="sdk-nodejs-v2"
TOPIC="data/environment/"
PRIVATE_KEY="simulator.private.key"
CERTIFICATE="simulator.cert.pem"
ROOT_CA="root-CA.crt"


# Generate sensor data
generate_sensor_data() {
  local siteId=$((RANDOM % 5))
  local greenhouseId=$((RANDOM % 10))
  local temperature=$(echo "scale=2; $((RANDOM % 10000)) / 100" | bc)
  local humidity=$(echo "scale=2; $((RANDOM % 10000)) / 100" | bc)
  local pressure=$(echo "scale=2; $((RANDOM % 10000)) / 100" | bc)
  local co2=$(echo "scale=2; $((RANDOM % 10000)) / 100" | bc)
  local ppfd=$(echo "scale=2; $((RANDOM % 10000)) / 100" | bc)
  local timestamp=$(date +%s)
  local sensorData=$(cat <<EOF
{
  "siteId": "$siteId",
  "greenhouseId": "$greenhouseId",
  "temperature": "$temperature",
  "humidity": "$humidity",
  "pressure": "$pressure",
  "co2": "$co2",
  "ppfd": "$ppfd",
  "ts": "$timestamp"
}
EOF
)
  echo $sensorData
}


publish_data() {
  local data=$(generate_sensor_data)
  local sensorId=$((RANDOM % 50))
  mosquitto_pub --cafile $ROOT_CA --cert $CERTIFICATE --key $PRIVATE_KEY -h $ENDPOINT -p 8883 -q 0 --tls-version tlsv1.2 -d -V mqttv5 -t "$TOPIC"device$sensorId -m "$data"
  echo "Data published: $data"
}

# Publish 2500 messages in 15 minutes
while true; do
  publish_data
  sleep 0.36
done
