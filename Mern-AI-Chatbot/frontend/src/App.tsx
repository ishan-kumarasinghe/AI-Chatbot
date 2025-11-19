import { Route, Routes } from "react-router-dom";
import { Fragment } from "react/jsx-runtime"

function App(){
  return (
    <Fragment>
      <header>THIS IS HEADER</header>
      <Routes>
        <Route path="/" element/>
      </Routes>
    </Fragment>
); 

}

export default App
