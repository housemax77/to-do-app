/// <reference types="cypress" />

context("To do app", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:8080/");
    cy.get("#toDo").type("Blah");
    cy.get("#time").type("17:30");
    cy.get("#myCheck").click();
    cy.get("#toDo").type("Blahhh");
    cy.get("#time").type("17:29");
    cy.get("#myCheck").click();
  });

  it("should display the heading", () => {
    cy.get("#heading").should("exist");
  });

  it("should support adding a todo", () => {
    cy.get("#toDo").type("Blah");
  });
  it("should support adding a time", () => {
    cy.get("#time").type("17:30");
  });
  it("should support clicking submit", () => {
    cy.get("#myCheck").click();
  });
  it("should add todo", () => {
    cy.get("#toDo").type("Blahh");
    cy.get("#time").type("17:32");
    cy.get("#myCheck").click();
    cy.get("#li-0").should("exist");
  });
  it("should support sorting by time", () => {
    cy.get("#timeSortButton-").click({ force: true });
    cy.get("#Blahhh-checkbox-0").should("exist");
  });
});
