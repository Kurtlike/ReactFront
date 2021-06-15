import React from "react";
import CustomSelect, {selectedValue} from "./CustomSelect";
import InputForm from "./InputForm";
import getAnswer from "../requests/MainRequest";
import onloadRequest from "../requests/OnloadRequest";
export default class DataForm extends React.Component{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.sendRequest = this.sendRequest.bind(this)
        this.selectChange = this.selectChange.bind(this)
        this.state = { chosenFunction:0,left: 0, right: 0, yInput: 0, step: 0 ,optionals: [1]}
    }
    handleChange(event){
       this.setState({[event.target.id]:event.target.value})
    }
    selectChange(event){
        this.setState({chosenFunction:event.target.value})
    }
    componentDidMount(){
        onloadRequest((data)=>{
            let optionals =[]
            for(let i = 0; i < Object.keys(data).length; i++){
                optionals.push(data[i])
            }
           this.setState({optionals: optionals})

        });
    }

    sendRequest(){
        getAnswer(this.state)
    }
    render() {
        return <div id={"dataForm"} >
            <CustomSelect optionals={this.state.optionals} labelName={"Выберите функцию"} inputName="chosenFunction" handleChange ={this.selectChange}/>
            <InputForm id={"left"} labelName={"Левая граница"} type ={"number"} handleChange = {this.handleChange}/>
            <InputForm id={"right"} labelName={"Правая граница"} type ={"number"} handleChange = {this.handleChange}/>
            <InputForm id={"yInput"} labelName={"Введите Y0"} type ={"number"} handleChange = {this.handleChange}/>
            <InputForm id={"step"} labelName={"Введите шаг"} type ={"number"} handleChange = {this.handleChange}/>
            <button onClick={this.sendRequest}>Решить</button>
            <div id={"answer"}></div>


        </div>
    }
}
