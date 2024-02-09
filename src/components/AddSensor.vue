<template>
  <div class="addSensor">
    <b-button @click="toggleAddSensor" class="btnAddSensor">
      {{ showAddSensor ? "Скрыть" : "Добавить датчик" }}
    </b-button>
    <div v-if="showAddSensor" class="newSensor">
      <label for="nameSensor">Имя</label>
      <b-form-input id="nameSensor" v-model="inputName" placeholder="Имя датчика" />
      <label for="temperature">Температура </label>
      <b-form-input
        id="temperature"
        v-model="inputTemperature"
        placeholder="Температура °C"
      />
      <label for="humidity">Влажность </label>
      <b-form-input id="humidity" v-model="inputHumidity" placeholder="Влажность %" />
      <div v-if="errorValidation" class="error">ошибка валидации</div>
      <b-button @click="addSensor">Добавить</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showAddSensor: false,
      inputName: "",
      inputTemperature: "",
      inputHumidity: "",
      errorValidation: false,
    };
  },
  methods: {
    toggleAddSensor() {
      this.showAddSensor = !this.showAddSensor;
    },
    addSensor() {
        // проверка на наличее названия датчика 
        //  валидация
        if (!this.inputName) {
            this.errorValidation = true;
            return;
        }
            if (
            this.inputTemperature && 
            (isNaN(this.inputTemperature) || 
            this.inputTemperature < -100 || 
            this.inputTemperature > 100)
            ) {
            this.errorValidation = true;
            return;
        }

        if (
            this.inputHumidity && 
            (isNaN(this.inputHumidity) || 
            this.inputHumidity < 0 || 
            this.inputHumidity > 100)) 
        {
            this.errorValidation = true;
            return;
        }

        const nameRegex = /^[A-Za-zА-Яа-я0-9/]+$/;
        const temperatureRegex = /^-?\d*\.?\d*$/;
        const humidityRegex = /^\d*\.?\d*$/;

        if (this.inputName && !nameRegex.test(this.inputName)) {
            this.errorValidation = true;
            return;
        }

        if (this.inputTemperature && !temperatureRegex.test(this.inputTemperature)) {
            this.errorValidation = true;
            return;
        }

        if (this.inputHumidity && !humidityRegex.test(this.inputHumidity)) {
            this.errorValidation = true;
            return;
        }
      this.$emit(
        "add",
        this.inputName,
        this.inputTemperature,
        this.inputHumidity
      );
      // очистка input
      this.showAddSensor = false;
      this.inputName = "";
      this.inputTemperature = "";
      this.inputHumidity = "";
      this.errorValidation = false;
    },
  },
};
</script>
