import Card from 'react-bootstrap/Card';
import {useState,useEffect} from 'react';
import SearchMenu from './SearchMenu'

function GalleryCard({ setView, setId, view, familyId, loadCnt }) {
    const [gallery, setGallery] = useState([]);
    useEffect(()=>{
        const url = "/api/ids";
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: familyId })
            }).then(res=>res.json()).then(jres => setGallery(jres)
                ).catch(err=> console.error(err))

        },[loadCnt,view])

    const cardClick = (id) => {
        setId(id);
        setView("editView");
        }

    return (
        <>
            {view === "allItemView" &&( <SearchMenu />)}
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
            <Card.Text className="text-warning">{Math.floor((Number(new Date())-appliance.buyDate)/(365*24*60*60*1000))>9&&"**使用開始から10年経過しています**"}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  )
}

export default GalleryCard;