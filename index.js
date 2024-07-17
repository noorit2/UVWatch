import express from "express";
import axios from "axios";
import { formatDateTo12Hour } from "./utils/format.js";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = 3000;
const APIUsername = process.env.API_Username;
const APIKey = process.env.API_Key; 
app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.render('index.ejs');
});
app.get('/countries', async (req, res) => {
  try {
    const response = await axios.get(`http://api.geonames.org/countryInfoJSON?username=${APIUsername}&maxRows=1`);
    res.json({ countries: response.data.geonames });
  } catch (error) {
    console.error(error);
    res.json({ error: 'Failed to load countries data.' });
  }
});
app.get("/select-city",async (req,res)=>{
  const geoID = req.query.country; 
  try {
    const response = await axios.get(`http://api.geonames.org/childrenJSON?geonameId=${geoID}&username=${APIUsername}`);
    res.render("select-city.ejs",{ cities: response.data.geonames });
  } catch (error) {
    console.error(error);
    res.render("select-city.ejs",{ error: 'Failed to load cities data.' });
  }
});
app.get("/View-UF",async (req,res)=>{
  const log = req.query.longitude; 
  const lat = req.query.latitude;
  try {
  const response = await axios.get(`https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${log}`,{
    headers:{
      'x-access-token': APIKey ,
    }
  });
  response.data.result.uv_max_time= formatDateTo12Hour( response.data.result.uv_max_time);
  res.render("View-UF.ejs",{ UV: response.data.result });
} catch (error) {
  console.error(error);
  res.render("View-UF.ejs",{ error: 'Failed to load cities data.' });
}
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
