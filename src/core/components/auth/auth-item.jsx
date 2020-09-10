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
import ImPropTypes from "react-immutable-proptypes"

export default class Auths extends React.Component {
  static propTypes = {
    schema: ImPropTypes.orderedMap.isRequired,
    name: PropTypes.string.isRequired,
    onAuthChange: PropTypes.func.isRequired,
    authorized: ImPropTypes.orderedMap.isRequired
  }

  render() {
    let {
      schema,
      name,
      getComponent,
      onAuthChange,
      authorized,
      errSelectors
    } = this.props
    const ApiKeyAuth = getComponent("apiKeyAuth")
    const BasicAuth = getComponent("basicAuth")

    let authEl

    const type = schema.get("type")

    switch(type) {
      case "apiKey": authEl = <ApiKeyAuth key={ name }
                                        schema={ schema }
                                        name={ name }
                                        errSelectors={ errSelectors }
                                        authorized={ authorized }
                                        getComponent={ getComponent }
                                        onChange={ onAuthChange } />
        break
      case "basic": authEl = <BasicAuth key={ name }
                                      schema={ schema }
                                      name={ name }
                                      errSelectors={ errSelectors }
                                      authorized={ authorized }
                                      getComponent={ getComponent }
                                      onChange={ onAuthChange } />
        break
      default: authEl = <div key={ name }>Tipo de definição de segurança desconhecida: { type }</div>
    }

    return (<div key={`${name}-jump`}>
      { authEl }
    </div>)
  }

  static propTypes = {
    errSelectors: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired,
    authSelectors: PropTypes.object.isRequired,
    specSelectors: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired,
    definitions: ImPropTypes.iterable.isRequired
  }
}
