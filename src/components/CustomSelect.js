import React from "react";

export default class CustomSelect extends  React.Component {
    render() {

        return  <div
        className={"inputs"}>
            <label>
                {this.props.labelName}
                <select
                    id="functionSelect"
                    className="inputForm selects"
                    defaultValue={this.props.optionals[0]}
                    onChange={this.props.handleChange}
                >
                    {this.props.optionals.map((optional, i) => <option value={i} key = {i}>{optional}</option>)}
                </select>
            </label>
        </div>
    }
}
export let selectedValue;
