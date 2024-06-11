import Nav from 'react-bootstrap/Nav';

function DetailsMenu() {
  return (
    <Nav justify defaultActiveKey="link-2" className="justify-content-center">
      <Nav.Item>
        <Nav.Link href="/home">BACK</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">EDIT</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default DetailsMenu;

