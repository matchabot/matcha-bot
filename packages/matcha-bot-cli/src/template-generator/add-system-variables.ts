import { version } from "../version";
import moment from "moment";

export const getSystemVariables = () => {
  return {
    __currentDateTime: moment().format("YYYY/MM/DD HH:mm:ss"),
    __generatorVersion: version,
    __currentYear: moment().format("YYYY"),
    __currentMonth: moment().format("MM"),
    __currentDay: moment().format(""),
    process: {
      env: {
        ...process.env,
      },
    },
  };
};
