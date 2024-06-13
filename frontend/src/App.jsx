import { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import HeaderMenu from './components/HeaderMenu'
import GalleryCard from './components/GalleryCard'
import Details from './components/Details'

function App() {
    const [view, setView] = useState("homeView");
    const [selectedId, setId] = useState(0);
    const familyId = 1; //仮の家族ID
  return (
      <>
      <Card className="text-center">
        <Card.Title>うちの家電＋</Card.Title>
      </Card>
      <HeaderMenu setView={setView} setId={setId} view={view}/>
      {view === "search" && <SearchMenu />}
      {view === "homeView" && <GalleryCard setView={setView} setId={setId} familyId={familyId}/>}
      {view === "editView" && <Details view={view} selectedId={selectedId} familyId={familyId}/>}
      </>
  )
}

export default App
