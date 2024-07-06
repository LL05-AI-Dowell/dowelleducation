import { Button, Typography } from '@mui/material';
import { scaleURL, ticketingSystemURL } from '../../services/constant';

const HomePage = () => {
  const handleFeedbackClick = () => {
    window.open(scaleURL, "_blank");
  };

  const handleQueryClick = () => {
    window.open(ticketingSystemURL, "_blank");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 text-gray-800 p-8">
      <div className="max-w-lg bg-white rounded-lg shadow-lg p-8 flex flex-col items-center gap-14">
        <div className='mt-4 text-left'>
          <Typography
            variant="h5"
            className="mb-4 font-bold text-4xl text-blue-900"
            style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '0.05em' }}
          >
            Hey Manish,
          </Typography>
          <div className="h-px w-full bg-slate-200 mb-4"></div>
          <Typography
            variant="h6"
            className="mb-8"
            style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}
          >
            Welcome to MVJ College of Engineering
          </Typography>
          <div className="h-px w-full bg-slate-200 my-4"></div>
        </div>
        <div className="flex flex-col space-y-6 items-center w-full">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="p-4 md:p-6 text-white bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
            style={{ maxWidth: '250px', borderRadius: '25px', fontSize: '1rem' }}
            onClick={handleFeedbackClick}
          >
            Provide Feedback
          </Button>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            className="p-4 md:p-6 text-white bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
            style={{ maxWidth: '250px', borderRadius: '25px', fontSize: '1rem' }}
            onClick={handleQueryClick}
          >
            Query & Ticketing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
