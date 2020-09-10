/**
 * Copyright 2020 Rech Informática LTDA
 *
 * Copyright 2020 SmartBear Software Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 *
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * This file has been modified by Rech Informática LTDA to translate the content displayed to users.
 */

import React from "react"
import PropTypes from "prop-types"

export const OperationExt = ({ extensions, getComponent }) => {
    let OperationExtRow = getComponent("OperationExtRow")
    return (
      <div className="opblock-section">
        <div className="opblock-section-header">
          <h4>Extensões</h4>
        </div>
        <div className="table-container">

          <table>
            <thead>
              <tr>
                <td className="col_header">Campo</td>
                <td className="col_header">Valor</td>
              </tr>
            </thead>
            <tbody>
                {
                    extensions.entrySeq().map(([k, v]) => <OperationExtRow key={`${k}-${v}`} xKey={k} xVal={v} />)
                }
            </tbody>
          </table>
        </div>
      </div>
    )
}
OperationExt.propTypes = {
  extensions: PropTypes.object.isRequired,
  getComponent: PropTypes.func.isRequired
}

export default OperationExt
