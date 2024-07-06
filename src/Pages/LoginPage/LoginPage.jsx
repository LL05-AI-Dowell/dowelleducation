import { useState } from 'react';
import { Button, TextField, Snackbar, Alert, CircularProgress } from '@mui/material';
import { FaRegSmile } from 'react-icons/fa';
import { userLogin } from '../../services/api.services';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await userLogin(username, password);
      setSnackbarSeverity('success');
      setSnackbarMessage('Login successful!');
      console.log('Login successful:', response.data);
      
      navigate('/home');
      
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Login failed: Invalid username or password');
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleLoginWithFaceId = () => {
    navigate('/faceid');
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl p-8 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center space-y-6">
          <Button
            variant="outlined"
            startIcon={<FaRegSmile />}
            className="w-full p-3 text-white bg-blue-500 rounded-full hover:bg-blue-600"
            onClick={handleLoginWithFaceId}
          >
            Login with Face ID
          </Button>
          <div className="text-lg font-semibold text-gray-700">or</div>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputLabelProps={{ style: { color: '#9CA3AF' } }}
            InputProps={{
              style: { borderRadius: '12px' },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ style: { color: '#9CA3AF' } }}
            InputProps={{
              style: { borderRadius: '12px' },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="p-3 text-white bg-blue-500 rounded-full hover:bg-blue-600"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginPage;
