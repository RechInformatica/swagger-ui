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

export default class Schemes extends React.Component {

  static propTypes = {
    specActions: PropTypes.object.isRequired,
    schemes: PropTypes.object.isRequired,
    currentScheme: PropTypes.string.isRequired,
    path: PropTypes.string,
    method: PropTypes.string,
  }

  componentWillMount() {
    let { schemes } = this.props

    //fire 'change' event to set default 'value' of select
    this.setScheme(schemes.first())
  }

  componentWillReceiveProps(nextProps) {
    if ( !this.props.currentScheme || !nextProps.schemes.includes(this.props.currentScheme) ) {
      // if we don't have a selected currentScheme or if our selected scheme is no longer an option,
      // then fire 'change' event and select the first scheme in the list of options
      this.setScheme(nextProps.schemes.first())
    }
  }

  onChange =( e ) => {
    this.setScheme( e.target.value )
  }

  setScheme = ( value ) => {
    let { path, method, specActions } = this.props

    specActions.setScheme( value, path, method )
  }

  render() {
    let { schemes, currentScheme } = this.props

    return (
      <label htmlFor="schemes">
        <span className="schemes-title">Esquemas</span>
        <select onChange={ this.onChange } value={currentScheme}>
          { schemes.valueSeq().map(
            ( scheme ) => <option value={ scheme } key={ scheme }>{ scheme }</option>
          ).toArray()}
        </select>
      </label>
    )
  }
}
