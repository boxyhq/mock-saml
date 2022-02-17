import { Sidenav, Nav, Dropdown } from 'rsuite';

export default function Navbar() {
    return (
        <div style={{ width: 240 }}>
        <Sidenav defaultOpenKeys={['3', '4']} activeKey="1">
          <Sidenav.Body>
            <Nav>
              <Nav.Item eventKey="1">Dashboard</Nav.Item>
              <Nav.Item eventKey="2">Apps</Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </div>
    )
}