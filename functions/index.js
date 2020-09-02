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
  return spacetime.now().goto('Asia/Jerusalem').format('time-24');
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
    item.days.forEach((day, dayIndex) => {
      if (day) {
        const boilerStartTime = spacetime()
          .time(item.time)
          .subtract(item.duration, 'minutes')
          .format('time-24');
        timeMapper[dayIndex].push({ time: boilerStartTime, event: 'on' });
        timeMapper[dayIndex].push({ time: item.time, event: 'off' });
      }
    });
  });

  return timeMapper;
};

const scheduler = async (schedule) => {
  const currentDay = getCurrentDay();
  const currentTime = getCurrentTime();
  // const boilerActive = await getBoilerActive();

  const timeMap = timeMapper(schedule);
  const todaysSchedule = timeMap[currentDay];

  todaysSchedule.forEach(({ time, event }) => {
    if (time === currentTime) {
      setBoilerActive(event === 'on' ? true : false);
      log({ event });
    }
  });
};

const log = async (data) => {
  return db
    .collection('devices')
    .doc(DEVICE_ID)
    .update({
      log: firebase.firestore.FieldValue.arrayUnion({
        timestamp: new Date(),
        ...data
      })
    });
};
