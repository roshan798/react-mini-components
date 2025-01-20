import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import NestedComments from "./pages/nested-comment/NestedComment"
import commentsData from "./pages/nested-comment/data/nestedCommentsData.json"
import Header from "./component/Header"
function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nested-commments" element={<NestedComments comments={commentsData} />} />
      </Routes>
    </>
  )
}

export default App
