import Nav from 'react-bootstrap/Nav';

function HeaderMenu({setView,setId,view}) {
  return (
    <Nav justify variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
          {view !== "detailsView" &&( <Nav.Link eventKey="link-1" onClick={()=> { setId(0); setView("newForm")}}>ADD</Nav.Link>)}
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/home">HOME</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2" onClick={()=>setView("allItemView")}>SEARCH</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default HeaderMenu;

