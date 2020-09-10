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
import cx from "classnames"
import PropTypes from "prop-types"


const noop = () => { }

const ParameterIncludeEmptyPropTypes = {
  isIncluded: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isIncludedOptions: PropTypes.object,
  onChange: PropTypes.func.isRequired,
}

const ParameterIncludeEmptyDefaultProps = {
  onChange: noop,
  isIncludedOptions: {},
}
export default class ParameterIncludeEmpty extends Component {
  static propTypes = ParameterIncludeEmptyPropTypes
  static defaultProps = ParameterIncludeEmptyDefaultProps

  componentDidMount() {
    const { isIncludedOptions, onChange } = this.props
    const { shouldDispatchInit, defaultValue } = isIncludedOptions
    if (shouldDispatchInit) {
      onChange(defaultValue)
    }
  }

  onCheckboxChange = e => {
    const { onChange } = this.props
    onChange(e.target.checked)
  }

  render() {
    let { isIncluded, isDisabled } = this.props

    return (
      <div>
        <label className={cx("parameter__empty_value_toggle", {
          "disabled": isDisabled
        })}>
          <input type="checkbox"
            disabled={isDisabled}
            checked={!isDisabled && isIncluded}
            onChange={this.onCheckboxChange} />
          Enviar valor vazio
        </label>
      </div>
    )
  }
}
