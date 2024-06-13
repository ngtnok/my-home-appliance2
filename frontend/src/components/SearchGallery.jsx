import Card from 'react-bootstrap/Card';
import {useState,useEffect} from 'react';
import SearchMenu from './SearchMenu'

function SearchGallery({ allIds, setView, setId, view, familyId, loadCnt }) {
    const [gallery, setGallery] = useState(allIds);
//     useEffect(()=>{
//         fetch("/api/ids").then(res=>res.json()).then(jres => setGallery(jres)).catch(err=> console.error(err))
//         },[loadCnt])

    const cardClick = (id) => {
        setId(id);
        setView("editView");
        }

    return (
        <>
        <SearchMenu />
        {gallery[0] && gallery.map((appliance) => (
        <Card
          bg='Light'
          key={appliance.appId}
          text='dark'
          style={{ width: '97%', margin: '5px' }}
          className="mb-2"
        >
          <Card.Body onClick={()=>cardClick(appliance.appId)}>
            <Card.Title>{appliance.appName}</Card.Title>
            <Card.Text>{appliance.maker}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  )
}

export default SearchGallery;