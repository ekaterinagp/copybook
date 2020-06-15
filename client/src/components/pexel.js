import axios from "axios";

export default axios.create({
  baseURL: `https://api.pexels.com`,
  headers: {
    Authorization: "563492ad6f9170000100000195c9e1eca19949e9821508370508ec48",
  },
});
