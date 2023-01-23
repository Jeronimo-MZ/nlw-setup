import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"; // dependent on utc plugin
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

const TIMEZONE = "Africa/Maputo";
dayjs.tz.setDefault(TIMEZONE);
