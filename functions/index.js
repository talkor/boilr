const functions = require('firebase-functions');
const admin = require('firebase-admin');
const spacetime = require('spacetime');

admin.initializeApp();

const db = admin.firestore();

const DEVICE_ID = 'mhXWbGB4UxIdOPqeoOJz';
const MAX_TEMP = 99;
const MIN_TEMP = 25;

exports.taskRunner = functions.pubsub
  .schedule('* * * * *')
  .timeZone('Asia/Jerusalem')
  .onRun(async (context) => {
    const schedule = await fetchSchedule();
    scheduler(schedule);

    // Simulation
    temperatueSimulation();
  });

const getCurrentDay = () => {
  return spacetime.now().goto('Asia/Jerusalem').day();
};

const getCurrentTime = () => {
  const time = spacetime
    .now()
    .goto('Asia/Jerusalem')
    .format('time-24')
    .split(':');
  const paddedHours = `${time[0]}`.padStart(2, 0);
  const paddedMinutes = `${time[1]}`.padStart(2, 0);
  return `${paddedHours}:${paddedMinutes}`;
};

const fetchSchedule = async () => {
  const { schedule } = await db
    .collection('devices')
    .doc(DEVICE_ID)
    .get()
    .then((snapshot) => {
      return { ...snapshot.data() };
    });

  return schedule;
};

const temperatueSimulation = async () => {
  const { active, temperature } = await db
    .collection('devices')
    .doc(DEVICE_ID)
    .get()
    .then((snapshot) => {
      return { ...snapshot.data() };
    });

  if (active) {
    if (temperature < MAX_TEMP) {
      setBoilerTemperature(temperature + 2);
    } else {
      setBoilerActive(false);
    }
  } else if (temperature > MIN_TEMP) {
    setBoilerTemperature(temperature - 0.1);
  }
};

const setBoilerActive = async (value) => {
  return db
    .collection('devices')
    .doc(DEVICE_ID)
    .set({ active: value }, { merge: true });
};

const getBoilerActive = async () => {
  const { active } = await db
    .collection('devices')
    .doc(DEVICE_ID)
    .get()
    .then((snapshot) => {
      return { ...snapshot.data() };
    });

  return active;
};

const setBoilerTemperature = async (value) => {
  return db
    .collection('devices')
    .doc(DEVICE_ID)
    .set({ temperature: value }, { merge: true });
};

const setShowerReady = async (data) => {
  return db
    .collection('devices')
    .doc(DEVICE_ID)
    .set({ showerData: { ...data, ready: true } }, { merge: true });
};

const timeMapper = (schedule) => {
  let timeMapper = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: []
  };

  schedule.map((item) => {
    if (item.repeat) {
      item.days
        .filter((day) => !day.active)
        .forEach((day, dayIndex) => {
          if (day) {
            const boilerStartTime = spacetime()
              .time(item.time)
              .subtract(item.duration, 'minutes')
              .format('time-24')
              .split(':');
            const paddedHours = `${boilerStartTime[0]}`.padStart(2, 0);
            const paddedMinutes = `${boilerStartTime[1]}`.padStart(2, 0);
            const startTime = `${paddedHours}:${paddedMinutes}`;

            timeMapper[dayIndex].push({ time: startTime, event: 'on' });
            timeMapper[dayIndex].push({
              time: item.time,
              event: 'off',
              uuid: item.uuid,
              id: item.id,
              duration: item.duration
            });
          }
        });
    } else {
      // single schedule
    }
  });

  return timeMapper;
};

const scheduler = async (schedule) => {
  const currentDay = getCurrentDay();
  const currentTime = getCurrentTime();
  const timeMap = timeMapper(schedule);
  const todaysSchedule = timeMap[currentDay];

  todaysSchedule.forEach(({ time, event, id, uuid, duration }) => {
    console.log('Compare: ', time, currentTime);
    if (time === currentTime) {
      console.log('OK!');
      setBoilerActive(event === 'on' ? true : false);
      log({ event });

      if (event === 'off') {
        setShowerReady({ id, uuid, duration });
      }
    }
  });
};

const log = async (data) => {
  return db
    .collection('devices')
    .doc(DEVICE_ID)
    .update({
      log: admin.firestore.FieldValue.arrayUnion({
        timestamp: new Date(),
        ...data
      })
    });
};
