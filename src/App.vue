<template>
  <div id="app">
    <div class="allSensor">
      <add-sensor @add="addSensor"> </add-sensor>
      <b-list-group-item v-for="(item, index) in allSensor" :key="item.sensor_id" class="sensor">
        <sensorComp
          :index = "index"
          :dataSensor="item"
          :selectedItem="selectedItem"
          @delete="deleteSensor"
          @showInfo="showInfo"
        >
        </sensorComp>
      </b-list-group-item>
    </div>
  </div>
</template>

<script>
import sensorComp from "./components/sensor.vue";
import AddSensor from "./components/AddSensor.vue";
import AllSensor from "./event.json";
import Sensor from "./Sensor.js";
export default {
  components: {
    AddSensor,
    sensorComp,
  },
  name: "app",
  data() {
    return {
      allSensor: [],
      selectedItem: [],
    };
  },
  created() {
    // Проверяем наличие данных в localStorage
    const localStorageData = localStorage.getItem("allSensor");
    let sensors = [];
    if (localStorageData) {
      // Если данные есть, используем их, а не Json
      sensors = JSON.parse(localStorageData);
    } else {
      sensors = AllSensor;
    }
    this.allSensor = sensors.map((item) => new Sensor(item));
  },
  methods: {
    // показ подробной информации о датчике
    showInfo(item) {
      let index = this.selectedItem.indexOf(item);
      if (index > -1) {
        this.selectedItem.splice(index, 1);
        return this.selectedItem;
      } else {
        this.selectedItem.push(item);
        return this.selectedItem;
      }
    },
    // удаление датчика
    deleteSensor(item) {
      // изменение выбранных для подробного просмотра
      this.selectedItem = this.selectedItem.map((el) => {
        if (el > item) {
          el = el - 1;
          return el;
        } else if (el === item) {
          return null;
        } else {
          return el;
        }
      });
      // удаление
      this.allSensor.splice(item, 1);
      // обновление localStorage
      localStorage.setItem("allSensor", JSON.stringify(this.allSensor));
    },
    addSensor(name, temperature, humidity) {
      // добавление нового датчика
      this.allSensor.push(new Sensor({name, temperature, humidity}))
      
      // обновление localStorage
      localStorage.setItem("allSensor", JSON.stringify(this.allSensor));
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.allSensor {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: stretch;
  max-width: 500px;
}
.sensor {
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
  margin: 1px;
  justify-content: flex-start;
}
.sensorName {
  cursor: pointer;
  margin: 10px 0;
}
.sensorName:hover {
  cursor: pointer;
  text-decoration: underline;
}
.senserInfo {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.addSensor {
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
  margin: 1px;
  justify-content: flex-start;
}
.newSensor {
  display: flex;
  flex-direction: column;
}
</style>
