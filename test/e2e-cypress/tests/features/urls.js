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
 * This file has been modified by Rech Informática LTDA to avoid errors in tests.
 */

describe("configuration options: `urls` and `urls.primaryName`", () => {
  describe("`urls` only", () => {
    it("should render the first URL in the list", () => {
      cy.visit("/?configUrl=/configs/urls.yaml")
        .get("h2.title")
        .should("have.text", "One")
        .window()
        .then(win => win.ui.specSelectors.url())
        .should("equal", "/documents/features/urls/1.yaml")
    })
  })
})
