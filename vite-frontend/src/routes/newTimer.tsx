import { Link, useNavigate } from "react-router-dom";

import { Timer } from "../components/Timer";
import { Toolbar } from "../components/Toolbar";
import { DeleteBtn, SaveBtn } from "../components/ToolbarBtns";

interface NewTimerProps {
  name?: string;
  // The default value to set a timer at
  length: string;
}

// Event used to load standard timer view
function goToTimer(props: { length: string; name: string }) {
  const nav = useNavigate();
  nav(`/timer?t=${props.length}&n=${props.name}`);
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

  saveEl = <Link to={`/timer?t=${props.length}&n=${name}`} />;

  return (
    <>
      <Timer saved={false} length={props.length} />
      <Toolbar left={<DeleteBtn />} right={<SaveBtn link={saveEl} />} />
    </>
  );
}

export { NewTimer };
