import "./toolbar.css";
import { Button } from "../Button";
import { TimerStates } from "../TimerStates";

/**
 * Displays buttons that allow the user to interact with the associated Timer component.
 *
 * Each button comes with an associated OnClick prop to pass functionality down from
 * the Tmer app
 * */
function Toolbar(props: {
  state: TimerStates;
  playOnClick: React.MouseEventHandler;
  pauseOnClick: React.MouseEventHandler;
  restartOnClick: React.MouseEventHandler;
  deleteOnClick: React.MouseEventHandler;
  editOnClick: React.MouseEventHandler;
  saveOnClick: React.MouseEventHandler;
  newOnClick: React.MouseEventHandler;
}) {
  /**
   * Either the delete or edit button, depending on the timer's state
   */
  function LeftBtn() {
    switch (props.state) {
      case "UNSAVED":
        return (
          <Button
            cls="toolbar-btn"
            icon="delete"
            action={props.deleteOnClick}
          />
        );
      case "RUNNING":
        return (
          <Button cls="toolbar-btn" icon="edit" action={props.editOnClick} />
        );
      default:
        return <Button cls="toolbar-btn" icon="edit" disabled={true} />;
    }
  }
  /**
   * Several possible states: Restart | Pause | Play | blank
   */
  function CenterBtn() {
    switch (props.state) {
      case "UNSAVED":
        return null;
      case "PAUSED":
        return (
          <Button cls="toolbar-btn" icon="play" action={props.playOnClick} />
        );
      case "RUNNING":
        return (
          <Button cls="toolbar-btn" icon="pause" action={props.pauseOnClick} />
        );
      default:
        return (
          <Button
            cls="toolbar-btn"
            icon="restart"
            action={props.restartOnClick}
          />
        );
    }
  }

  /**
   * Either a save or new button based on state
   */
  function RightBtn() {
    switch (props.state) {
      case "UNSAVED":
        return (
          <Button cls="toolbar-btn" icon="save" action={props.saveOnClick} />
        );
      default:
        return (
          <Button cls="toolbar-btn" icon="new" action={props.newOnClick} />
        );
    }
  }
  return (
    <footer className="toolbar">
      <LeftBtn />
      <CenterBtn />
      <RightBtn />
    </footer>
  );
}

export { Toolbar };
