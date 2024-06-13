import { useRef, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import DetailsMenu from './DetailsMenu'
import InputComment from './InputComment'

function Details({ allIds, selectedId, view, familyId, setView ,reload }) {
    const inputName = useRef("")
    const inputMaker = useRef("")
    const inputModel = useRef("")
    const inputUsePlace = useRef("")
    const inputBuyDate = useRef("")
    const inputBuyAt = useRef("")
    const [detailsObj, setDetailsObj] = useState({});
    const [comments, setComments] = useState([])
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
        fetch("/api/details",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ familyId, appId:selectedId })
            }).then(res=>{
                return res.json()
                }).then(jsoned => {
                setDetailsObj(jsoned);
                inputName.current.value = detailsObj.appName
            }).catch(err=>{
                });
        },[view])
    useEffect(()=>{
        const selectedObj = allIds.find(obj=> obj.appId === selectedId)
        inputMaker.current.value = detailsObj.maker||selectedObj.maker;
        inputName.current.value = detailsObj.appName||selectedObj.appName;
        inputModel.current.value = detailsObj.modelNumber||selectedObj.modelNumber;
        inputUsePlace.current.value = detailsObj.usePlace || "--選択してください--";
        inputBuyDate.current.value = detailsObj.buyDate && new Date(detailsObj.buyDate).toLocaleDateString("sv-SE") //|| "";
        inputBuyAt.current.value = detailsObj.buyAt || "";
        },[detailsObj])
    useEffect(()=>{
        fetch(`/api/comments/${selectedId}`).then(res=> res.json() ).then(jsoned=>setComments(jsoned) ).catch(err=> console.error(err) )
        },[])
    useEffect(()=>{
        fetch("/api/use_places").then(res=>res.json()).then(jsoned => setUsePlace(jsoned)).catch(err=>console.error(err))
        },[])
    const urlhavings = "/api/havings";
    const funFetch = postOrPatch => {
        fetch("/api/havings",{
            method: postOrPatch,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                familyId,
                appId:selectedId,
                usePlace:inputUsePlace.current.value,
                buyDate:Number(new Date(inputBuyDate.current.value)),
                buyAt:inputBuyAt.current.value
            })
            }).then(res=>res.json()).then(jsoned=> console.log(jsoned)).catch(err=>console.error(err))
        setView("homeView")
        reload(prev => prev + 1)
        }
    const onSubmit = () => {
        funFetch("PATCH")
        }
    const clickGet = () => {
        console.log("ようこそ")
        funFetch("POST")
        }
    const clickDelete = () => {
        console.log("今まで大変お世話になりました")
        fetch(urlhavings,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                },
            body: JSON.stringify({
                familyId,
                appId: selectedId
                })
            })
        setView("homeView")
        reload(prev => prev + 1)
        }

    return (
        <>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="disabledSelect">メーカー</Form.Label>
                    <Form.Select id="disabledSelect" disabled ref={inputMaker}>
                {detailsObj.maker ? <option selected>{detailsObj.maker}</option>:<option value='' disabled selected>--選択してください--</option>}
               {arrMaker.map(makerName => <option key={makerName}>{makerName}</option>)}
          </Form.Select>
        </Form.Group>
        {view !== "newForm" &&(
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">名称</Form.Label>
          <Form.Control id="disabledTextInput" disabled ref={inputName}/>
        </Form.Group>
        )}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">型番号</Form.Label>
          <Form.Control id="disabledTextInput" disabled placeholder={detailsObj.modelNumber} ref={inputModel}/>
        </Form.Group>
         <Form.Group className="mb-3">
           <Form.Label htmlFor="disabledSelect">使用場所</Form.Label>
           <Form.Select id="disabledSelect" ref={inputUsePlace}>
               <option disabled>--選択してください--</option>
           {usePlaces.map(placeObj => <option key={placeObj.id}>{placeObj.name}</option>)}
           </Form.Select>
         </Form.Group>
         <Form.Group>
            <Form.Label>購入日</Form.Label>
            <Form.Control type="date" ref={inputBuyDate}></Form.Control>
         </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">購入元</Form.Label>
          <Form.Control id="disabledTextInput" ref={inputBuyAt}/>
        </Form.Group>
        </Form>
        <DetailsMenu />
                <Card>
                  <Card.Header>使ってるみんなの声</Card.Header>
        {comments.map(obj=> (
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <p>
                        {' '}
                        {obj.comment}{' '}
                      </p>
                      <footer className="blockquote-footer">
                        使用歴{Math.floor((obj.postDate-obj.buyDate)/(365*24*60*60*1000))}年
                      </footer>
                    </blockquote>
                  </Card.Body>
            ))}
                </Card>
        <InputComment familyId={familyId} selectedId={selectedId} buyDate={inputBuyDate.current.value} />
        {!detailsObj.appId ? (
            <Card className="text-center my-5">
                <Button variant="primary" onClick={clickGet}>ようこそ</Button>
            </Card>
        ):(
            <Card className="text-center my-5">
                <Button variant="outline-secondary" onClick={clickDelete}>今までありがとう</Button>
            </Card>
        )}
    </>
  );
}

export default Details;