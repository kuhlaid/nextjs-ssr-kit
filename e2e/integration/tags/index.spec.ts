const selectTagCardOption = (option: string, item: number = 1): void => {
  cy.findByTestId("dropdown-container").eq(item).click();

  cy.findByTestId("dropdown-menu").within(() => {
    cy.get(`[data-testid='${option}']`).click();
  });
};

const clearTagAlerts = (): void => {
  cy.findByTestId("alert").click();

  cy.wait(1000);
};

context("Tags Page", () => {
  before(() => {
    cy.exec("npm run seed:prod");
  });

  beforeEach(() => {
    cy.visit("/tags");
    clearTagAlerts();
  });

  after(() => {
    cy.exec("npm run drop:prod");
  });

  it("displays the cards when data is present", () => {
    cy.findByTestId("seed-database").click();

    cy.findByTestId("card-container").should("have.length", 3);
  });

  it("deletes a tag card", () => {
    selectTagCardOption("delete");

    cy.findByTestId("card-container").should("have.length", 2);

    cy.alertExistsWith("Successfully deleted notjohnsson.");
  });

  it("displays an edit form", () => {
    selectTagCardOption("edit");

    cy.findByTestId("tag-form").should("exist");
  });

  it("renders errors if a required input is empty", () => {
    selectTagCardOption("edit");

    cy.findByTestId("tagName").clear();

    cy.findByTestId("submit").click();

    cy.findByTestId("errors").should("have.length", 1);
  });

  it("displays an error if an edited tagname matches a pre-existing tagname", () => {
    selectTagCardOption("edit");

    cy.findByTestId("tagName").clear().type("PHP");

    cy.findByTestId("submit").click();

    cy.alertExistsWith("That tagname is already in use!");
  });

  it("cancels updating the tag", () => {
    selectTagCardOption("edit");

    cy.findByTestId("cancel").click();

    cy.findByTestId("tag-form").should("not.exist");
  });

  it("updates a tag", () => {
    selectTagCardOption("edit");

    cy.findByTestId("tagName").clear().type("fruitloop");

    cy.findByTestId("submit").click();

    cy.alertExistsWith("Successfully updated fruitloop.");
  });

  it("displays a create tag form", () => {
    cy.findByTestId("open-modal").click();

    cy.findByTestId("tag-form").should("exist");
  });

  it("cancels creating a tag either by closing the modal or clicking the 'Cancel' button", () => {
    cy.findByTestId("open-modal").click();

    cy.findByTestId("tag-form").should("exist");

    cy.findByTestId("close-modal").click();

    cy.findByTestId("tag-form").should("not.exist");

    cy.findByTestId("open-modal").click();

    cy.findByTestId("tag-form").should("exist");

    cy.findByTestId("cancel").click();

    cy.findByTestId("tag-form").should("not.exist");
  });

  it("displays errors when attempting to submit a form with empty fields", () => {
    cy.findByTestId("open-modal").click();

    cy.findByTestId("submit").click();

    cy.findByTestId("errors").should("have.length", 9);
  });

  it("displays an error if trying to create a tag that already exists", () => {
    cy.findByTestId("open-modal").click();
    [
      "tagName",
      "category"
    ].forEach(name => {
      let value = "NodeJs";
      if (name === "tagName") value = "PHP";
      cy.findByTestId(name).type(value);
    });

    cy.findByTestId("submit").click();

    cy.alertExistsWith("That tagname is already in use!");
  });

  it("creates a new tag", () => {
    cy.findByTestId("open-modal").click();
    [
      "tagName",
      "category"
    ].forEach(name => {
      cy.findByTestId(name).type("NodeJs");
    });

    cy.findByTestId("submit").click();

    cy.alertExistsWith("Successfully created NodeJs.");
  });

  it("when the 'Go Back' link is pressed, it navigates to home", () => {
    cy.findByTestId("link").click();

    cy.url().should("contain", "/");

    cy.findByTestId("home-page").should("exist");
  });
});
