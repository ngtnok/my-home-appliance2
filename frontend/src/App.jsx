import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderMenu from './components/HeaderMenu'
import GalleryCard from './components/GalleryCard'
import Details from './components/Details'

function App() {
    const [view, setView] = useState("homeView");
    const [selectedId, setId] = useState(0);
  return (
      <>
      <HeaderMenu />
      {view === "homeView" ? <GalleryCard setView={setView} setId={setId}/>: <Details selectedId={selectedId}/>}
      </>
  )
}

export default App
