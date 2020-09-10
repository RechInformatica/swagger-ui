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

export default class TryItOutButton extends React.Component {

  static propTypes = {
    onTryoutClick: PropTypes.func,
    onCancelClick: PropTypes.func,
    enabled: PropTypes.bool, // Try it out is enabled, ie: the user has access to the form
  };

  static defaultProps = {
    onTryoutClick: Function.prototype,
    onCancelClick: Function.prototype,
    enabled: false,
  };

  render() {
    const { onTryoutClick, onCancelClick, enabled } = this.props

    return (
      <div className="try-out">
        {
          enabled ? <button className="btn try-out__btn cancel" onClick={ onCancelClick }>Cancelar</button>
                  : <button className="btn try-out__btn" onClick={ onTryoutClick }>Simular </button>
        }
      </div>
    )
  }
}
