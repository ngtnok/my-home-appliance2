import { useRef, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import DetailsMenu from './DetailsMenu'

function Details({ selectedId, view }) {
    const inputMaker = useRef("")
    const [detailsObj, setDetailsObj] = useState({});
    const [usePlaces,setUsePlace] = useState([]);
    const [arrMaker, setMaker] = useState(["PANASONIC",
"TOSHIBA",
"HITACHI",
"SONY",
"三菱",
"富士通",
"NEC",
"logicool",
"Buffalo",
"その他"
]);
//     const [arrCategory,setCategory] = useState(["",""])
    useEffect(()=>{
//         console.log(selectedId)
        if(!!selectedId) fetch(`/api/appliances/${selectedId}`).then(res=>res.json()).then(jsoned => setDetailsObj(jsoned)).catch(err=> console.error(err));
        },[view])
    useEffect(()=>{
        fetch("/api/use_places").then(res=>res.json()).then(jsoned => setUsePlace(jsoned)).catch(err=>console.error(err))
        },[])
  return (
      <>
      <DetailsMenu view={view} selectedId={selectedId}/>
    <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledSelect">メーカー</Form.Label>
          <Form.Select id="disabledSelect">
{/*               <option>{view}</option> */}
                {detailsObj.maker ? <option selected>{detailsObj.maker}</option>:<option value='' disabled selected>--選択してください--</option>}
               {arrMaker.map(makerName => <option key={makerName}>{makerName}</option>)}
          </Form.Select>
        </Form.Group>
        {view !== "newForm" &&(
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">名称</Form.Label>
          <Form.Control id="disabledTextInput" placeholder={detailsObj.name} ref={inputMaker}/>
        </Form.Group>
        )}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">型番号</Form.Label>
          <Form.Control id="disabledTextInput" placeholder={detailsObj.modelNumber} />
        </Form.Group>
        {view !== "detailsView" && (
            <>
         <Form.Group className="mb-3">
           <Form.Label htmlFor="disabledSelect">分類</Form.Label>
           <Form.Select id="disabledSelect">
               <option value='' disabled selected>--選択してください--</option>
               <option>大型家電</option>
               <option>小型家電</option>
           </Form.Select>
         </Form.Group>
         <Form.Group className="mb-3">
           <Form.Label htmlFor="disabledSelect">使用場所</Form.Label>
           <Form.Select id="disabledSelect">
               <option value='' disabled selected>--選択してください--</option>
               {usePlaces.map(placeObj => <option key={placeObj.id}>{placeObj.name}</option>)}
           </Form.Select>
         </Form.Group>
         <Form.Group>
            <Form.Label>購入日</Form.Label>
            <Form.Control type="date"></Form.Control>
         </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">購入元</Form.Label>
          <Form.Control id="disabledTextInput" />
        </Form.Group>
         </>
            )}

    </Form>
    </>
  );
}

export default Details;