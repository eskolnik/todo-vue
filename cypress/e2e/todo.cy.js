/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays two todo items by default', () => {
    cy.get('.todo-list li').should('have.length', 2)
    cy.get('.todo-list li').first().should('contain.text', 'Pay electric bill')
    cy.get('.todo-list li').last().should('contain.text', 'Walk the dog')
  })

  it('can add new todo items', () => {
    const newItem = 'Feed the cat'
    cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)

    cy.get('.todo-list li')
      .should('have.length', 3)
      .last()
      .should('contain.text', newItem)
  })

  it('can check off an item as completed', () => {
    cy.contains('Pay electric bill')
    .parent('li')
      .find('input[type=checkbox]')
      .check()

    cy.contains('Pay electric bill')
      .parent('li')
      .should('have.class', 'todo-item-completed')
  })

  context('with a checked task', () => {
    beforeEach(() => {
      cy.contains('Pay electric bill')
        .parent('li')
        .find('input[type=checkbox]')
        .check()
    })

    it('can display only active/incomplete tasks', () => {
      cy.contains('Active').click()

      cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .should('contain.text', 'Walk the dog')

      cy.contains('Pay electric bill').should('not.exist')
    })

    it('can display all tasks', () => {
      cy.contains('Active').click()

      cy.get('.todo-list li')
        .should('have.length', 1)

      cy.contains('All').click();

      cy.get('.todo-list li')
        .should('have.length', 2)
    })

    it('can delete all completed tasks', () => {
      cy.contains('Clear Completed').click()

      cy.get('.todo-list li')
        .should('have.length', 1)
        .should('not.have.text', 'Pay electric bill')

      cy.contains('Clear Completed').should('be.disabled')
    })
  })
})
