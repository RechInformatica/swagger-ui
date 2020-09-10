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

import React, { Component } from "react"
import PropTypes from "prop-types"

export default class Clear extends Component {

  onClick =() => {
    let { specActions, path, method } = this.props
    specActions.clearResponse( path, method )
    specActions.clearRequest( path, method )
  }

  render(){
    return (
      <button className="btn btn-clear opblock-control__btn" onClick={ this.onClick }>
        Limpar
      </button>
    )
  }

  static propTypes = {
    specActions: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
  }
}
