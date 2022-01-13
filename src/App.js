import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import './app.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/home/Home"
import CustomerAdd from "./pages/customer/customerAdd/CustomerAdd"
import CustomerInfo from "./pages/customer/customerInfo/CustomerInfo";
import CustomerList from "./pages/customer/customerList/CustomerList";
import SupplierAdd from "./pages/supplier/supplierAdd/SupplierAdd";
import SupplierInfo from "./pages/supplier/supplierInfo/SupplierInfo";
import SupplierList from "./pages/supplier/supplierList/SupplierList";
import EmployeeAdd from "./pages/employee/employeeAdd/EmployeeAdd";
import EmployeeList from "./pages/employee/employeeList/EmployeeList";
import EmployeeInfo from "./pages/employee/employeeInfo/EmployeeInfo";
import ProductSale from "./pages/sales/products_sale/ProductSale";
import SalesServiceOrder from "./pages/sales/service_order/SalesServiceOrder";
import SalesTransformationProposal from "./pages/sales/transformation_proposal/SalesTransformationProposal";
import GetQuoteProductSale from "./pages/getQuote/products_sale/ProductSale";
import GetQuoteServiceOrder from "./pages/getQuote/service_order/GetQuoteServiceOrder";
import GetQuoteTransformationProposal from "./pages/getQuote/transformation_proposal/GetQuoteTransformationProposal";
import BillToPayList from "./pages/financial/billsToPay/BillToPayList.jsx";
import NewBillToPay from "./pages/financial/billsToPay/NewBillToPay";
import BillToReceiveList from "./pages/financial/billsToReceive/BillToReceiveList.jsx";
import NewBillToReceive from "./pages/financial/billsToReceive/NewBillToReceive";
import BillPaidList from "./pages/financial/billsPaid/BillPaidList";
import BillReceivedList from "./pages/financial/billsReceived/BillReceivedList";
import BillsPayInfo from "./pages/financial/billsInfo/BillsPayInfo";
import BillsReceiveInfo from "./pages/financial/billsInfo/BillsReceiveInfo";

function App() {
  return (
    <div className="container">

      <Router>

        <Topbar/> 
        
        <Sidebar/>

        <Switch>

        {/* HOME */}
          <Route exact path="/">
            <Home/>
          </Route>

          {/* CLIENTES */}
          <Route exact path="/cliente">
            <CustomerList/>
          </Route>

          <Route path="/cliente/:id" component={CustomerInfo}/>

          <Route path="/novocliente">
            <CustomerAdd/>
          </Route>

          {/* VENDA */}
          <Route path="/venda/nova-os">
            <SalesServiceOrder/>
          </Route>

          <Route path="/venda/nova-venda">
            <ProductSale/>
          </Route>

          <Route path="/venda/nova-transformacao">
            <SalesTransformationProposal/>
          </Route>

          {/* FORNECEDOR */}
          <Route exact path="/fornecedor">
            <SupplierList/>
          </Route>

          <Route path="/fornecedor/:id" component={SupplierInfo}/>

          <Route path="/novofornecedor">
            <SupplierAdd/>
          </Route>

          {/* FUNCIONARIO */}
          <Route exact path="/funcionario">
            <EmployeeList/>
          </Route>

          <Route path="/funcionario/:id" component={EmployeeInfo}/>

          <Route path="/novofuncionario">
            <EmployeeAdd/>
          </Route>

          {/* ORCAMENTO */}
          <Route exact path="/orcamento/nova-os">
            <GetQuoteServiceOrder/>
          </Route>

          <Route exact path="/orcamento/nova-venda">
            <GetQuoteProductSale/>
          </Route>

          <Route exact path="/orcamento/nova-transformacao">
            <GetQuoteTransformationProposal/>
          </Route>

          {/* FINANCEIRO */}
          <Route exact path="/financeiro/pagas/:id" component={BillsPayInfo}/>          

          <Route exact path="/financeiro/pagas">
            <BillPaidList/>
          </Route>
          
          <Route exact path="/financeiro/pagar">
            <BillToPayList/>
          </Route>

          <Route exact path="/financeiro/pagar/cadastro">
            <NewBillToPay/>
          </Route>

          <Route exact path="/financeiro/recebidos/:id" component={BillsReceiveInfo}/>

          <Route exact path="/financeiro/recebidos">
            <BillReceivedList/>
          </Route>

          <Route exact path="/financeiro/receber">
            <BillToReceiveList/>
          </Route>

          <Route exact path="/financeiro/receber/cadastro">
            <NewBillToReceive/>
          </Route>

        </Switch>

      </Router>

 
    </div>
  );
}

export default App;
