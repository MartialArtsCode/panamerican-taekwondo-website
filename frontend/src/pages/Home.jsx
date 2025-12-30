// src/pages/Home.jsx
import { Button } from '@mui/material';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Hello Tailwind + MUI + Vite!
      </h1>
      <Button variant="contained" color="primary">
        Material UI Button
      </Button>
    </div>
  );
}

export default Home;
