// to-do: get all styles in ankther file
import React, {  Component } from "react";
import { Card } from '@material-ui/core';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      search: '',
      on: false,
    }
  }

  componentDidMount() {
    fetch('https://api.hatchways.io/assessment/students')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json,
          search: '',
        })
      })
  }

  onchange = e => {
    this.setState({ search: e.target.value })
  }

  toggle = () => {
        this.setState({
          on: !this.state.on,
        })
  }

  // render runs before componentDidMount
  render() {
    const { isLoaded, items, search } = this.state;

    if ( !isLoaded ) {
      return <div>Loading</div>;
    }
    this.state.items.students.forEach(student => student.on = false)
    return (
      <div className="App">
        <Card variant="outlined" style={{maxHeight: 700, maxWidth: 1000, overflow: 'auto', margin: '0 auto', marginTop: 200, borderRadius: '3%'}}>
        <input type="text" placeholder="  Search by name" onChange={this.onchange} style={{'width': '100%', 'height': '50px', 'fontFamily': 'Raleway', 'fontSize': '20px', 'border': 'none', 'outline': 'none'}}/>
        <input type="text" placeholder="  Search by tag" onChange={this.onchange} style={{'width': '100%', 'height': '50px', 'fontFamily': 'Raleway', 'fontSize': '20px', 'borderBottom': 'none', 'borderLeft': 'none', 'borderTopColor': '#e0e0eb'}}/>
          {items.students.filter(student => {
              // Make sure a user can filter the list of students by their name (including full name, also lowercase
              return (student.firstName + student.lastName).toLowerCase().indexOf( search.toLowerCase()) !== -1;
            }).map((student, i) => (
            <Card variant="outlined"> 
              <div id="logo" float='left'>
                <img src={student.pic} alt={student.firstName} width="250" height="250" style={{'borderRadius': '50%', 'border': '0.01px solid', 'borderColor': '#d2d9d8', 'float': 'left', 'marginRight': '50px', 'marginTop': '20px', 'marginLeft': '30px', 'marginBottom': '20px'}}  />
              </div>
              <div id="text" style={{'color': 'grey', 'fontFamily': 'Raleway', 'fontSize': '20px'}}>
                <h1 key={student.id} style={{'fontWeight': '1000', 'color': 'black'}}>
                  {student.firstName.toUpperCase() + " " + student.lastName.toUpperCase()}
                  <button onClick={this.toggle} type="button" className="collapsible" style={{border: 'none', backgroundColor: 'white', fontSize: '50px', color: 'grey'}}>{this.state.on ? <p>--</p> : <p>+</p>}</button>
                </h1>
                <div>
                  Email: {student.email}
                </div>
                <div>
                  Company: {student.company}
                </div>
                <div>
                  Skill: {student.skill}
                </div>
                <div>
                  Average: {average(student.grades)}%
                </div> 
                <p></p>
                <div className="expandedContent" style={{marginLeft: '330px'}}>
                  {this.state.on && (
                  // index is after grade!!!
                  student.grades.map((grade, i) => <p style={{ margin: '0'}}>{'Test ' + (i+1) + ':     ' + grade + '%'}</p>)
                  )}
                </div>          
              </div>
              <br></br>
            </Card>
          ))};
        </Card>
      </div>
    )
  }
}

function average(array) {
  let total = 0;
  for (let i = 0; i < array.length; i++) {
    total += parseFloat(array[i]);
  }
  return total / array.length;
}

export default App;
