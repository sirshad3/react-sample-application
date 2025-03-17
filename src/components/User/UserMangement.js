import React, { useCallback, useEffect, useState } from 'react';
import DataGrid, { Scrolling, Pager, Paging, Column,  FilterRow,
  HeaderFilter,
  GroupPanel,
  Editing,
  Grouping,
  Export,
  Selection,} from 'devextreme-react/data-grid';
import SelectBox from 'devextreme-react/select-box';
import CheckBox from 'devextreme-react/check-box';
import { displayModeLabel, getUsers } from '../User/UserGridList';
import '../User/UserStyle.css'
import { Height } from 'devextreme-react/cjs/chart';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid as exportDataGridInPdfFormat } from 'devextreme/pdf_exporter';
import api, { checkToken_And_ExpirationTime } from '../Api/UserListApi';
import CheckTokenExistenceAndExpiry from '../Api/UserListApi';
import { useNavigate } from 'react-router-dom';
import SessionTimeout from '../SessionTimeout';

const exportFormats = ['xlsx', 'pdf'];
 
const onExporting = (e) => {
  //console.log(e.format);
  if (e.format === 'xlsx')
  {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Main sheet');
    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
      });
    });
  }
  else if(e.format === 'pdf')
  {

  const doc = new jsPDF();
  exportDataGridInPdfFormat({
    jsPDFDocument: doc,
    component: e.component,
    indent: 5,
  }).then(() => {
    doc.save('Companies.pdf');
  });
  }

};

const UserManagement = () => {

  const [data, setData] = useState([]);
  const [displayMode, setDisplayMode] = useState('full');
  const [showPageSizeSelector, setShowPageSizeSelector] = useState(true);
  const [showInfo, setShowInfo] = useState(true);
  const [showNavButtons, setShowNavButtons] = useState(true);
  const navigate = useNavigate();
  const [isShow, setShow] = useState(true);
  //const data = GenerateData();
  //CheckTokenExistenceAndExpiry()

  SessionTimeout();
          useEffect(() => {
            const token = localStorage.getItem('token');
            if (token) {
              const decodedToken = JSON.parse(atob(token.split('.')[1]));
              const expirationTime = decodedToken.exp * 1000;
              const now = Date.now();
              const timeLeft = expirationTime - now;
        
              if (timeLeft <= 0) {
                localStorage.removeItem('token');
                setShow(false);
                navigate('/');
              }
              else
              {
                   getUsers()
  .then(response => {
    if (response.data) 
    {
      // data = response.data;
      //console.log('Before dataset into data variable')
      setShow(true);
      setData(response.data)
      //console.log('After dataset into data variable')
    }
  })
  .catch(err => {
   if (err.response && err.response.status === 404) 
  {
   // console.log('An error occurred.');
   //console.log(err.response.data)
   //console.log(err.response.status)
    // setInValidUser(err.response.data)
  }
  });
              }
              // else {
              //   const timer = setTimeout(() => {
              //     localStorage.removeItem('token');
              //     navigate('/login');
              //   }, timeLeft);
        
              //   return () => clearTimeout(timer);
              // }
            }
          }, [navigate]);

  // useEffect(() => 
  // {
  // //   // Fetch users from API on component mount
  //   // console.log('Call use effect...')
  //   //api('/Users/GetUsers')
  //   // .then(response => {
  //   //   if (response) 
  //   //   {
  //   //     console.log('Accepted Response');
  //   //     console.log(response);
  //   //     // data = response.data;
  //   //    // setData(response.data)
  //   //     //console.log('After dataset into data variable')
  //   //   }
  //   // })
  //  getUsers()
  // .then(response => {
  //   if (response.data) 
  //   {
  //     // data = response.data;
  //     console.log('Before dataset into data variable')
  //     setData(response.data)
  //     console.log('After dataset into data variable')
  //   }
  // })
  // .catch(err => {
  //  if (err.response && err.response.status === 404) 
  // {
  //  // console.log('An error occurred.');
  //  console.log(err.response.data)
  //  console.log(err.response.status)
  //   // setInValidUser(err.response.data)
  // }
  // });
  //  }, []);

  const displayModes = [
    { text: "Display Mode 'full'", value: 'full' },
    { text: "Display Mode 'compact'", value: 'compact' },
  ];
  const allowedPageSizes = [5, 10, 'all'];

const customizeColumns = (columns) => {
  columns[0].width = 70;
};

const renderAddressHeader = () => {
  return <i style={{ color: 'black', Height: '20px' }}>ID</i>;
}
  const displayModeChange = useCallback((value) => {
    setDisplayMode(value);
  }, []);
  const showPageSizeSelectorChange = useCallback((value) => {
    setShowPageSizeSelector(value);
  }, []);
  const showInfoChange = useCallback((value) => {
    setShowInfo(value);
  }, []);
  const showNavButtonsChange = useCallback((value) => {
    setShowNavButtons(value);
  }, []);
  const isCompactMode = useCallback(() => displayMode === 'compact', [displayMode]);
  return (
   { isShow } &&  (<div>
         //  {console.log("Rendering component with name:", data)}
      <DataGrid
        id="gridContainer"
        dataSource={data}
        keyExpr="id"
        showBorders={true}
        customizeColumns={customizeColumns}
        onExporting={onExporting}
      >
     <Selection mode="multiple" />
    {/* <GroupPanel visible={true} />
    <Grouping autoExpandAll={true} /> */}
      <Column dataField="id"  caption='ID'   allowColumnResizing={true}
        columnMinWidth={50}/>
      <Column dataField="username" caption='User Name' />
      <Column dataField="name"  caption='Name'/>
      <Column dataField="email" caption='Email' />
        <Scrolling rowRenderingMode="virtual"></Scrolling>
        <Paging defaultPageSize={10} />
        <Pager
          visible={true}
          allowedPageSizes={allowedPageSizes}
          displayMode={displayMode}
          showPageSizeSelector={showPageSizeSelector}
          showInfo={showInfo}
          showNavigationButtons={showNavButtons}
        />
         <FilterRow visible={true} />
    <HeaderFilter visible={true} />
    <GroupPanel visible={true} />
    <Scrolling mode="virtual" />
    <Editing
      mode="row"
      allowAdding={true}
      allowDeleting={true}
      allowUpdating={true}
    />
    <Grouping autoExpandAll={false} />
     <Export
      enabled={true}
      formats={exportFormats}
      allowExportSelectedData={true}
    />
      </DataGrid>
      <div className="options">
        <div className="caption">Options</div>
        <div className="option-container">
          <div className="option">
            <SelectBox
              id="displayModes"
              items={displayModes}
              displayExpr="text"
              inputAttr={displayModeLabel}
              valueExpr="value"
              value={displayMode}
              onValueChange={displayModeChange}
            />
          </div>
          <div className="option">
            <CheckBox
              id="showPageSizes"
              text="Show Page Size Selector"
              value={showPageSizeSelector}
              onValueChange={showPageSizeSelectorChange}
            />
          </div>
          <div className="option">
            <CheckBox
              id="showInfo"
              text="Show Info Text"
              value={showInfo}
              onValueChange={showInfoChange}
            />
          </div>
          <div className="option">
            <CheckBox
              id="showNavButtons"
              text="Show Navigation Buttons"
              value={showNavButtons}
              onValueChange={showNavButtonsChange}
              disabled={isCompactMode()}
            />
          </div>
        </div>
      </div>
    </div>
   )
);
};
export default UserManagement;