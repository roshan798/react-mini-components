import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Header from "./component/Header"
import pagesData from "./pages/routingData"
function App() {

  return (
    <>
      <Header componentCount={pagesData.length } />
      <Routes>
        <Route path="/" element={<Home />} />
        {
          pagesData.map((page, index) => {
            return <Route key={index} path={page.path} element={<page.component />} />
          })
        }
      </Routes>
    </>
  )
}

export default App
