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
        <b-button @click="deleteSensor(index)">удалить</b-button>
      </div>
    </b-card>

</template>

<script>
import Sensor from '../Sensor.js';
export default {
  props: {
    index: Number,
    dataSensor: Sensor,
    selectedItem: Array,
  },
  methods: {
    showInfo(index) {
      this.$emit("showInfo", index);
    },
    deleteSensor(index) {
      this.$emit("delete", index);
    },
  },
};
</script>
