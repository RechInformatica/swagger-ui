import React from "react"
import ImPropTypes from "react-immutable-proptypes"

const AvaliableActionsModel = ({ value, getComponent }) => {

    let ModelCollapse = getComponent("ModelCollapse")
    let collapsedContent = <span>Ações específicas [{value.count()}]</span>
    return <span className="prop-enum">
        <ModelCollapse collapsedContent={collapsedContent}>
            {value.map(actionValue => createActionLine(actionValue))}
        </ModelCollapse>
    </span>
}
AvaliableActionsModel.propTypes = {
    value: ImPropTypes.iterable,
    getComponent: ImPropTypes.func
}

function createActionLine(actionValue) {
    return <p className={actionValue.concat("-action")}>{actionValue}</p>
}

export default AvaliableActionsModel
