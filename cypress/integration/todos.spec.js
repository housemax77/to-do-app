/// <reference types="cypress" />
function addToDos() {
  cy.get("#toDo").type("Blah");
  cy.findByLabelText("To Do Time").type("17:30");
  cy.findByRole("button", { name: "Add To Do" }).click();
  cy.get("#toDo").type("Blahhh");
  cy.findByLabelText("To Do Time").type("17:29");
  cy.findByRole("button", { name: "Add To Do" }).click();
}
context("To do app", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:8080/");
  });

  it("should display right text for heading", () => {
    expect(cy.get("#heading".valueOf("To Do List")));
  });

  it("should support adding a todo", () => {
    cy.get("#toDo").type("Blahh");
    cy.findByLabelText("To Do Time").type("17:32");
    cy.findByRole("button", { name: "Add To Do" }).click();
    cy.get("#li-0").should("exist");
  });

  it("should support sorting by time", () => {
    addToDos();
    cy.get("#timeSortButton-").click({ force: true });
    cy.get("#Blahhh-checkbox-0").should("exist");
  });

  it("should support sorting alphabetically", () => {
    addToDos();
    cy.get("#toDo").type("Bla");
    cy.findByLabelText("To Do Time").type("17:33");
    cy.findByRole("button", { name: "Add To Do" }).click();
    cy.get("#li-0").should("exist");
    cy.get("#alphabeticalSortButton-").click({ force: true });
    cy.get("#Bla-checkbox-0").should("exist");
  });

  it("should support deleting todo", () => {
    addToDos();
    cy.get("#Blahhh-delete").click();
    cy.on("window:confirm", () => true);
    cy.get("#li-1").should("not.exist");
  });

  it("should support canceling deleting todo", () => {
    addToDos();
    cy.get("#Blahhh-delete").click();
    cy.on("window:confirm", () => false);
    cy.get("#li-1").should("exist");
  });

  it("should support marking as done", () => {
    addToDos();
    cy.get("#Blahhh-checkbox-1").click();
    cy.get("#li-1").should("have.class", "checked");
  });

  it("should support editing todos", () => {
    addToDos();
    cy.get("#toDo-1").click();
    cy.get("#toDo2-1").type("h");
    cy.get("#enterButton-1").click();
    expect(cy.get("#toDo-1".valueOf("Blahhhh")));
  });

  it("should support editing times", () => {
    addToDos();
    cy.get("#time-1").click();
    cy.get("#time2-1").type("17:22");
    cy.get("#enterButton-1").click();
    expect(cy.get("#time-1".valueOf("17:22")));
  });

  it("should support searching todos", () => {
    addToDos();
    cy.get("#searchToDo").type("Blahhh");
    expect(cy.get("#searchToDo".valueOf("#li-1".text)));
  });
});
