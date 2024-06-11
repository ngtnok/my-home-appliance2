import Card from 'react-bootstrap/Card';
import {useState,useEffect} from 'react';

function GalleryCard() {
    const [gallery, setGallery] = useState([]);
    useEffect(()=>{
        fetch("/api/appliances/ids").then(res=>res.json()).then(jsoned => setGallery(jsoned)).catch(err=> console.error(err))
        },[])

    const cardClick = (id) => {
        fetch(`/api/appliances/${id}`).then(res=>res.json()).then(jsoned => console.log(jsoned)).catch(err=> console.error(err))
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
  );
}

export default GalleryCard;