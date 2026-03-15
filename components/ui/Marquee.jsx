"use client";

import { BsCodeSlash } from "react-icons/bs";
import gsap from "gsap";
import { Observer } from "gsap/all";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(Observer);

const Marquee = ({
  items,
  className = "text-white bg-black",
  iconClassName = "text-2xl",
  reverse = false,
}) => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  function horizontalLoop(items, config = {}) {
    items = gsap.utils.toArray(items);

    const tl = gsap.timeline({
      repeat: config.repeat ?? -1,
      paused: config.paused ?? false,
      defaults: { ease: "none" },
      onReverseComplete: () =>
        tl.totalTime(tl.rawTime() + tl.duration() * 100),
    });

    let length = items.length;
    let startX = items[0].offsetLeft;
    let times = [];
    let widths = [];
    let xPercents = [];
    let curIndex = 0;

    const pixelsPerSecond = (config.speed || 1) * 100;

    const snap =
      config.snap === false
        ? (v) => v
        : gsap.utils.snap(config.snap || 1);

    gsap.set(items, {
      xPercent: (i, el) => {
        const w = (widths[i] = parseFloat(
          gsap.getProperty(el, "width", "px")
        ));

        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
            gsap.getProperty(el, "xPercent")
        );

        return xPercents[i];
      },
    });

    gsap.set(items, { x: 0 });

    const totalWidth =
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      items[length - 1].offsetWidth *
        gsap.getProperty(items[length - 1], "scaleX") +
      (parseFloat(config.paddingRight) || 0);

    items.forEach((item, i) => {
      const curX = (xPercents[i] / 100) * widths[i];
      const distanceToStart = item.offsetLeft + curX - startX;

      const distanceToLoop =
        distanceToStart +
        widths[i] * gsap.getProperty(item, "scaleX");

      tl.to(
        item,
        {
          xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
          duration: distanceToLoop / pixelsPerSecond,
        },
        0
      )
        .fromTo(
          item,
          {
            xPercent: snap(
              ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
            ),
          },
          {
            xPercent: xPercents[i],
            duration:
              (curX - distanceToLoop + totalWidth - curX) /
              pixelsPerSecond,
            immediateRender: false,
          },
          distanceToLoop / pixelsPerSecond
        )
        .add("label" + i, distanceToStart / pixelsPerSecond);

      times[i] = distanceToStart / pixelsPerSecond;
    });

    function toIndex(index, vars = {}) {
      if (Math.abs(index - curIndex) > length / 2) {
        index += index > curIndex ? -length : length;
      }

      const newIndex = gsap.utils.wrap(0, length, index);
      let time = times[newIndex];

      if (time > tl.time() !== index > curIndex) {
        vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }

      curIndex = newIndex;
      vars.overwrite = true;

      return tl.tweenTo(time, vars);
    }

    tl.next = (vars) => toIndex(curIndex + 1, vars);
    tl.previous = (vars) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;

    tl.progress(1, true).progress(0, true);

    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }

    return tl;
  }

  useLayoutEffect(() => {
    if (!itemsRef.current.length) return;

    const tl = horizontalLoop(itemsRef.current, {
      repeat: -1,
      paddingRight: 30,
      reversed: reverse,
    });

    const observer = Observer.create({
      target: containerRef.current,
      type: "wheel,touch",
      onChangeY(self) {
        let factor = 2.5;

        if ((!reverse && self.deltaY < 0) || (reverse && self.deltaY > 0)) {
          factor *= -1;
        }

        gsap
          .timeline({ defaults: { ease: "none" } })
          .to(tl, {
            timeScale: factor * 2.5,
            duration: 0.2,
            overwrite: true,
          })
          .to(tl, {
            timeScale: factor / 2.5,
            duration: 1,
          });
      },
    });

    return () => {
      tl.kill();
      observer.kill();
    };
  }, [items, reverse]);

  itemsRef.current = [];

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden w-full h-20 md:h-[100px] flex items-center whitespace-nowrap uppercase ${className}`}
    >
      <div className="flex w-max">
        {items.map((text, index) => (
          <span
            key={index}
            ref={(el) => (itemsRef.current[index] = el)}
            className="flex items-center px-16 gap-x-32 flex-none"
          >
            {text}
            <BsCodeSlash size={40} className={iconClassName} />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;