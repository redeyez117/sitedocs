import { useState } from 'react';
import './App.css';
import User from './components/User';
import { Button, Container, Grid, Typography } from '@mui/material';
import { useFetchUsers } from './hooks/useFetchUsers';
import AddWorkerModal from './components/AddWorker';
import { Link } from 'react-router-dom';

function App() {
  const [loading , users] = useFetchUsers()
  const [openModal, setOpenModal] = useState(false)
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {openModal}
          Welcome to user CRUD dashboard
        </p>
        <Button onClick={()=>setOpenModal(!openModal)} sx={{py:2, mb:2}}>Create new worker</Button>
       <Container sx={{height:450, overflowY:'auto'}}>
         {loading && <Typography>Loading...</Typography>}
         { users.length > 1 && <Grid container spacing={4}>
            {users.map((user) => (
               <Grid key={user.Id} item xs={12} md={4}>
                  <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/worker/${user.Id}`}>
                     <User user={user} ></User>
                  </Link>
               </Grid>
            ))}
          </Grid>}
       </Container>
       {<AddWorkerModal openModal={openModal} setOpenModal={setOpenModal}/>}
       </header>
    </div>
  );
}

export default App;
