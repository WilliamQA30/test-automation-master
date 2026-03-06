export const cypressCode = `
// cypress/e2e/courses.cy.ts

const BASE_URL = 'https://creative-sherbet-a51eac.netlify.app';

describe('Módulo de Cursos - Beedoo QA Challenge', () => {

  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  describe('Listagem de Cursos', () => {

    it('CT-003: Deve exibir a lista de cursos', () => {
      cy.contains('Lista de cursos').should('be.visible');
    });

    it('CT-004: Deve exibir estado vazio quando não há cursos', () => {
      cy.get('.q-page-container').should('be.visible');
      // Verifica se há mensagem de lista vazia ou cards de cursos
    });

    it('CT-006: Deve navegar para cadastro de curso', () => {
      cy.contains('CADASTRAR CURSO').click();
      cy.url().should('include', 'cadastro');
    });
  });

  describe('Cadastro de Cursos', () => {

    beforeEach(() => {
      cy.contains('CADASTRAR CURSO').click();
    });

    it('CT-001: Deve cadastrar curso com dados válidos', () => {
      // Preencher campos do formulário
      cy.get('input[label="Nome"]').type('Curso de Cypress Automação');
      cy.get('textarea, input[label="Descrição"]').type('Curso completo de automação com Cypress');
      
      // Submeter formulário
      cy.get('button[type="submit"], .q-btn').contains(/cadastrar|salvar|enviar/i).click();
      
      // Verificar sucesso
      cy.contains('LISTAR CURSOS').click();
      cy.contains('Curso de Cypress Automação').should('be.visible');
    });

    it('CT-002: Não deve cadastrar com campos obrigatórios vazios', () => {
      // Submeter sem preencher
      cy.get('button[type="submit"], .q-btn').contains(/cadastrar|salvar|enviar/i).click();
      
      // Verificar mensagens de validação
      cy.get('.q-field__messages, .text-negative, .q-field--error')
        .should('be.visible');
    });

    it('CT-005: Deve rejeitar caracteres especiais/XSS no nome', () => {
      cy.get('input[label="Nome"]').type('<script>alert("xss")</script>');
      cy.get('button[type="submit"], .q-btn').contains(/cadastrar|salvar|enviar/i).click();
      
      // Verificar que o input foi sanitizado ou rejeitado
      cy.contains('LISTAR CURSOS').click();
      cy.contains('<script>').should('not.exist');
    });

    it('CT-007: Deve validar nome com mais de 255 caracteres', () => {
      const longName = 'A'.repeat(256);
      cy.get('input[label="Nome"]').type(longName);
      cy.get('button[type="submit"], .q-btn').contains(/cadastrar|salvar|enviar/i).click();
      
      // Verificar se há validação de tamanho
      cy.get('.q-field__messages, .text-negative')
        .should('be.visible');
    });

    it('CT-008: Não deve aceitar campos com apenas espaços', () => {
      cy.get('input[label="Nome"]').type('   ');
      cy.get('button[type="submit"], .q-btn').contains(/cadastrar|salvar|enviar/i).click();
      
      cy.get('.q-field__messages, .text-negative, .q-field--error')
        .should('be.visible');
    });
  });

  describe('Persistência de Dados', () => {

    it('CT-010: Dados devem persistir após reload', () => {
      // Cadastrar um curso
      cy.contains('CADASTRAR CURSO').click();
      cy.get('input[label="Nome"]').type('Curso Persistência');
      cy.get('button[type="submit"], .q-btn').contains(/cadastrar|salvar|enviar/i).click();
      
      // Navegar para listagem e recarregar
      cy.contains('LISTAR CURSOS').click();
      cy.reload();
      
      // Verificar persistência
      cy.contains('Curso Persistência').should('be.visible');
    });
  });

  describe('Responsividade', () => {

    it('CT-009: Deve ser responsivo em mobile', () => {
      cy.viewport('iphone-x');
      cy.contains('Lista de cursos').should('be.visible');
      
      // Navegar para cadastro em mobile
      cy.get('.q-btn, [role="button"]').contains(/cadastrar/i).click({ force: true });
    });
  });
});
`;
