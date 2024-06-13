import { useRef, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import DetailsMenu from './DetailsMenu'

function Details({ selectedId, view, familyId }) {
//     const inputMaker = useRef("")
    const inputName = useRef("")
    const inputModel = useRef("")
    const inputBuyAt = useRef("")
    const inputBuyDate = useRef("")
    const [detailsObj, setDetailsObj] = useState({});
    const [usePlaces,setUsePlace] = useState([]);
    const [arrMaker, setMaker] = useState([
"SHARP",
"PANASONIC",
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
    useEffect(()=>{
        if(!!selectedId) fetch("/api/details",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ familyId, appId:selectedId })
            }).then(res=>res.json()).then(jsoned => {
                console.log(jsoned);
                setDetailsObj(jsoned);
                inputName.current.value = detailsObj.appName
            }).catch(err=> console.error(err));
        },[view])
    useEffect(()=>{
        inputName.current.value = detailsObj.appName;
        inputModel.current.value = detailsObj.modelNumber;
        inputBuyAt.current.value = detailsObj.buyAt;
        inputBuyDate.current.value = new Date(detailsObj.buyDate).toLocaleDateString("sv-SE")
        },[detailsObj])
    useEffect(()=>{
        fetch("/api/use_places").then(res=>res.json()).then(jsoned => setUsePlace(jsoned)).catch(err=>console.error(err))
        },[])
//     const [inputName,inputModel,inputBuyAt] = [...Array(3)].map(mark => mark = useRef())

    const onSubmit = () => {
        console.log("青いSAVEボタン")
    console.log(inputName.current.value)
//         fetch(,{}).then(res=>res.json()).then(jsoned=> console.log(jsoned)).catch(err=>console.error(err))
        }
  return (
      <>
      <DetailsMenu view={view} selectedId={selectedId} onSubmit={onSubmit}/>
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
          <Form.Control id="disabledTextInput" ref={inputName}/>
        </Form.Group>
        )}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">型番号</Form.Label>
          <Form.Control id="disabledTextInput" placeholder={detailsObj.modelNumber} ref={inputModel}/>
        </Form.Group>
        {view === "editView" && (
            <>
{/*          <Form.Group className="mb-3"> */}
{/*            <Form.Label htmlFor="disabledSelect">分類</Form.Label> */}
{/*            <Form.Select id="disabledSelect"> */}
{/*                <option value='' disabled selected>--選択してください--</option> */}
{/*                <option>大型家電</option> */}
{/*                <option>小型家電</option> */}
{/*            </Form.Select> */}
{/*          </Form.Group> */}
         <Form.Group className="mb-3">
           <Form.Label htmlFor="disabledSelect">使用場所</Form.Label>
           <Form.Select id="disabledSelect">
{/*                <option value='' disabled selected>--選択してください--</option> */}
               <option value='' selected>{detailsObj.usePlace}</option>
               {usePlaces.map(placeObj => <option key={placeObj.id}>{placeObj.name}</option>)}
           </Form.Select>
         </Form.Group>
         <Form.Group>
            <Form.Label>購入日</Form.Label>
            <Form.Control type="date" ref={inputBuyDate}></Form.Control>
         </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">購入元</Form.Label>
          <Form.Control id="disabledTextInput" placeholder={detailsObj.buyAt} ref={inputBuyAt}/>
        </Form.Group>
         </>
            )}
{/*         <Button variant="light" type="submit">SAVE</Button> */}
    </Form>
    </>
  );
}

export default Details;