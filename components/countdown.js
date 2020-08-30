import { intervalToDuration, format } from "date-fns";

const TimePanel = ({ value, label }) => {
  return (
    <section className="sm:w-36 px-6 bg-gray-800 rounded py-3 flex flex-col items-center">
      <span className="text-4xl sm:text-6xl text-white leading-none font-black">
        {value}
      </span>
      <span className="font-semibold text-gray-300 uppercase tracking-wide text-sm">
        {label}
      </span>
    </section>
  );
};

const Countdown = (props) => {
  const { endDate } = props;
  const [duration, setDuration] = React.useState(makeDuration(endDate));
  React.useEffect(() => {
    const timer = setInterval(() => {
      setDuration(makeDuration(endDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [endDate]);
  return (
    <div className="text-lg sm:text-2xl text-center font-bold text-gray-900 px-6 py-3 inline-block rounded-sm">
      <div className="flex justify-center space-x-2">
        {duration.years > 0 && (
          <TimePanel value={duration.years} label="Years" />
        )}
        {duration.months > 0 && (
          <TimePanel value={duration.months} label="Months" />
        )}
        {duration.days > 0 && <TimePanel value={duration.days} label="Days" />}
        <TimePanel value={duration.hours} label="Hours" />
        <TimePanel value={duration.minutes} label="Minutes" />
        {duration.days < 1 && (
          <TimePanel value={duration.seconds} label="Seconds" />
        )}
      </div>
      <span className="text-gray-300 text-sm font-normal">
        Ends {format(endDate, "PPPppp")}
      </span>
    </div>
  );
};

const makeDuration = (endDate) => {
  const duration = intervalToDuration({
    start: new Date(),
    end: endDate,
  });
  return duration;
};

export default Countdown;
