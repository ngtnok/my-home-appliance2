import { useRef, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import DetailsMenu from './DetailsMenu'

function Details({ selectedId, view }) {
    const inputMaker = useRef("")
    const [detailsObj, setDetailsObj] = useState({});
    useEffect(()=>{
        fetch(`/api/appliances/${selectedId}`).then(res=>res.json()).then(jsoned => setDetailsObj(jsoned)).catch(err=> console.error(err));
        },[])
  return (
      <>
      <DetailsMenu view={view} selectedId={selectedId}/>
    <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledSelect">メーカー</Form.Label>
          <Form.Select id="disabledSelect">
            <option>{detailsObj.maker}</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">名称</Form.Label>
          <Form.Control id="disabledTextInput" placeholder={detailsObj.name} ref={inputMaker}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">型番号</Form.Label>
          <Form.Control id="disabledTextInput" placeholder={detailsObj.modelNumber} />
        </Form.Group>
    </Form>
    </>
  );
}

export default Details;