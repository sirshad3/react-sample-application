import React from 'react';
import ResponsiveBox, {
  Row, Col, Item, Location,
} from 'devextreme-react/responsive-box';

import '../Layout/Style.css'
import NavBar from '../NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

const screen = (width) => (width < 700 ? 'sm' : 'lg');
const Layout = () => (
  <div id="page"  className="demo-container">
    <ResponsiveBox
      singleColumnScreen="sm"
      screenByWidth={screen}
    >
      <Row ratio={0}></Row>
      <Row ratio={4}></Row>
      <Row ratio={0}></Row>

      <Col ratio={1}></Col>
      <Col
        ratio={2}
        screen="lg"
      ></Col>
      <Col ratio={1}></Col>
      <Item>
        <Location
          row={0}
          col={0}
          colspan={3}
          screen="lg"
        ></Location>
        <Location
          row={0}
          col={0}
          colspan={2}
          screen="sm"
        ></Location>
        <div className="header item">
          <nav>
           <NavBar/>
          </nav>
        </div>
      </Item>
      <Item>
        <Location
          row={1}
          col={0}
          colspan={3}
          screen="lg"
        ></Location>
        <Location
          row={1}
          col={0}
          colspan={2}
          screen="sm"
        ></Location>
        <div className="content item">
          {/* <p>Content</p> */}
          <main>
              <Outlet />
           </main>
        </div>
      </Item>
      <Item>
        <Location
          row={2}
          col={0}
          colspan={3}
          screen="lg"
        ></Location>
        <Location
          row={2}
          col={0}
          colspan={2}
          screen="sm"
        ></Location>
        <div className="footer item">
        <footer>
             <Footer/>
            </footer>
        </div>
      </Item>
    </ResponsiveBox>
  </div>
);
export default Layout;
