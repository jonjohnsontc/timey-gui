import { Link } from "react-router-dom";

import { Timer } from "../components/Timer";
import { Toolbar } from "../components/Toolbar";
import { DeleteBtn, SaveBtn } from "../components/ToolbarBtns";

interface NewTimerProps {
  name?: string;
  // The default value to set a timer at
  length: string;
}

/**
 * Allows user to save a timer for use, including a title and time.
 *
 * A title is not required, but a time is.
 */
function NewTimer(props: NewTimerProps) {
  let saveEl;
  let name;
  if (props.name) {
    name = props.name;
  } else {
    // TODO: Figure out way to retrieve new name
    name = "1";
  }

  if (props.length) {
    saveEl = <Link to={`/timer?t=${props.length}&n=${name}`} />;
  } else {
    saveEl = undefined;
  }
  return (
    <>
      <Timer saved={false} length={props.length} />
      <Toolbar left={<DeleteBtn />} right={<SaveBtn link={saveEl} />} />
    </>
  );
}

export { NewTimer };
