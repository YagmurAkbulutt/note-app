import { Outlet, useParams, Navigate } from "react-router-dom"
import { Note } from "../../type"

type Props = {
    notes: Note[]
}
const Layout = ({notes} : Props) => {
    //urlden parametreyi al 
    const {id} = useParams()

    // bütün notların arasında idsi urldeki parametreyle eşleşen noteun verilerini ara
    const found = notes.find((i) => i.id === id)

    //note bulunamazsa anasayfaya yönlendir
    if(!found) return <Navigate to="/" replace/>

    // alt routeun bileşenini ekrana bas ve bulunan noteun verilerini gönder
  return (
    // outlet : alt routeun bileşenini basma  
    <Outlet context={found}/>
  )
}

export default Layout
