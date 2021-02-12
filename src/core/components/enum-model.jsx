import React from "react"
import ImPropTypes from "react-immutable-proptypes"

const EnumModel = ({ value, getComponent }) => {
  let ModelCollapse = getComponent("ModelCollapse")
  let collapsedContent = <span>Enumerados [ {value.count()} ]<br/></span>
  return <span className="prop-enum">
    Enum:<br />
    <ModelCollapse collapsedContent={collapsedContent}>
      {value.map(enumValue => createEnumLine(enumValue))}
    </ModelCollapse><br/>
  </span>
}
EnumModel.propTypes = {
  value: ImPropTypes.iterable,
  getComponent: ImPropTypes.func
}

function createEnumLine(enumValue) {
  return <p style={{ paddingLeft: "50px" }}>{enumValue}</p>
}

export default EnumModel
