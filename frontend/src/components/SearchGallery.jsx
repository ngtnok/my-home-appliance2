import Card from 'react-bootstrap/Card';
import {useState,useEffect} from 'react';
import SearchMenu from './SearchMenu'

function SearchGallery({ allIds, setView, setId, view, familyId, loadCnt }) {
    const [gallery, setGallery] = useState(allIds);
    const [searchWord, setSearchWord] = useState("")
    useEffect(()=>{
        const regexp = new RegExp(searchWord, 'i')
        setGallery( allIds.filter(obj=> regexp.test(obj.appName) || regexp.test(obj.maker) || regexp.test(obj.modelNumber)))
        },[searchWord])
    const cardClick = (id) => {
        setId(id);
        setView("editView");
        }

    return (
        <>
        <SearchMenu setSearchWord={setSearchWord}/>
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