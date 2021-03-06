import { React, Component } from 'react';
import { TablePaidReceivedBill } from '../../../components/tables/bills/tablePaidReceivedBill';
import { db } from "../../../firebase";
import { collection, getDocs } from 'firebase/firestore';
import { query, orderBy } from "firebase/firestore";
import { Bill } from "../../../data/Bill";

export default class BillPaidList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      collection: []
    }

  }

  tableColumns = {
    name: "Empresa/Fornecedor",
    dueDate: "Vencimento",
    installments: "Parcelas",
    amountPay: "Valor Total",
    installmentAmountPay: "Valor da Parcela",
    paymentType: "Pagamento",
    action: "Opções"
  };

  componentDidMount = async () => {

    const billCollectionRef = collection( db, "bills_pay" )
    const queryResult = query( billCollectionRef, orderBy("id") );
    const docSnap = await getDocs( queryResult );

    const billHasPaidInstallment = docSnap.docs.map( bill => {
      
      let billData = bill.data()
      let array = billData['paymentInfo']['installmentsData'].filter( installmentinfo => installmentinfo.paymentStatus === "paid" )
      return array.length > 0 ? billData : 0
    });
  
    this.setState( { tableData: billHasPaidInstallment.filter( data => data !== 0 ) },
      () => this.setState( { collection: this.state.tableData.slice( 0, 10 ) } ) 
    )
    
  };

  render() {

    const setCollection = ( value ) => {
      this.setState( {"collection":  value } )
    }

    const handleDelete = async ( id ) => {
      const bill = new Bill( { id: id, billType: "pay" } );
      return await bill.deleteBillFromFirebase();
    }
    
    return (
      <>
        <TablePaidReceivedBill
          tableName="Contas Pagas"
          columns={ this.tableColumns }
          data={ this.state.tableData }
          billInfoLink="/financeiro/pagas"
          linkCadastro="/financeiro/pagar/cadastro"
          collection2={ this.state.collection }
          setCollection2={ setCollection }
          handleDelete={ handleDelete }
          searchPlaceholderName={ "Procurar empresa ou valor total" }
        />  
      </>
    )
  }

}