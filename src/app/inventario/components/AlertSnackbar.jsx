import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { styled, keyframes } from "@mui/system";

const slideIn = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
`;

const StyledAlert = styled(Alert)`
  font-size: 1.2rem;
  animation: ${slideIn} 0.5s ease-out;
`;

const AlertSnackbar = ({ open, onClose, message }) => (
  <Snackbar
    open={open}
    autoHideDuration={4000}
    onClose={onClose}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
  >
    <StyledAlert onClose={onClose} severity="success">
      {message}
    </StyledAlert>
  </Snackbar>
);

export default AlertSnackbar;