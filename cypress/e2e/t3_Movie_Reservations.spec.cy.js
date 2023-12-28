
describe("BookTicket", () => {

   it("Should film", () => {
    cy.visit("http://qamid.tmweb.ru/admin/");
      cy.fixture("selector.json").then((selector) => {
      cy.fixture("login.json").then((loginAdm) => {
        cy.get(selector[1].login).type(loginAdm[0].login);
        cy.get(selector[2].pass).type(loginAdm[0].pass);        
      });
      cy.get(selector[0].loginButton).click();
    });
    
      cy.get("[draggable='true'][data-seance-id='192'] > .conf-step__seances-movie-title").then(($el) => $el.textContent).should('have.text','Зверополис');
      cy.get("[draggable='true'][data-seance-id='192'] > .conf-step__seances-movie-title").invoke('text').then((text) => {
        
        cy.visit("qamid.tmweb.ru");
        cy.fixture("selector.json").then((selector) => {   
        cy.get(":nth-child(1) > .movie__info > .movie__description > .movie__title").should('have.text', text);});
        cy.get(":nth-child(3) > .movie-seances__time").click();  
      });  
     cy.contains("Зал 1").should("be.visible");

     const seats = require('../fixtures/seats');
     seats.forEach((seat) => {
      cy.get(`.buying-scheme__wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`).click();
     })  
    cy.contains("Забронировать").click();
    cy.contains("Получить код бронирования").click();
    cy.contains("Покажите QR-код нашему контроллеру для подтверждения бронирования"
    ).should("be.visible");
  });
});
