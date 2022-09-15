import { Button } from "../Button";
import "./timer-picker.css";

const iconsLoc = "/src/assets/icons.svg#";

interface DotProps {
  active: boolean; // whether or not the dot is tied to the timer in view
  new: boolean; // whether or not the dot is associated with a new tiemr
}

function Dot(props: DotProps) {
  const className = (function () {
    let cls = "dot";
    if (props.active) {
      cls += " dot-active";
    } else if (props.new) {
      cls += " dot-new";
    }
    return cls;
  })();

  return (
    <svg className={className}>
      <use href={`${iconsLoc}dot`} />
    </svg>
  );
}

interface TimerPickerProps {
  disabled: boolean; // picker is active
  length: number; // how many dots
  upClick: () => void; // action on clicking up button
  downClick: () => void; // action on clicking down button
  activeId?: number; // dot # that should be activated
}
/**
 * Allows the user to select which timer they'd like to use by navigating through
 * timers using up/down arrows that are shown onMouseOver. Timers are indicated
 * by small dots between the arrows, like the below:
 *
 * ```
 * ^
 * *
 * *
 * *
 * v
 * ```
 *
 * Uses bootstrap icons 'chevron-up' & 'chevron-down' as arrows. While the dots
 * are represented by an svg <circle> element
 *
 * The 'active' timer is denoted by having a larger dot icon representing it,
 * which is defined in css
 */
function TimerPicker(props: TimerPickerProps) {
  let dotArray = [];
  for (let x = 0; x < props.length; x++) {
    dotArray.push(
      <Dot
        active={props.activeId === x ? true : false}
        new={x + 1 === props.length ? true : false}
        key={x}
      />
    );
  }
  return (
    <div className="timer-picker">
      <Button
        icon="chevron-up"
        action={props.upClick}
        cls="timer-picker-up"
        disabled={props.disabled}
      />
      <ul>{dotArray}</ul>
      <Button
        icon="chevron-down"
        action={props.upClick}
        cls="timer-picker-down"
        disabled={props.disabled}
      />
    </div>
  );
}

export { TimerPicker };
