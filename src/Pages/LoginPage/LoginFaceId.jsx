import { useState, useRef, useEffect } from "react";
import { Button, CircularProgress } from "@mui/material";
import { userLoginWithFaceId } from "../../services/api.services";
import { useNavigate } from "react-router-dom";

const CameraLoginPage = () => {
  const navigate = useNavigate();
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    startCamera();
    return () => {
      if (videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((error) => {
        console.error("Error accessing the camera:", error);
      });
  };

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas
      .getContext("2d")
      .drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageUrl = canvas.toDataURL("image/png");
    setCapturedImage(imageUrl);
  };

  const retakeImage = () => {
    setCapturedImage(null);
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    startCamera();
  };

  const handleLogin = async () => {
    if (!capturedImage) {
      console.error("No image captured.");
      return;
    }
    const base64Image = capturedImage.split(",")[1];
    const blob = await fetch(`data:image/png;base64,${base64Image}`).then(
      (res) => res.blob()
    );

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", blob);
      //   const response = await userLoginWithFaceId(formData);
      //   console.log("Face ID Login Response:", response.data);
      const response = true;
      navigate("/home");
    } catch (error) {
      console.error("Face ID Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {!capturedImage ? (
        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center space-y-4">
            <video
              ref={videoRef}
              className="w-full rounded-lg shadow-md"
            ></video>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="p-3 text-white bg-blue-500 rounded-full hover:bg-blue-600"
              onClick={captureImage}
            >
              Capture
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center space-y-4">
            <img
              src={capturedImage}
              alt="Captured"
              className="rounded-lg shadow-md w-full"
            />
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              className="p-3 text-blue-500 rounded-full hover:bg-blue-100"
              onClick={retakeImage}
            >
              Retake
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="p-3 text-white bg-blue-500 rounded-full hover:bg-blue-600"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraLoginPage;
