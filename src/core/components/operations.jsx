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
import Im from "immutable"

const SWAGGER2_OPERATION_METHODS = [
  "get", "put", "post", "delete", "options", "head", "patch"
]

const OAS3_OPERATION_METHODS = SWAGGER2_OPERATION_METHODS.concat(["trace"])


export default class Operations extends React.Component {

  static propTypes = {
    specSelectors: PropTypes.object.isRequired,
    specActions: PropTypes.object.isRequired,
    oas3Actions: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired,
    oas3Selectors: PropTypes.func.isRequired,
    layoutSelectors: PropTypes.object.isRequired,
    layoutActions: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired,
    authSelectors: PropTypes.object.isRequired,
    getConfigs: PropTypes.func.isRequired,
    fn: PropTypes.func.isRequired
  };

  render() {
    let {
      specSelectors,
      getComponent,
      oas3Selectors,
      layoutSelectors,
      layoutActions,
      getConfigs,
      fn
    } = this.props

    let taggedOps = specSelectors.taggedOperations()

    const OperationContainer = getComponent("OperationContainer", true)
    const OperationTag = getComponent("OperationTag")

    let {
      maxDisplayedTags,
    } = getConfigs()

    let filter = layoutSelectors.currentFilter()

    if (filter) {
      if (filter !== true) {
        taggedOps = fn.opsFilter(taggedOps, filter)
      }
    }

    if (maxDisplayedTags && !isNaN(maxDisplayedTags) && maxDisplayedTags >= 0) {
      taggedOps = taggedOps.slice(0, maxDisplayedTags)
    }

    return (
        <div>
          {
            taggedOps.map( (tagObj, tag) => {
              const operations = tagObj.get("operations")
              return (
                <OperationTag
                  key={"operation-" + tag}
                  tagObj={tagObj}
                  tag={tag}
                  oas3Selectors={oas3Selectors}
                  layoutSelectors={layoutSelectors}
                  layoutActions={layoutActions}
                  getConfigs={getConfigs}
                  getComponent={getComponent}
                  specUrl={specSelectors.url()}>
                  {
                    operations.map( op => {
                      const path = op.get("path")
                      const method = op.get("method")
                      const specPath = Im.List(["paths", path, method])


                      // FIXME: (someday) this logic should probably be in a selector,
                      // but doing so would require further opening up
                      // selectors to the plugin system, to allow for dynamic
                      // overriding of low-level selectors that other selectors
                      // rely on. --KS, 12/17
                      const validMethods = specSelectors.isOAS3() ?
                            OAS3_OPERATION_METHODS : SWAGGER2_OPERATION_METHODS

                      if(validMethods.indexOf(method) === -1) {
                        return null
                      }

                      return <OperationContainer
                                 key={`${path}-${method}`}
                                 specPath={specPath}
                                 op={op}
                                 path={path}
                                 method={method}
                                 tag={tag}
                                 />
                    }).toArray()
                  }


                </OperationTag>
              )
            }).toArray()
          }

          { taggedOps.size < 1 ? <h3> Sem operações definidas na especificação! </h3> : null }
        </div>
    )
  }

}

Operations.propTypes = {
  layoutActions: PropTypes.object.isRequired,
  specSelectors: PropTypes.object.isRequired,
  specActions: PropTypes.object.isRequired,
  layoutSelectors: PropTypes.object.isRequired,
  getComponent: PropTypes.func.isRequired,
  fn: PropTypes.object.isRequired
}
