import { ChangeEventHandler } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import clsx from "clsx";

interface IPopUpMenu {
  open: boolean;
  value?: string;
  title?: string;
  context?: string;
  label?: string;
  isDarkMode?: boolean;
  handleClose: () => void;
  handleOnSubmit: () => void;
  handleOnChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

const PopUpMenu = ({
  open,
  value,
  title,
  context,
  label,
  isDarkMode,
  handleClose,
  handleOnSubmit,
  handleOnChange,
}: IPopUpMenu) => {
  const darkMode = isDarkMode ? " bg-primary-darkBlue" : "bg-white";
  const darkText = isDarkMode && "text-primary-lightBlue";
  const darkButton = isDarkMode ? "darkButton darkButtonHover" : "button buttonHover";
  return (
    <Dialog open={open} onClose={handleClose} onSubmit={handleOnSubmit}>
      <DialogTitle className={clsx(darkMode, darkText)}>{title}</DialogTitle>
      <DialogContent className={clsx(darkMode)}>
        <DialogContentText className={clsx(isDarkMode && "content")}>
          {context}
        </DialogContentText>
        <TextField
          onChange={handleOnChange}
          value={value}
          autoFocus
          margin="dense"
          id="name"
          label={label}
          inputProps={{ maxLength: 7 }}
          sx={{
            "& .MuiFormLabel-root": {
              color: isDarkMode ? "lightBlue" : "black",
            },
            "& .MuiFormLabel-root.Mui-focused": {
              color: isDarkMode ? "lightBlue" : "black",
            },
            input: { color: isDarkMode ? "lightBlue" : "black" },
          }}
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions className={clsx(darkMode)}>
        <Button onClick={handleClose} className={clsx(darkButton)}>
          Zavři
        </Button>
        <Button onClick={handleOnSubmit} className={clsx(darkButton)}>
          Potvrď
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopUpMenu;
