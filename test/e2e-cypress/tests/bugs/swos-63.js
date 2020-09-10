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
 * This file has been modified by Rech Informática LTDA for the test results to be suitable for content translation.
 */

describe("SWOS-63: Schema/Model labeling", () => {
  describe("SchemaS/Models section", () => {
    it("should render `Esquemas` for OpenAPI 3", () => {
      cy
        .visit("/?url=/documents/petstore-expanded.openapi.yaml")
        .get("section.models > h4")
        .contains("Esquemas")
    })
    it("should render `Models` for OpenAPI 2", () => {
      cy
        .visit("/?url=/documents/petstore.swagger.yaml")
        .get("section.models > h4")
        .contains("Models")
    })
  })
  describe("ModelExample within Operation", () => {
    it("should render `Esquemas` for OpenAPI 3", () => {
      cy
        .visit("/?url=/documents/petstore-expanded.openapi.yaml")
        .get("#operations-default-findPets")
        .click()
        .get("a.tablinks[data-name=model]")
        .contains("Esquema")
    })
    it("should render `Models` for OpenAPI 2", () => {
      cy
        .visit("/?url=/documents/petstore.swagger.yaml")
        .get("section.models > h4")
        .get("#operations-pet-addPet")
        .click()
        .get("a.tablinks[data-name=model]")
        .contains("Model")
    })
  })
})
