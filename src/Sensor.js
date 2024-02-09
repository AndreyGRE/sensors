import { v4 as uuidv4 } from "uuid";
const max = 0.1;
const min = -0.1;

export default class Sensor {
 
    constructor({sensor_id, name, humidity, temperature}){
        this.sensor_id = sensor_id || uuidv4();
        this.name = name;
        this.humidity = Number(humidity);
        this.temperature = Number(temperature);
        setInterval(() => {
            return this.humidity += Math.random() * (max - min) + min
        }, Math.round(Math.random() * 3000) + 2000);   
        setInterval(() => {
            return this.temperature += Math.random() * (max - min) + min
        }, Math.round(Math.random() * 3000) + 2000);   
    }
}
