import { Button } from "../Button";

/**
 * Allows the user to select a theme
 * */
function ThemePicker(props: { expanded: boolean }) {
  const themes = ["light", "dark", "yellow", "purple", "red", "green"];
  function setTheme() {}

  if (props.expanded) {
  }
  return <Button icon="" action={() => {}} cls="theme-button" />;
}
