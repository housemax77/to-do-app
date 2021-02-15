/// <reference types="cypress" />
function addToDos() {
  addToDo("Blah", "17:30");
  addToDo("Blahhh", "17:29");
}

function addToDo(toDo, time) {
  cy.findByPlaceholderText("To Do").type(toDo);
  cy.findByLabelText("To Do Time").type(time);
  cy.findByRole("button", { name: "Add To Do" }).click();
}

context("To do app", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:8080/");
  });

  it("should display right text for heading", () => {
    expect(cy.findByLabelText("Page Heading".valueOf("To Do List")));
  });

  it("should support sorting by time", () => {
    addToDos();
    cy.findByLabelText("Sort By Time").click({ force: true });
    cy.findByLabelText("Check Blahhh At Index 0 As Done").should("exist");
  });

  it("should support sorting alphabetically", () => {
    addToDo("Bla", "17:20");
    cy.findByLabelText("Sort Alphabeticlly").click({ force: true });
    cy.findByLabelText("Bla Li Index 0").should("exist");
  });

  it("should support deleting todo", () => {
    addToDos();
    cy.findByLabelText("Delete Blahhh To Do").click();
    cy.on("window:confirm", () => true);
    cy.findByLabelText("Blahhh Li Index 1").should("not.exist");
  });

  it("should support canceling deleting todo", () => {
    addToDos();
    cy.findByLabelText("Delete Blahhh To Do").click();
    cy.on("window:confirm", () => false);
    cy.findByLabelText("Blahhh Li Index 1").should("exist");
  });

  it("should support marking as done", () => {
    addToDos();
    cy.findByLabelText("Check Blahhh At Index 1 As Done").click();
    cy.findByLabelText("Blahhh Li Index 1").should("have.class", "checked");
  });

  it("should support editing todos", () => {
    addToDos();
    cy.findByText("Blahhh").click();
    cy.findByLabelText("Enter New Text For Blahhh Here").type("h");
    cy.findByRole("button", { name: "Confirm Text Value" }).click();
    cy.findByText("Blahhhh").should("exist");
  });

  it("should support editing times", () => {
    addToDos();
    cy.findByText("17:29").click();
    cy.findByLabelText("Enter New Time For 17:29 Here").type("17:22");
    cy.findByRole("button", { name: "Confirm Text Value" }).click();
    cy.findByText("17:22").should("exist");
  });

  it("should support searching todos", () => {
    addToDos();
    cy.findByLabelText("Text To Search To Do").type("Blahhh");
    expect(
      cy.findByLabelText(
        "Text To Search To Do".valueOf("Blahhh Li Index 1".text)
      )
    );
  });
});
