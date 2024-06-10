import Nav from 'react-bootstrap/Nav';

function HeaderMenu() {
  return (
    <Nav justify variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link eventKey="link-1">ADD</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/home">HOME</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">SEARCH</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default HeaderMenu;

