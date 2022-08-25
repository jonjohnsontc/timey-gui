import { ReactNode } from "react";
import "./toolbar.css";

// root path of the icons file
const iconsLoc = "/src/assets/icons.svg#";

interface ToolbarProps {
  left: ReactNode;
  right: ReactNode;
  middle?: ReactNode;
}
/**
 * Displays three buttons, which can change depending on its state.
 * The buttons align with either an action, a view, or both
 *
 * */
export function Toolbar(props: ToolbarProps) {
  // Using this to display a blank space where a button would
  // be to maintain spacing
  const blankElement = (
    <svg className="blank-btn">
      <use href={`${iconsLoc}another-icon`} />
    </svg>
  );

  let middle: ReactNode;
  if (props.middle) {
    middle = props.middle;
  } else {
    middle = blankElement;
  }

  return (
    <footer className="toolbar">
      {props.left}
      {middle}
      {props.right}
    </footer>
  );
}
