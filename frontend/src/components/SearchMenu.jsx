import { useState,useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function SearchMenu({ setSearchWord }) {
    const inputNameOrModel = useRef();
    const inputMaker = useRef();
    const [arrMaker, setMaker] = useState([
        "--メーカーを選択してください--",
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
    const filtering = (e) => {
//         console.log(inputMaker.current.value === "--メーカーを選択してください--")
//         const inputWord = [
//             inputNameOrModel.current.value,
//             inputMaker.current.value !== "--メーカーを選択してください--" && inputMaker.current.value || ""
//             ].join("|")
//         if(e.isComposing && e.key === 'enter'){
            setSearchWord(inputNameOrModel.current.value)
//             }
//         setSearchWord(inputWord)
//         console.log(inputWord)
        }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
            <Form.Control
              type="search"
              placeholder="メーカー・製品名称・型番号"
              className="me-2"
              aria-label="Search"
              style={{width: '100%'}}
              ref={inputNameOrModel}
              onChange={filtering}
            />
{/*         <Form.Group className="mb-1"> */}
{/*           <Form.Select id="disabledSelect" ref={inputMaker} onChange={filtering}> */}
{/*                {arrMaker.map(makerName => <option key={makerName} >{makerName}</option>)} */}
{/*           </Form.Select> */}
{/*         </Form.Group> */}
    </Navbar>
  );
}

export default SearchMenu;