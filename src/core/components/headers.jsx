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
import Im from "immutable"

const propClass = "header-example"

export default class Headers extends React.Component {
  static propTypes = {
    headers: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired
  };

  render() {
    let { headers, getComponent } = this.props

    const Property = getComponent("Property")
    const Markdown = getComponent("Markdown", true)

    if ( !headers || !headers.size )
      return null

      return (
      <div className="headers-wrapper">
        <h4 className="headers__title">Headers:</h4>
        <table className="headers">
          <thead>
            <tr className="header-row">
              <th className="header-col">Nome</th>
              <th className="header-col">Descrição</th>
              <th className="header-col">Tipo</th>
            </tr>
          </thead>
          <tbody>
          {
            headers.entrySeq().map( ([ key, header ]) => {
              if(!Im.Map.isMap(header)) {
                return null
              }

              const description = header.get("description")
              const type = header.getIn(["schema"]) ? header.getIn(["schema", "type"]) : header.getIn(["type"])
              const schemaExample = header.getIn(["schema", "example"])

              return (<tr key={ key }>
                <td className="header-col">{ key }</td>
                <td className="header-col">{
                  !description ? null : <Markdown source={ description } />
                }</td>
                <td className="header-col">{ type } { schemaExample ? <Property propKey={ "Example" } propVal={ schemaExample } propClass={ propClass } /> : null }</td>
              </tr>)
            }).toArray()
          }
          </tbody>
        </table>
      </div>
    )
  }
}
