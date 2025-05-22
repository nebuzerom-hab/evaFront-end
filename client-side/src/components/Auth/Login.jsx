import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Link,
  Alert,
} from "@mui/material";
import authService from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await authService.login(values);
        login(response.token);
        navigate("/profile");
      } catch (err) {
        setError(err.response?.data?.msg || "Login failed");
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={formik.isSubmitting}
          >
            Login
          </Button>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link href="/forgot-password" variant="body2">
              Forgot password?
            </Link>
          </Box>
          <Typography>
            Don't have an account? <Link href="/register">Register</Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
