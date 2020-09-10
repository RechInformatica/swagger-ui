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

/**
 * @prettier
 */

import React from "react"
import PropTypes from "prop-types"
import ImPropTypes from "react-immutable-proptypes"
import { stringify } from "core/utils"

export default function Example(props) {
  const { example, showValue, getComponent } = props

  const Markdown = getComponent("Markdown", true)
  const HighlightCode = getComponent("highlightCode")

  if(!example) return null

  return (
    <div className="example">
      {example.get("description") ? (
        <section className="example__section">
          <div className="example__section-header">Exemplo de descrição</div>
          <p>
            <Markdown source={example.get("description")} />
          </p>
        </section>
      ) : null}
      {showValue && example.has("value") ? (
        <section className="example__section">
          <div className="example__section-header">Exemplo de valor</div>
          <HighlightCode value={stringify(example.get("value"))} />
        </section>
      ) : null}
    </div>
  )
}

Example.propTypes = {
  example: ImPropTypes.map.isRequired,
  showValue: PropTypes.bool,
  getComponent: PropTypes.func.isRequired,
}
