import { intervalToDuration, format } from "date-fns";

const TimePanel = ({ value, label, size = "normal" }) => {
  let sizeClasses = `sm:w-36`;
  let textClasses = `text-4xl sm:text-6xl `;
  switch (size) {
    case "normal":
      sizeClasses = `sm:w-36`;
      textClasses = `text-4xl sm:text-6xl `;
      break;
    case "small":
      textClasses = `text-2xl sm:text-4xl `;
      sizeClasses = `sm:w-24`;
      break;
  }
  return (
    <section
      className={`${sizeClasses} px-6 bg-gray-800 rounded py-3 flex flex-col items-center`}
    >
      <span className={`${textClasses} text-white leading-none font-black`}>
        {value}
      </span>
      <span className="font-semibold text-gray-300 uppercase tracking-wide text-sm">
        {label}
      </span>
    </section>
  );
};

const Countdown = (props) => {
  const { prefix = "Ends ", size = "normal", date } = props;
  const [duration, setDuration] = React.useState(makeDuration(date));
  React.useEffect(() => {
    if (!date) return;
    const timer = setInterval(() => {
      setDuration(makeDuration(date));
    }, 1000);
    return () => clearInterval(timer);
  }, [date]);

  let sizeClasses = `text-lg sm:text-2xl`;
  switch (size) {
    case "normal":
      sizeClasses = `text-lg sm:text-2xl`;
      break;
    case "small":
      sizeClasses = `text-sm sm:text-base`;
      break;
  }
  if (!date) return null;

  return (
    <div
      className={`${sizeClasses} text-center font-bold text-gray-900 px-6 py-3 inline-block rounded-sm`}
    >
      <div className="flex justify-center space-x-2">
        {duration.years > 0 && (
          <TimePanel value={duration.years} label="Years" />
        )}
        {duration.months > 0 && (
          <TimePanel size="small" value={duration.months} label="Months" />
        )}
        {duration.days > 0 && (
          <TimePanel size="small" value={duration.days} label="Days" />
        )}
        <TimePanel size="small" value={duration.hours} label="Hours" />
        <TimePanel size="small" value={duration.minutes} label="Minutes" />
        {duration.days < 1 && (
          <TimePanel size="small" value={duration.seconds} label="Seconds" />
        )}
      </div>
      <span className="text-gray-300 text-sm font-normal">
        {prefix} {format(date, "PPPppp")}
      </span>
    </div>
  );
};

const makeDuration = (date) => {
  if (!date) return;
  const duration = intervalToDuration({
    start: new Date(),
    end: date,
  });
  return duration;
};

export default Countdown;
