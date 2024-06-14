import Nav from 'react-bootstrap/Nav';

function HeaderMenu({setView,setId,view}) {
  return (
    <Nav justify variant="tabs" defaultActiveKey="/">
      <Nav.Item>
        <Nav.Link eventKey="/" onClick={()=>setView("homeView")}>ホーム</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2" onClick={()=>setView("allItemView")}>探す</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default HeaderMenu;

