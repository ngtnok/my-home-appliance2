import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import DetailsMenu from './DetailsMenu'

function Details({ selectedId }) {
    const [detailsObj, setDetailsObj] = useState({});
    useEffect(()=>{
        fetch(`/api/appliances/${selectedId}`).then(res=>res.json()).then(jsoned => setDetailsObj(jsoned)).catch(err=> console.error(err));
        },[])
  return (
      <>
      <DetailsMenu />
    <Form>
      <fieldset disabled>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledSelect">メーカー</Form.Label>
          <Form.Select id="disabledSelect">
            <option>{detailsObj.maker}</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">名称</Form.Label>
          <Form.Control id="disabledTextInput" placeholder={detailsObj.name} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">型番号</Form.Label>
          <Form.Control id="disabledTextInput" placeholder={detailsObj.modelNumber} />
        </Form.Group>
{/*         <Form.Group className="mb-3"> */}
{/*           <Form.Check */}
{/*             type="checkbox" */}
{/*             id="disabledFieldsetCheck" */}
{/*             label="Can't check this" */}
{/*           /> */}
{/*         </Form.Group> */}
{/*         <Button type="submit">Submit</Button> */}
      </fieldset>
    </Form>
    </>
  );
}

export default Details;