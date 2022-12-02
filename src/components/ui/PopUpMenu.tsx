import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface IPopUpMenu {
  open: boolean;
  value?: string;
  title?: string;
  context?: string;
  label?: string;
  handleClose: () => void;
  handleOnSubmit: () => void;
  handleOnChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
}

const PopUpMenu = ({
  open,
  value,
  title,
  context,
  label,
  handleClose,
  handleOnSubmit,
  handleOnChange,
}: IPopUpMenu) => {
  return (
    <Dialog open={open} onClose={handleClose} onSubmit={handleOnSubmit}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{context}</DialogContentText>
        <TextField
          onChange={handleOnChange}
          value={value}
          autoFocus
          margin="dense"
          id="name"
          label={label}
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Zavři</Button>
        <Button onClick={handleOnSubmit}>Potvrď</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopUpMenu;
