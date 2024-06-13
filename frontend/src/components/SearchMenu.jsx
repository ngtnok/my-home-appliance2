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
            setSearchWord(inputNameOrModel.current.value)
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
    </Navbar>
  );
}

export default SearchMenu;