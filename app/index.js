import clock from "clock";
import {battery} from "power";
import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";
import * as document from "document";
import { preferences } from "user-settings";

function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");
const batteryLabel = document.getElementById("batteryLabel");

if(HeartRateSensor){
    const hrm = new HeartRateSensor({ frequency: 1 });
}

if(BodyPresenceSensor){
    const body = new BodyPresenceSensor();
    if (!body.present) {
        hrm.stop();
      } else {
        hrm.start();
      }
}


// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = zeroPad(hours);
  }
  let mins = zeroPad(today.getMinutes());
  batteryLabel.text = `${battery.chargeLevel}%`;
  myLabel.text = `${hours}:${mins}`;
}