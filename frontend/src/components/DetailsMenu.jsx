import Nav from 'react-bootstrap/Nav';

function DetailsMenu({selectedId, view, onSubmit,setView}) {
    return (
        <Nav justify defaultActiveKey="/" className="justify-content-center">
            <Nav.Item>
                <Nav.Link eventKey="/" onClick={()=>setView("homeView")}>ホームに戻る</Nav.Link>
            </Nav.Item>
{/*             <Nav.Item> */}
{/*                 <Nav.Link eventKey="link-2" onClick={onSubmit}>保存</Nav.Link> */}
{/*             </Nav.Item> */}
        </Nav>
    );
}

export default DetailsMenu;

