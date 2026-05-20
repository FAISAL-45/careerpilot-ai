import axios from "axios";

const API_URL = "http://localhost:5000/api/ai";

export const analyzeResume = async (
  file,
  jobRole
) => {

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const formData = new FormData();

  formData.append("resume", file);

  formData.append("jobRole", jobRole);

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await axios.post(
    `${API_URL}/analyze`,
    formData,
    config
  );

  return response.data;
};