import Card from 'react-bootstrap/Card';
import {useState,useEffect} from 'react';
import SearchMenu from './SearchMenu'

function GalleryCard({ setView, setId, view, familyId }) {
    const [gallery, setGallery] = useState([]);
    useEffect(()=>{
        console.log("effect-time")
        const url = "/api/ids";
//         if (view === "allItemView"){
//             fetch(url).then(res=>res.json()).then(jsoned =>console.log(jsoned)).catch(err=>console.error(err))
//         } else {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: familyId })
            }).then(res=>res.json()).then(jres => setGallery(jres)).catch(err=> console.error(err))
//         }

        },[view])

    const cardClick = (id) => {
//         fetch(`/api/appliances/${id}`).then(res=>res.json()).then(jsoned => console.log(jsoned)).catch(err=> console.error(err));
        setId(id);
        setView("editView");
        }

  return (
    <>
{/*     <SearchMenu /> */}
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

export default GalleryCard;