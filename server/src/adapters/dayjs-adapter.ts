import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

export function year() {
	return dayjs().year();
}

export function week() {
	dayjs.extend(weekOfYear);
	return dayjs().week();
}

export function startOfWeek() {
	return dayjs().startOf("week");
}

export function lastDayOfWeek() {
	return dayjs().endOf("week");
}