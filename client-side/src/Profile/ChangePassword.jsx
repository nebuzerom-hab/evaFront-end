import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import profileService from "../services/profileService";
import { appState } from "../App";

const ChangePassword = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { token } = useContext(appState);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New password is required"),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await profileService.changePassword(values, token);
        setSuccess(true);
        setError("");
        formik.resetForm();
        setTimeout(() => navigate("/profile"), 1500);
      } catch (err) {
        setError(err.response?.data?.msg || "Password change failed");
        setSuccess(false);
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Change Password
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && (
          <Alert severity="success">Password changed successfully!</Alert>
        )}
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Current Password"
            name="currentPassword"
            type="password"
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.currentPassword &&
              Boolean(formik.errors.currentPassword)
            }
            helperText={
              formik.touched.currentPassword && formik.errors.currentPassword
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="New Password"
            name="newPassword"
            type="password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={formik.isSubmitting}
            >
              Change Password
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/profile")}
              sx={{
                "&:hover": {
                  color: "orange",
                  borderColor: "red",
                },
              }}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default ChangePassword;
