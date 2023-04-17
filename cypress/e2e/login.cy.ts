describe("Login page", () => {
  it("should login successfully as user", () => {
    cy.visit("/login");

    cy.get("#username").type(Cypress.env("USERNAME"));
    cy.get("#password").type(Cypress.env("PASSWORD"));

    cy.contains("button", "Log in").click();

    cy.url().should("match", /\/$/);
    cy.contains("Home").should("be.visible");
  });

  it("should show error message after entering wrong credentials", () => {
    cy.visit("/login");

    cy.get("#username").type("dough");
    cy.get("#password").type("hunter2");

    cy.contains("button", "Log in").click();

    cy.url().should("match", /\/login$/);
    cy.contains("Wrong username or password.").should("be.visible");
  });

  it("should redirect to login page if accessing protected routes", () => {
    cy.visit("/new");

    cy.url().should("match", /\/login$/);
    cy.contains("Log in").should("be.visible");
  });
});

export {};
