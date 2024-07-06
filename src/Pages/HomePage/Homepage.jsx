import { Button, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 p-8">
      <div className="max-w-md text-center">
        <Typography variant="h4" className="mb-4 mt-20 font-bold text-4xl">
          Hey Manish,
        </Typography>
        <Typography variant="h5" className="mb-8">
          Welcome to MVJ College of Engineering
        </Typography>
        <div className="flex flex-col space-y-4 items-center">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="p-4 text-white bg-blue-700 hover:bg-blue-800"
            style={{ maxWidth: '200px' }}
          >
            Feedback
          </Button>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            className="p-4 text-white bg-purple-700 hover:bg-purple-800"
            style={{ maxWidth: '200px' }}
          >
            Query/Ticketing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
