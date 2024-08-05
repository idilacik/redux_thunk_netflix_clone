import axios from "axios";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
  //* isteklere eklenecek olan header bilgileri
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },

  //* api isteklerinin hepsinde gonderilecek dil parametresi
  params: { language: "tr-TR" },
});
