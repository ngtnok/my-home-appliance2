import Card from 'react-bootstrap/Card';
import {useState,useEffect} from 'react';

function GalleryCard({ setView, setId }) {
    const [gallery, setGallery] = useState([]);
    useEffect(()=>{
        const url = "/api/appliances/ids";
        const id = 1;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id })
        }).then(res=>res.json()).then(jres => setGallery(jres)).catch(err=> console.error(err))
        },[])

    const cardClick = (id) => {
//         fetch(`/api/appliances/${id}`).then(res=>res.json()).then(jsoned => console.log(jsoned)).catch(err=> console.error(err));
        setId(id);
        setView("detailsView");
        }

  return (
    <>
      {gallery[0] && gallery.map((appliance) => (
        <Card
          bg='Light'
          key={appliance.id}
          text='dark'
          style={{ width: '97%', margin: '5px' }}
          className="mb-2"
        >
          <Card.Body onClick={()=>cardClick(appliance.id)}>
            <Card.Title>{appliance.name}</Card.Title>
            <Card.Text>
              Sample text
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  )
}

export default GalleryCard;