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
    definitions: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired,
    authSelectors: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired,
    specSelectors: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context)

    this.state = {}
  }

  onAuthChange = (auth) => {
    let { name } = auth

    this.setState({ [name]: auth })
  }

  submitAuth = (e) => {
    e.preventDefault()

    let { authActions } = this.props
    authActions.authorize(this.state)
  }

  logoutClick = (e) => {
    e.preventDefault()

    let { authActions, definitions } = this.props
    let auths = definitions.map((val, key) => {
      return key
    }).toArray()

    this.setState(auths.reduce((prev, auth) => {
      prev[auth] = ""
      return prev
    }, {}))

    authActions.logout(auths)
  }

  close = (e) => {
    e.preventDefault()
    let { authActions } = this.props

    authActions.showDefinitions(false)
  }

  render() {
    let { definitions, getComponent, authSelectors, errSelectors } = this.props
    const AuthItem = getComponent("AuthItem")
    const Oauth2 = getComponent("oauth2", true)
    const Button = getComponent("Button")

    let authorized = authSelectors.authorized()

    let authorizedAuth = definitions.filter((definition, key) => {
      return !!authorized.get(key)
    })

    let nonOauthDefinitions = definitions.filter(schema => schema.get("type") !== "oauth2")
    let oauthDefinitions = definitions.filter(schema => schema.get("type") === "oauth2")

    return (
      <div className="auth-container">
        {
          !!nonOauthDefinitions.size && <form onSubmit={this.submitAuth}>
            {
              nonOauthDefinitions.map((schema, name) => {
                return <AuthItem
                  key={name}
                  schema={schema}
                  name={name}
                  getComponent={getComponent}
                  onAuthChange={this.onAuthChange}
                  authorized={authorized}
                  errSelectors={errSelectors}
                />
              }).toArray()
            }
            <div className="auth-btn-wrapper">
              {
                nonOauthDefinitions.size === authorizedAuth.size ? <Button className="btn modal-btn auth" onClick={this.logoutClick}>Logout</Button>
                  : <Button type="submit" className="btn modal-btn auth authorize">Autenticar</Button>
              }
              <Button className="btn modal-btn auth btn-done" onClick={this.close}>Fechar</Button>
            </div>
          </form>
        }

        {
          oauthDefinitions && oauthDefinitions.size ? <div>
            <div className="scope-def">
              <p>Os escopos são usados para conceder a um aplicativo diferentes níveis de acesso aos dados em nome do usuário fina. Cada API deve declarar um ou mais escopos.</p>
              <p>A API exige os seguintes escopos. Selecione qual você deseja usar.</p>
            </div>
            {
              definitions.filter(schema => schema.get("type") === "oauth2")
                .map((schema, name) => {
                  return (<div key={name}>
                    <Oauth2 authorized={authorized}
                      schema={schema}
                      name={name} />
                  </div>)
                }
                ).toArray()
            }
          </div> : null
        }

      </div>
    )
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
