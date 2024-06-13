import { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import HeaderMenu from './components/HeaderMenu'
import GalleryCard from './components/GalleryCard'
import Details from './components/Details'
import SearchGallery from './components/SearchGallery'

function App() {
    const [view, setView] = useState("homeView");
    const [selectedId, setId] = useState(0);
    const [loadCnt, reload] = useState(0)
    const [allIds,setIds] = useState([])
    const familyId = 1; //仮の家族ID
    useEffect(()=>{
        fetch("/api/ids").then(res=>res.json()).then(jres => setIds(jres)).catch(err=> console.error(err))
        },[loadCnt])
  return (
      <>
      <Card className="text-center">
        <Card.Title>うちの家電＋</Card.Title>
      </Card>
      <HeaderMenu setView={setView} setId={setId} view={view}/>
        {view === "allItemView" && <SearchGallery allIds={allIds} setView={setView} setId={setId} familyId={familyId} loadCnt={loadCnt} />}
        {view === "homeView" && <GalleryCard  setView={setView} setId={setId} familyId={familyId} loadCnt={loadCnt} />}
        {view === "editView" && <Details allIds={allIds} view={view} selectedId={selectedId} familyId={familyId} setView={setView} reload={reload}/>}
      </>
  )
}

export default App
