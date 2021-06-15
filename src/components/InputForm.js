import React from "react";
export default class InputForm extends React.Component{

    render() {
        return <div
        className={"inputs"}>
            <label className="inputLabel"
            >
            {this.props.labelName}
            <input
                className="inputForm"
                type={this.props.type}
                id={this.props.id}
                onChange={this.props.handleChange}
            />
        </label>
        </div>

    }
}