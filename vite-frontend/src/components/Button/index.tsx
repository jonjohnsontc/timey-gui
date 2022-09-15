import { useState } from "react";

// root path of the icons file
const iconsLoc = "/src/assets/icons.svg#";

interface BtnProps {
  icon: string; // the id of the icon in the iconsLoc file
  disabled?: boolean; // disabled buttons are greyed out
  action?: any; // onClick fn
  onAnimationEnd?: any; // onAnimationEnd additions
  cls?: string; // additional classes
}

function Button(props: BtnProps) {
  let cls = props.cls;

  // Controls whether or not the button "bounces"
  const [animated, setAnimated] = useState(false);

  // https://stackoverflow.com/a/33401662/10051144
  const _onClick = () => {
    let baseOnClick;
    if (props.disabled) {
      baseOnClick = () => {};
    } else {
      baseOnClick = () => setAnimated(() => true);
    }
    let onClickEvents = [baseOnClick];
    if (props.action) {
      onClickEvents.unshift(props.action);
    }

    for (let event of onClickEvents) {
      event.call(window);
    }
    return;
  };

  const _onAnimationEnd = () => {
    let baseOnAnimationEnd;
    if (props.disabled) {
      baseOnAnimationEnd = () => {};
    } else {
      baseOnAnimationEnd = () => setAnimated(() => false);
    }
    let onAnimationEndEvents = [baseOnAnimationEnd];
    if (props.onAnimationEnd) {
      onAnimationEndEvents.unshift(props.onAnimationEnd);
    }
    for (let event of onAnimationEndEvents) {
      event.call(window);
    }
  };

  if (props.disabled) {
    cls += " disabled";
  }

  return (
    <button
      onClick={props.disabled ? undefined : props.action}
      disabled={props.disabled}
    >
      <svg
        // Each button has a pulsate animation to feel more alive
        className={animated ? cls + " pulsate-bck" : cls}
        onClick={props.disabled ? undefined : () => _onClick()}
        onAnimationEnd={() => _onAnimationEnd()}
      >
        <use href={`${iconsLoc}${props.icon}`}></use>
      </svg>
    </button>
  );
}

export { Button };
