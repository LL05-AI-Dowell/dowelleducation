import { useContext, useState, useEffect } from 'react';
import { Button, Typography, Modal, Backdrop, Fade } from '@mui/material';
import { FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { scaleURL, ticketingSystemURL } from '../../services/constant';
import { UserContext } from '../../hooks/context';
import { useNavigate, useLocation } from 'react-router-dom';

const HomePage = () => {
  const { userInfo, userRoles } = useContext(UserContext);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const workspaceId = searchParams.get('workspace_id');

  useEffect(() => {
    if (!workspaceId) {
      navigate('/restricted-access');
    }
    if (userInfo && workspaceId === userInfo.workspace_id) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [location, navigate, userInfo, workspaceId]);

  const handleLogout = () => {
    navigate(`/?workspace_id=${workspaceId}`);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const findUserDetails = () => {
    if (userRoles && workspaceId) {
      const user = userRoles.find(role => role.workspace_id === workspaceId);
      return user;
    }
    return null;
  };

  const userDetails = findUserDetails();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 text-gray-800 p-8">
      <div className="max-w-lg bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
        <div className="flex justify-between w-full space-x-4">
          <Button
            variant="contained"
            fullWidth
            className="p-4 md:p-6 text-white flex items-center justify-center"
            style={{ maxWidth: '200px', borderRadius: '25px', fontSize: '1rem', backgroundColor: '#005734' }}
            startIcon={<FaUser />}
            onClick={handleOpenModal}
          >
          </Button>
          <Button
            variant="contained"
            fullWidth
            className="p-4 md:p-6 text-white flex items-center justify-center"
            style={{ maxWidth: '200px', borderRadius: '25px', fontSize: '1rem', backgroundColor: '#005734' }}
            startIcon={<FaSignOutAlt />}
            onClick={handleLogout}
          >
          </Button>
          {isAdmin && (
            <Button
              variant="contained"
              fullWidth
              className="p-4 md:p-6 text-white flex items-center justify-center"
              style={{ maxWidth: '200px', borderRadius: '25px', fontSize: '1rem', backgroundColor: '#005734' }}
              startIcon={<FaCog />}
              onClick={() => {
                console.log('Navigate to settings page or perform settings action');
              }}
            >
            </Button>
          )}
        </div>
        <div className="mt-4 text-left">
          <Typography
            variant="h5"
            className="mb-4 font-bold text-4xl text-blue-900"
            style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '0.05em' }}
          >
            Hey {userInfo?.Firstname},
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
        <div className="flex flex-col space-y-6 items-center w-full mt-14">
          <Button
            variant="contained"
            fullWidth
            className="p-4 md:p-6 text-white"
            style={{ maxWidth: '250px', borderRadius: '25px', fontSize: '1rem', backgroundColor: '#005734' }}
            onClick={() => window.open(scaleURL, "_blank")}
          >
            Provide Feedback
          </Button>
          <Button
            variant="contained"
            fullWidth
            className="p-4 md:p-6 text-white"
            style={{ maxWidth: '250px', borderRadius: '25px', fontSize: '1rem', backgroundColor: '#005734' }}
            onClick={() => window.open(ticketingSystemURL, "_blank")}
          >
            Query & Ticketing
          </Button>
        </div>
      </div>

      {/* User Profile Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className="flex items-center justify-center"
      >
        <Fade in={openModal}>
          <div className="bg-white p-8 max-w-md rounded-lg shadow-lg">
            <Typography variant="h5" gutterBottom>
              User Profile
            </Typography>
            {userDetails ? (
              <>
                <Typography variant="body1" gutterBottom>
                  Name: {userDetails.Firstname} {userDetails.Lastname}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Email: {userDetails.Email}
                </Typography>
              </>
            ) : (
              <Typography variant="body1" gutterBottom>
                User details not found.
              </Typography>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default HomePage;
