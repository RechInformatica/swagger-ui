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
