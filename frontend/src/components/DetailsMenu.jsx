import Nav from 'react-bootstrap/Nav';

function DetailsMenu({selectedId, view}) {
  return (
    <Nav justify defaultActiveKey="/home" className="justify-content-center">
      <Nav.Item>
        <Nav.Link href="/home">BACK</Nav.Link>
      </Nav.Item>
      <Nav.Item>
          {selectedId === 0?
            <Nav.Link eventKey="link-2">SAVE</Nav.Link>:
            <Nav.Link eventKey="link-2">EDIT</Nav.Link> }
      </Nav.Item>
    </Nav>
  );
}

export default DetailsMenu;

