import { Timer } from "../components/Timer";
import { Toolbar } from "../components/Toolbar";
import { DeleteBtn, SaveBtn } from "../components/ToolbarBtns";

interface NewTimerProps {
  // The default value to set a timer at
  length: string;
}

/**
 * Allows user to save a timer for use, including a title and time.
 *
 * A title is not required, but a time is.
 */
function NewTimer(props: NewTimerProps) {
  return (
    <>
      <Timer saved={false} length={props.length} />
      <Toolbar left={<DeleteBtn />} right={<SaveBtn />} />
    </>
  );
}

export { NewTimer };
