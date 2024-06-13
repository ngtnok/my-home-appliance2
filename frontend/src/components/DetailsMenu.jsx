import Nav from 'react-bootstrap/Nav';

function DetailsMenu({selectedId, view, onSubmit}) {
    return (
        <Nav justify defaultActiveKey="/home" className="justify-content-center">
            <Nav.Item>
                <Nav.Link href="/home">戻る</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2" onClick={onSubmit}>保存</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default DetailsMenu;

