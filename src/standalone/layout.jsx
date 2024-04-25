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
 * This file was modified by Rech Informática LTDA to allow informing a standard path for the topbar logo.
*/

import React from "react"
import PropTypes from "prop-types"

export default class StandaloneLayout extends React.Component {

  static propTypes = {
    errSelectors: PropTypes.object.isRequired,
    errActions: PropTypes.object.isRequired,
    specActions: PropTypes.object.isRequired,
    specSelectors: PropTypes.object.isRequired,
    layoutSelectors: PropTypes.object.isRequired,
    layoutActions: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired
  }

  render() {
    let { getComponent } = this.props

    let Container = getComponent("Container")
    let Row = getComponent("Row")
    let Col = getComponent("Col")

    const Topbar = getComponent("Topbar", true)
    const BaseLayout = getComponent("BaseLayout", true)
    const OnlineValidatorBadge = getComponent("onlineValidatorBadge", true)


    return (

      <Container className='swagger-ui'>
        {Topbar ? <Topbar logoHref="/api-docs" logoUrl="/api-docs-logo.svg" /> : null}
        <BaseLayout />
        <Row>
          <Col>
            <OnlineValidatorBadge />
          </Col>
        </Row>
      </Container>
    )
  }

}
