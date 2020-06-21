import { useEffect, useState } from "react";

const useCustomTime = time => {
  const [currentTime, setCurrentTime] = useState(time * 1000);
  const [hrs, setHours] = useState(
    Math.floor(((time * 1000) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  const [mins, setMins] = useState(
    Math.floor(((time * 1000) % (1000 * 60 * 60)) / (1000 * 60))
  );
  const [secs, setSecs] = useState(
    Math.floor(((time * 1000) % (1000 * 60)) / 1000)
  );
  const [stopper, setStopper] = useState(0);
  const currentDate = new Date();
  let sec = currentTime;
  let n = sec + currentDate.getTime();
  let countDownDate = new Date(n).getTime();

  useEffect(() => {
    let x = setInterval(function() {
      // Get todays date and time

      // If the count down is over, write some set timer to 0:0:0
      if (currentTime <= 0) {
        setHours("00");
        setMins("00");
        setSecs("00");
        clearInterval(x);
      } else {
        var now = new Date().getTime();

        // Find the distance between now an the count down date
        const distance = countDownDate - now;
        setCurrentTime(distance);

        // Time calculations for days, hours, minutes and seconds
        let hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        hours = hours < 10 ? `0${hours}` : hours;
        setHours(hours);
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        setMins(minutes);
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        setSecs(seconds);
        setStopper(() => stopper + 1);
      }
    }, 1000);
    return () => clearInterval(x);
  }, [stopper]);

  return { hrs, mins, secs, currentTime };
};

export default useCustomTime;
