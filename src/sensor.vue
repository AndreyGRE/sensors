<template>
  <b-card>
      <div class="sensorName" @click="showInfo(index)">
        Датчик №{{ this.index + 1 }} {{ this.dataSensor.name }}
      </div>
      <div v-if="selectedItem.includes(index)" class="senserInfo">
        <div class="sensorTemperature">
          Температура:
          {{ this.dataSensor.temperature? this.dataSensor.temperature.toFixed(2) + "°C" : "нет данных" }}
        </div>
        <div class="humidity">
          Влажность:{{ this.dataSensor.humidity ? this.dataSensor.humidity.toFixed(2) + "%" : "нет данных" }}
        </div>
        <button @click="deleteSensor(index)">удалить</button>
      </div>
    </b-card>

</template>

<script>
import Sensor from './Sensor.js';
export default {
  props: {
    index: Number,
    dataSensor: Sensor,
    selectedItem: Array,
  },
  created() {
    console.log(this.dataSensor) 
  },

  methods: {
    showInfo(index) {
      this.$emit("showInfo", index);
    },
    deleteSensor(index) {
      this.$emit("delete", index);
    },
    startRandomUpdates() {
      this.allSensor.forEach((sensor) => {
        this.updateSensorData(sensor);
      });
    },
    updateSensorData(sensor) {
      setInterval(() => {
        if (sensor.temperature !== "") {
          sensor.temperature = this.getRandomValue(
            sensor.temperature,
            0.1,
            -0.1
          ).toFixed(2);
        }
        if (sensor.humidity !== "") {
          sensor.humidity = this.getRandomValue(
            sensor.humidity,
            0.1,
            -0.1
          ).toFixed(2);
        }
      }, this.getRandomTime());
    },
    // случайное значение времени в пределах 5 секунд
    getRandomTime() {
      return Math.round(Math.random() * 3000) + 2000;
    },
    // случайное значение
    getRandomValue(value, max, min) {
      return Number(value) + Math.random() * (max - min) + min;
    },
  },
};
</script>
