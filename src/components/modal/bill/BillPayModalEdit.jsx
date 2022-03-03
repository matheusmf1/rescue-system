import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';

import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";

import CustomTextField from '../../CustomTextField';
import CustomFormControl from '../../CustomFormControl';
import ptBrLocate from "date-fns/locale/pt-BR";

import { Bill } from "../../../data/Bill";

export default function BillPayModalEdit( props ) {

  const { data,  installment } = props
  const [ isOpenModal, setIsOpenModal  ] = useState( false );

  const installmentData = data['paymentInfo']['installmentsData'].filter( data => data[ 'installment' ] === `${installment}` )[0]

  const [ valuesInstallmentData, setValuesInstallmentData ] = useState({
    installmentAmountPay: `${installmentData.installmentAmountPay}`,
    dueDate: `${installmentData.dueDate}`,
    receiptFile: `${installmentData.receiptFile}`,
    paymentDate: "",
    amountPaid: `${installmentData.amountPaid}`,
    paymentType: `${installmentData.paymentType}`,
    installment: `${installmentData.installment}`,
    paymentStatus: `${installmentData.paymentStatus}`
  });
  
  const [values, setValues] = useState({
    id: `${data.id}`,
    name: `${data.name}`,
    billType: `${data.billType}`,
    documentNumber: `${data.documentNumber}`,
    billFile: `${data.billFile}`,
    additionalInformation: `${data.additionalInformation}`,
    expenseType: `${data.expenseType}`,
    amountPay: `${data.amountPay}`,

    // service: `${data.service}`,
    // serviceNumber: `${data.serviceNumber}`,

    paymentInfo: {
      installments: `${data['paymentInfo'].installments}`,
      installmentsData: data['paymentInfo'].installmentsData,
    }
  });

  const handleOpenCloseDialog = ( e ) => {
    setIsOpenModal( !isOpenModal )
  };

  const handleInstallmentInformation = ( id ) => ( e ) => {
    setValuesInstallmentData( { ...valuesInstallmentData, [id]: e.target.value } );
  }

  const handleInformation = async () => {

    let finalInstallmentData = values['paymentInfo']['installmentsData'].map( data => data['installment'] === installment ? valuesInstallmentData : data )
    values['paymentInfo']['installmentsData'] = finalInstallmentData;

    const bill = new Bill( { data: values, id: values['id'], billType: "pay" } )
    let result = await bill.updateBillOnFirebase();

    if ( result ) {
      alert( "Conta atualizada com sucesso" )
      window.location.reload()
    }
    else {
      alert( "Algo deu errado ao atualizar as informações. Por favor verifique todas as informações e tente novamente." )
    }

    handleOpenCloseDialog()
  }
  
  const handleOnChangeInformation = (id) => (e) => {
    setValues( { ...values, [id]: e.target.value } );
  }
  
  return (
    <>
      <button className="userListEdit" variant="outlined" onClick={handleOpenCloseDialog}>
        Editar
      </button>

      <Dialog 
        open={isOpenModal}
        onClose={handleOpenCloseDialog}
        PaperProps={{
          style: {
            maxWidth: "720px"
          },
        }}
        >      
    
        <DialogTitle className="modal__title">Editar dados de Conta a Pagar</DialogTitle>

        <div className='modal__container'>
          
          <div className="form__input--halfWidth">            
            <CustomTextField
              id="name"
              label="Empresa"
              variant="outlined" 
              defaultValue={values.name}
              onChange={handleOnChangeInformation('name')}
            />
          </div>

          <div className="form__input--halfWidth">
            <CustomTextField
              id="documentNumber"
              label="Número do documento"
              variant="outlined" 
              defaultValue={values.documentNumber}
              onChange={handleOnChangeInformation('documentNumber')}
            />
          </div>

          <div className="form__input--halfWidth">
            <CustomTextField  
              id="amountPay"
              label={ valuesInstallmentData.installment === "1" ? `Valor da parcela ${valuesInstallmentData.installment} / ${values.paymentInfo.installments} no total de R$ ${values.amountPay}` : "Valor Total a Receber"}
              disabled
              variant="outlined" 
              defaultValue={valuesInstallmentData.installmentAmountPay}
              onChange={handleInstallmentInformation('amountPay')}
              InputProps={
                {startAdornment: <InputAdornment position="start">R$</InputAdornment>}
              }
            />
          </div>

          <div className="form__input--halfWidth">
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBrLocate}>
              <DatePicker
                label="Data de vencimento"
                id="dueDate"
                value={ valuesInstallmentData.dueDate }
                inputFormat="dd/MM/yyyy"      
                onChange={ (newValue) => {
                  setValuesInstallmentData( { ...valuesInstallmentData, dueDate: `${new Date( newValue )}` } );
                }}
                renderInput={(params) => <CustomTextField {...params}/>}
              />
            </LocalizationProvider>
          </div>


          <div className="form__input--halfWidth">
            <CustomFormControl>
              <InputLabel id="formaPagamento-label">Formas de pagamento</InputLabel>

              <Select
                labelId="formaPagamento-label"
                id="paymentType"
                value={valuesInstallmentData.paymentType}
                label="Formas de pagamento"
                onChange={handleInstallmentInformation('paymentType')}
              >

                <MenuItem value='boleto'>Boleto</MenuItem>
                <MenuItem value='pix'>PIX</MenuItem>
                <MenuItem value='transferencia'>Transferência</MenuItem>
                <MenuItem value='deposito'>Depósito</MenuItem>
                <MenuItem value='cheque'>Cheque</MenuItem>
                <MenuItem value='dinheiro'>Dinheiro</MenuItem>
              </Select>

            </CustomFormControl>
          </div>


          <div className="form__input--halfWidth">
            <CustomFormControl>
              <InputLabel id="formaPagamento-label">Tipo de despesa</InputLabel>

              <Select
                labelId="formaPagamento-label"
                id="expenseType"
                value={values.expenseType}
                label="Tipo de despesa"
                onChange={handleOnChangeInformation('expenseType')}
              >
                
                <MenuItem value="fixa">Fixa</MenuItem>
                <MenuItem value="folhaPagamento">Folha de Pagamento</MenuItem>
                <MenuItem value="impostos">Impostos</MenuItem>
                <MenuItem value="bancaria">Bancária</MenuItem>
                <MenuItem value="produto">Produto</MenuItem>
                <MenuItem value="servico">Serviço</MenuItem>   
                <MenuItem value="alimentacao">Alimentação</MenuItem>   

              </Select>

            </CustomFormControl>
          </div>


          <div className="form__input--halfWidth">
            <CustomTextField
              id="billFile"
              label="Arquivo da conta"
              variant="outlined" 
              defaultValue={values.billFile}
              onChange={handleOnChangeInformation('billFile')}
            />
          </div>

          <div className="form__input--halfWidth">
            <label htmlFor="upload-file">
              <input
                style={{ display: "none" }}
                id="upload-file"
                name="upload-file"
                type="file"
              />
              
              <Fab
                className='modal__upload--button'
                component="span"
                aria-label="add"
                variant="extended"
              >

                <AddIcon /> Novo arquivo
              </Fab>
            </label>

          </div>



          <div className="form__input--fullWidth">
            <CustomTextField
              id="additionalInformation"
              label="Informações adicionais"
              multiline
              value={values.additionalInformation}
              rows={4}
              onChange={handleOnChangeInformation('additionalInformation')}
            />
          </div>

        </div>


        <DialogActions>
          <Button onClick={handleOpenCloseDialog}>Cancelar</Button>
          <Button onClick={handleInformation}>Ok</Button>
        </DialogActions>

      </Dialog>
    </>
  );
  }