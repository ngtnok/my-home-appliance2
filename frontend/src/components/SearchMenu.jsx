import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function SearchMenu() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
{/*       <Container fluid> */}
{/*         <Navbar.Brand href="#">Navbar scroll</Navbar.Brand> */}
{/*         <Navbar.Toggle aria-controls="navbarScroll" /> */}
{/*          <Navbar.Collapse id="navbarScroll">  */}
{/*           <Nav */}
{/*             className="me-auto my-2 my-lg-0" */}
{/*             style={{ maxHeight: '100px' }} */}
{/*             navbarScroll */}
{/*           > */}
{/*             <Nav.Link href="#action1">Home</Nav.Link> */}
{/*             <Nav.Link href="#action2">Link</Nav.Link> */}
{/*             <NavDropdown title="Link" id="navbarScrollingDropdown"> */}
{/*               <NavDropdown.Item href="#action3">Action</NavDropdown.Item> */}
{/*               <NavDropdown.Item href="#action4"> */}
{/*                 Another action */}
{/*               </NavDropdown.Item> */}
{/*               <NavDropdown.Divider /> */}
{/*               <NavDropdown.Item href="#action5"> */}
{/*                 Something else here */}
{/*               </NavDropdown.Item> */}
{/*             </NavDropdown> */}
{/*             <Nav.Link href="#" disabled> */}
{/*               Link */}
{/*             </Nav.Link> */}
{/*           </Nav> */}
{/*            <Form className="d-flex"> */}
    <Row className="justify-content-md-center">
        <Col>
            <Form.Control
              type="search"
              placeholder="製品名称・型番号"
              className="me-2"
              aria-label="Search"
              style={{width: '100%'}}
            />
        </Col>
        <Col>
            <Button variant="outline-primary">検索</Button>
        </Col>
    </Row>
{/*            </Form> */}
{/*         </Navbar.Collapse> */}
{/*       </Container> */}
    </Navbar>
  );
}

export default SearchMenu;