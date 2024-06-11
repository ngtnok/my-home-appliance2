import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderMenu from './components/HeaderMenu'
import GalleryCard from './components/GalleryCard'
import Details from './components/Details'

function App() {
    const [view, setView] = useState("homeView");
  return (
      <>
      <HeaderMenu />
      {view === "homeView" ? <GalleryCard setView={setView} />: <Details />}
      </>
  )
}

export default App
