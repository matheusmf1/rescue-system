import { React, Component, useState } from 'react';
import { TablePaidReceivedBill } from '../../../components/tables/bills/tablePaidReceivedBill';
import { db } from "../../../firebase";
import { collection, getDocs, query, orderBy  } from 'firebase/firestore';
import { Bill } from "../../../data/Bill";

export default class BillReceivedList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      collection: []
    }

  }

  tableColumns = {
    name: "Empresa/Fornecedor",
    service: "Serviço",
    dueDate: "Vencimento",
    installments: "Parcelas",
    amountPay: "Valor Total",
    installmentAmountPay: "Valor da Parcela",
    paymentType: "Pagamento",
    action: "Opções"
  };

  componentDidMount = async () => {

    const billCollectionRef = collection( db, "bills_receive" )
    const queryResult = query( billCollectionRef, orderBy("id") );
    const docSnap = await getDocs( queryResult );

    const billHasPaidInstallment = docSnap.docs.map( bill => {
      
      let billData = bill.data()
      let array = billData['paymentInfo']['installmentsData'].filter( installmentinfo => installmentinfo.paymentStatus === "received" )
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
      const bill = new Bill( { id: id, billType: "receive" } );
      return await bill.deleteBillFromFirebase();
    }
    
    return (
      <>
        <TablePaidReceivedBill
          tableName="Contas Recebidas"
          columns={ this.tableColumns }
          data={ this.state.tableData }
          billInfoLink="/financeiro/recebidos"
          linkCadastro="/financeiro/receber/cadastro"
          collection2={ this.state.collection }
          setCollection2={ setCollection }
          handleDelete={ handleDelete }
          searchPlaceholderName={ "Procurar empresa ou valor total" }
        />  
      </>
    )
  }

}