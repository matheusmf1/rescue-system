import { doc, getDoc, setDoc, updateDoc, increment, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export class Supplier {

  constructor ( { data, id } ) {
    this.data = data;
    this.id = id;
  }

  addSupplierToFirebase = async () => {
    try {

      const refID = doc(db, "ids", "suppliers")
      const docSnap = await getDoc( refID );
  
      if ( !docSnap.exists() ) {
        await setDoc( doc( db, "ids", "suppliers" ), { id: 0 } );
      }
      
      //Update id counter
      await updateDoc( doc( db, "ids", "suppliers"), { id: increment( 1 ) } );

      const idSnap = await getDoc( doc( db, "ids", "suppliers" ) );
      const idData = idSnap.data();

      //Set new document id
      this.data['id'] = idData['id']
      await setDoc( doc( db, "suppliers", `${this.data['id']}` ), this.data );
      
      return true
      
    } catch (error) {
      console.error( error )
      return false
    }
  }

  getSupplierFromFirebase = async () => {

    try {
      const docRef = doc( db, "suppliers", this.id );
      const docSnap = await getDoc( docRef );
      return docSnap.data()

    } catch( error ) {
      console.error( error )
      return null;
    }  

  }

  updateSupplierOnFirebase = async () => {
    try {
      const docRef = doc( db, "suppliers", this.id );
      await updateDoc( docRef, this.data );
      return true
      
    } catch (error) {
      console.error( error ) 
      return false
    }
  }

  deleteSupplierFromFirebase = async () => {
    try {
      await deleteDoc( doc( db, "suppliers", `/${this.id}` ) );
      return true

    } catch ( error ) {
      console.error( error )
      return false
    }
  }


}