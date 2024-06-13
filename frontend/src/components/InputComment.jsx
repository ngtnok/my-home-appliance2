import { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function ButtonsExample({familyId,selectedId,buyDate}) {
    console.log({familyId,selectedId,buyDate})
    const inputComment = useRef("")
    const clickSend = ()=>{
        console.log(inputComment.current.value)
        fetch("/api/comments",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                familyId,
                appId:selectedId,
                buyDate:Number(new Date(buyDate)),
                postDate: Number(new Date() )
            })
            }).then(res=> res.json() ).then(jsoned => console.log(jsoned) ).catch(err=>console.error(err) )
        inputComment.current.value = ""
        }
  return (
      <InputGroup className="mb-5">
        <Form.Control
          placeholder="この製品についてコメントしてね"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          ref={inputComment}
        />
        <Button variant="outline-secondary" id="button-addon2" onClick={clickSend}>
          投稿
        </Button>
      </InputGroup>
  );
}

export default ButtonsExample;