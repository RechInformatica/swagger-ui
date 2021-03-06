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

export default class VersionPragmaFilter extends React.PureComponent {
  static propTypes = {
    isSwagger2: PropTypes.bool.isRequired,
    isOAS3: PropTypes.bool.isRequired,
    bypass: PropTypes.bool,
    alsoShow: PropTypes.element,
    children: PropTypes.any,
  }

  static defaultProps = {
    alsoShow: null,
    children: null,
    bypass: false,
  }

  render() {
    const { bypass, isSwagger2, isOAS3, alsoShow } = this.props

    if(bypass) {
      return <div>{ this.props.children }</div>
    }

    if(isSwagger2 && isOAS3) {
      return <div className="version-pragma">
        {alsoShow}
        <div className="version-pragma__message version-pragma__message--ambiguous">
          <div>
            <h3>Incapaz de processar esta definição</h3>
            <p>Campos do <code>swagger</code> e da <code>openapi</code> não podem estar presentes da mesma definição do Swagger ou OpenAPI. Por favor, remova um dos campos.</p>
            <p>Campos de versão suportados são <code>swagger: {"\"2.0\""}</code> e aqueles que combinam com <code>openapi: 3.0.n</code> (por exemplo, <code>openapi: 3.0.0</code>).</p>
          </div>
        </div>
      </div>
    }

    if(!isSwagger2 && !isOAS3) {
      return <div className="version-pragma">
        {alsoShow}
        <div className="version-pragma__message version-pragma__message--missing">
          <div>
            <h3>Incapaz de processar esta definição</h3>
            <p>A definição fornecida não especifica um campo de versão válido.</p>
            <p>Por favor, indique um campo de versão do Swagger ou OpenAPI válido. Campos suportados são <code>swagger: {"\"2.0\""}</code> e aqueles que combinam com <code>openapi: 3.0.n</code> (por exemplo, <code>openapi: 3.0.0</code>).</p>
          </div>
        </div>
      </div>
    }

    return <div>{ this.props.children }</div>
  }
}
