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

export default class AuthorizeOperationBtn extends React.Component {
    static propTypes = {
      isAuthorized: PropTypes.bool.isRequired,
      onClick: PropTypes.func
    }

  onClick =(e) => {
    e.stopPropagation()
    let { onClick } = this.props

    if(onClick) {
      onClick()
    }
  }

  render() {
    let { isAuthorized } = this.props

    return (
      <button className={isAuthorized ? "authorization__btn locked" : "authorization__btn unlocked"}
        aria-label={isAuthorized ? "botão de autorização travado" : "authorization button livre"}
        onClick={this.onClick}>
        <svg width="20" height="20">
          <use href={ isAuthorized ? "#locked" : "#unlocked" } xlinkHref={ isAuthorized ? "#locked" : "#unlocked" } />
        </svg>
      </button>

    )
  }
}
