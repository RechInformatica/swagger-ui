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

export default class BasicAuth extends React.Component {
  static propTypes = {
    authorized: PropTypes.object,
    getComponent: PropTypes.func.isRequired,
    schema: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context)
    let { schema, name } = this.props

    let value = this.getValue()
    let username = value.username

    this.state = {
      name: name,
      schema: schema,
      value: !username ? {} : {
        username: username
      }
    }
  }

  getValue () {
    let { authorized, name } = this.props

    return authorized && authorized.getIn([name, "value"]) || {}
  }

  onChange =(e) => {
    let { onChange } = this.props
    let { value, name } = e.target

    let newValue = this.state.value
    newValue[name] = value

    this.setState({ value: newValue })

    onChange(this.state)
  }

  render() {
    let { schema, getComponent, name, errSelectors } = this.props
    const Input = getComponent("Input")
    const Row = getComponent("Row")
    const Col = getComponent("Col")
    const AuthError = getComponent("authError")
    const JumpToPath = getComponent("JumpToPath", true)
    const Markdown = getComponent("Markdown", true)
    let username = this.getValue().username
    let errors = errSelectors.allErrors().filter( err => err.get("authId") === name)

    return (
      <div>
        <h4>Autenticação básica<JumpToPath path={[ "securityDefinitions", name ]} /></h4>
        { username && <h6>Autenticado</h6> }
        <Row>
          <Markdown source={ schema.get("description") } />
        </Row>
        <Row>
          <label>Usuário:</label>
          {
            username ? <code> { username } </code>
                     : <Col><Input type="text" required="required" name="username" onChange={ this.onChange }/></Col>
          }
        </Row>
        <Row>
          <label>Senha:</label>
            {
              username ? <code> ****** </code>
                       : <Col><Input autoComplete="new-password"
                                     name="password"
                                     type="password"
                                     onChange={ this.onChange }/></Col>
            }
        </Row>
        {
          errors.valueSeq().map( (error, key) => {
            return <AuthError error={ error }
                              key={ key }/>
          } )
        }
      </div>
    )
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    errSelectors: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    schema: ImPropTypes.map,
    authorized: ImPropTypes.map
  }
}
