describe("Order page", () => {
  const TABLE_NO = 5;
  const SIZE = "X-Large";
  const CRUST = "Cheese";
  const FLAVORS = ["Red", "Pepper", "Bacon"];

  const ORDER =
    `Size: ${SIZE}` + `Crust: ${CRUST}` + `Flavor: ${FLAVORS.join(", ")}`;

  before(() => {
    cy.intercept("Delete", "api/orders/*").as("deleteOrder");
  });

  it("should order pizzas and list them successfully", () => {
    cy.visit("/");

    cy.get("#username").type(Cypress.env("USERNAME"));
    cy.get("#password").type(Cypress.env("PASSWORD"));
    cy.contains("button", "Log in").click();

    cy.contains("New Order").click();
    cy.contains(`#${TABLE_NO}`).click();
    cy.contains("button", `Create order for table #${TABLE_NO}`).click();

    for (const item of [SIZE, CRUST, ...FLAVORS]) {
      cy.contains(item).click();
    }

    cy.contains(`1.${ORDER}`).should("be.visible");
    cy.contains("button", "Submit").click();

    cy.contains("Successfully sent the order to the Pizza API.").should(
      "be.visible"
    );

    cy.contains("List Orders").click();
    cy.get("input[placeholder='Search']").type(FLAVORS.join(", "));
    cy.contains(`# Orders shown: 1 out of`).should("be.visible");

    cy.contains('[data-testid="list-item"]', FLAVORS.join(", ")).within(
      ($item) => {
        cy.wrap($item)
          .get('[data-testid="list-item-orderId"]')
          .invoke("text")
          .then((orderId) => {
            cy.wrap($item).get('button[aria-label="Delete Order"]').click();
            cy.root()
              .closest("body")
              .contains(`Are you sure you want to delete order ${orderId}?`)
              .should("be.visible");

            cy.root().closest("body").contains("button", "Delete").click();
          });
      }
    );
    cy.wait("@deleteOrder");

    cy.contains("Order deleted").should("be.visible");

    cy.contains(`# Orders shown: 0 out of`).should("be.visible");
  });
});

export {};
