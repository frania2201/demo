import React, {Component} from "react";
import "../style.css"

class ToDoList extends Component{
    state={
        tasks:[{
            id: 99,
            title: "Wyprać kota",
            isCompleted: false,
            doneDate: "2019-01-25",
            priority: 5
        },{
            id: 98,
            title: "Wciągnąć Kurze",
            isCompleted: true,
            doneDate: "2019-11-08",
            priority: 4
        },{
            id: 97,
            title: "Umyć gary",
            isCompleted: false,
            doneDate: "2017-01-01",
            priority: 1
        }],
    }
    addTask = (task)=>{
        let newState = [...this.state.tasks,task]
        this.setState({
            tasks:newState
        })
    }
    changeFilter = () => {
        const unfiltered = [...this.state.tasks];
        const filtered = unfiltered.sort((a,b) => {
            return b.priority - a.priority
        });
        this.setState({tasks: filtered});
    };
    filerByDate = () => {
        const unfiltered = [...this.state.tasks];
        const filtered = unfiltered.sort((a, b) => {
            let a2 = new Date(a.doneDate);
            let b2 = new Date(b.doneDate);
            return b2 - a2

        });
        this.setState({tasks: filtered});
    }

    removeTask = (id)=>{
        let newState = this.state.tasks.filter(task=> {
            return task.id !== id
        })
        this.setState({
            tasks:newState
        })
        console.log(newState)
    }
    toggleDone = (id)=>{
        let newState = [...this.state.tasks]
        console.log("wybrano",id)
        newState.forEach(task=> {
            if(task.id === id){
                task.isCompleted =!task.isCompleted
                console.log("?")
            }
        })
        this.setState({
            tasks:newState
        },()=>{
            console.log(newState)
        })

    }
    render(){
        return(
            <>
                <Form onAdd={this.addTask}/>
            <div className="tasks_container">
                {this.state.tasks.map(task=><ToDoTask key={task.id} task={task} onDelete={this.removeTask} onToggle={this.toggleDone}/>)}
            </div>
                <button className="priority_button" onClick={this.changeFilter}>Filtruj po priorytecie zadania</button>
                <button className="date_button" onClick={this.filerByDate}>Filtruj po dacie zakończenia zadania</button>
            </>
        )
    }
}
class ToDoTask extends Component{
    state= {
        divBackground: true
    }
    handleDone =()=> {
        console.log("zrobione!")
        this.props.onToggle(this.props.task.id)
        this.setState({divBackground: !this.state.divBackground})
    };
    handleDelete =()=>{
        console.log("usuń", this.props.task.id)
        this.props.onDelete(this.props.task.id)
    };
    render(){
        return(
            <>
                <div className="tasks" style={{backgroundColor: this.state.divBackground?'lightcyan':'khaki'}}>
                <div className="firstDiv">
                    <h3>{this.props.task.title} </h3>
                    <p>{this.props.task.priority}</p>
                    <p>{this.props.task.doneDate}</p>
               </div>
               <div className="secondDiv">
                    <button className="done" onClick={this.handleDone}>Zrobione!</button>
                    <button className="delete" onClick={this.handleDelete}>Usuń</button>
               </div>
                </div>
            </>
        )
    }
}

class Form extends Component{
    state = {
        id: 1,
        title:  "",
        isCompleted: false,
        doneDate: "",
        priority: 1
    }
    handleChange = (e)=>{
        this.setState({[e.target.name]:e.target.value})
    };
    addTask=(e)=>{
        e.preventDefault();
        this.setState({
            id: this.state.id + 1,
        })
        this.props.onAdd({
            id: this.state.id,
            title: this.state.title,
            isCompleted: this.state.isCompleted,
            doneDate: this.state.doneDate,
            priority: this.state.priority
        })
    };
    render(){
        return(
            <form onSubmit={this.addTask}>
                <div className="form">
                <label htmlFor="title">Zadanie:</label>
                <input id="title" type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
                <label htmlFor="priority">Priorytet zadania</label>
                <select value={this.state.priority} name="priority" id="priority" onChange={this.handleChange}>
                    <option value="1" >Mało ważne</option>
                    <option value="2">Dość ważne</option>
                    <option value="3">Ważne</option>
                    <option value="4">Bardzo ważne</option>
                    <option value="5">Mega ważne</option>
                </select>
                <label date="doneDate">Data zakończenia:</label>
                <input id="doneDate" type="date" name="doneDate" value={this.state.doneDate} onChange={this.handleChange}/>
                <button className="submit">Dodaj zadanie</button>
                </div>
            </form>
        )
    }
}

function App(){
    return (
            <>
                <ToDoList/>
            </>
    )
}

export default App;