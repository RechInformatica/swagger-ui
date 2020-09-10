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
 * This file has been modified by Rech Informática LTDA to make it possible not to display the file search field.
 */

import React from "react"
import PropTypes from "prop-types"

export default class InfoContainer extends React.Component {

  static propTypes = {
    specActions: PropTypes.object.isRequired,
    specSelectors: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired,
    oas3Selectors: PropTypes.func.isRequired,
  }

  render () {
    const {specSelectors, getComponent, oas3Selectors} = this.props

    const info = specSelectors.info()
    const url = specSelectors.url()
    const basePath = specSelectors.basePath()
    const host = specSelectors.host()
    const externalDocs = specSelectors.externalDocs()
    const selectedServer = oas3Selectors.selectedServer()

    const Info = getComponent("info")

    return (
      <div>
        {info && info.count() ? (
          <Info info={info} url={url} host={host} basePath={basePath} externalDocs={externalDocs}
                getComponent={getComponent} selectedServer={selectedServer} showUrl={false} />
        ) : null}
      </div>
    )
  }
}
