import './App.css';
//import { Num } from './Componentes/Grafica';
import Grafica from './Componentes/Grafica2';
import { Opciones } from './Componentes/Opciones';

function App() {
  var res = []
  var rows = []
  for (let i = 1; i <= 3; i++) {
    rows.push(Opciones(i))
  }
  rows.forEach(e => {
    console.log(e.props.children.props.children[3].props.children)
    res.push(e.props.children.props.children[3].props.children)
  });
  console.log(("popos", res));
  //console.log(rows[0].props.children.props.children[3].props.children );
  return (
    <div className="App">
      {
        rows
      }
      {/* <Num {...res}/> */}
      <Grafica {...res}/>
  </div>
  );
}

export default App;
