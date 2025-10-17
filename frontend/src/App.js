import { useState } from "react";
import axios from "axios";
import DatePicker from "./components/DatePicker.js";
import ImageGallery from "./components/ImageGallery.js";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const fetchImages = async (date) => {
  try {
    setLoading(true);
    setError("");
    setImages([]);
    const res = await axios.get(`http://127.0.0.1:8000/images?date=${date}`);
    setImages(res.data.images || []);
  } catch {
    setError("Could not fetch images. Please try another date.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-6">NASA EPIC Image Explorer 🌍</h1>
      <DatePicker onSubmit={fetchImages} />
      {loading && <p className="text-center mt-4">Loading images...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <ImageGallery images={images} />
    </div>
  );
}

export default App;
