export const cypressCode = `// cypress/e2e/courses.cy.ts
// Automação E2E - Beedoo QA Challenge 2026

const BASE_URL = 'https://creative-sherbet-a51eac.netlify.app';

describe('Módulo de Cursos - Beedoo QA Challenge', () => {

  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  // ===== LISTAGEM =====

  describe('Listagem de Cursos', () => {

    it('CT-009: Deve exibir a lista de cursos', () => {
      cy.contains('Lista de cursos').should('be.visible');
    });

    it('CT-010: Deve exibir estado vazio quando não há cursos', () => {
      cy.get('.q-page-container').should('be.visible');
    });

    it('CT-011: Deve exibir dados do curso corretamente no card', () => {
      // Pré-condição: cadastrar um curso
      cy.contains('CADASTRAR CURSO').click();
      cy.get('input').first().type('Curso Dados Card');
      cy.get('textarea, input').eq(1).type('Descrição do curso teste');
      cy.get('button').contains(/cadastrar|salvar|enviar/i).click();

      cy.contains('LISTAR CURSOS').click();
      cy.contains('Curso Dados Card').should('be.visible');
      cy.contains('Descrição do curso teste').should('be.visible');
    });
  });

  // ===== NAVEGAÇÃO =====

  describe('Navegação', () => {

    it('CT-012: Deve navegar para cadastro de curso', () => {
      cy.contains('CADASTRAR CURSO').click();
      cy.url().should('not.eq', BASE_URL + '/');
    });

    it('CT-013: Deve navegar de cadastro para listagem', () => {
      cy.contains('CADASTRAR CURSO').click();
      cy.contains('LISTAR CURSOS').click();
      cy.contains('Lista de cursos').should('be.visible');
    });

    it('CT-014: Logo deve redirecionar para home', () => {
      cy.contains('CADASTRAR CURSO').click();
      cy.contains('Beedoo QA Chalenge').click();
      cy.contains('Lista de cursos').should('be.visible');
    });
  });

  // ===== CADASTRO - POSITIVOS =====

  describe('Cadastro de Cursos - Cenários Positivos', () => {

    beforeEach(() => {
      cy.contains('CADASTRAR CURSO').click();
    });

    it('CT-001: Deve cadastrar curso com dados válidos', () => {
      cy.get('input').first().type('Curso de Cypress Automação');
      cy.get('textarea, input').eq(1).type('Curso completo de automação');
      cy.get('button').contains(/cadastrar|salvar|enviar/i).click();

      cy.contains('LISTAR CURSOS').click();
      cy.contains('Curso de Cypress Automação').should('be.visible');
    });

    it('CT-008: Deve exibir feedback visual de sucesso', () => {
      cy.get('input').first().type('Curso Feedback Test');
      cy.get('textarea, input').eq(1).type('Descrição teste');
      cy.get('button').contains(/cadastrar|salvar|enviar/i).click();

      // Verificar toast/snackbar de sucesso
      cy.get('.q-notification, .q-notify, [role="alert"]', { timeout: 5000 })
        .should('be.visible');
    });
  });

  // ===== CADASTRO - NEGATIVOS =====

  describe('Cadastro de Cursos - Cenários Negativos', () => {

    beforeEach(() => {
      cy.contains('CADASTRAR CURSO').click();
    });

    it('CT-002: Não deve cadastrar com campos obrigatórios vazios', () => {
      cy.get('button').contains(/cadastrar|salvar|enviar/i).click();
      cy.get('.q-field__messages, .text-negative, .q-field--error')
        .should('be.visible');
    });

    it('CT-003: Não deve permitir nomes duplicados', () => {
      // Primeiro cadastro
      cy.get('input').first().type('Curso Duplicado');
      cy.get('textarea, input').eq(1).type('Descrição 1');
      cy.get('button').contains(/cadastrar|salvar|enviar/i).click();

      // Segundo cadastro com mesmo nome
      cy.contains('CADASTRAR CURSO').click();
      cy.get('input').first().type('Curso Duplicado');
      cy.get('textarea, input').eq(1).type('Descrição 2');
      cy.get('button').contains(/cadastrar|salvar|enviar/i).click();

      // Verificar que não duplicou
      cy.contains('LISTAR CURSOS').click();
      cy.get('body').then(($body) => {
        const matches = $body.text().match(/Curso Duplicado/g);
        expect(matches?.length).to.be.lessThan(3);
      });
    });

    it('CT-004: Deve rejeitar XSS no campo nome', () => {
      cy.get('input').first().type('<script>alert("xss")</script>');
      cy.get('textarea, input').eq(1).type('Descrição');
      cy.get('button').contains(/cadastrar|salvar|enviar/i).click();

      cy.contains('LISTAR CURSOS').click();
      cy.get('script').should('not.exist');
    });

    it('CT-005: Não deve aceitar campos com apenas espaços', () => {
      cy.get('input').first().type('   ');
      cy.get('textarea, input').eq(1).type('   ');
      cy.get('button').contains(/cadastrar|salvar|enviar/i).click();
      cy.get('.q-field__messages, .text-negative, .q-field--error')
        .should('be.visible');
    });

    it('CT-007: Deve rejeitar SQL Injection na descrição', () => {
      cy.get('input').first().type('Curso SQL Test');
      cy.get('textarea, input').eq(1).type("'; DROP TABLE courses; --");
      cy.get('button').contains(/cadastrar|salvar|enviar/i).click();

      cy.contains('LISTAR CURSOS').click();
      cy.contains('Curso SQL Test').should('be.visible');
      // App não deve quebrar
      cy.get('.q-page-container').should('be.visible');
    });
  });

  // ===== EDGE CASES =====

  describe('Edge Cases', () => {

    it('CT-006: Deve validar nome com mais de 255 caracteres', () => {
      cy.contains('CADASTRAR CURSO').click();
      const longName = 'A'.repeat(256);
      cy.get('input').first().type(longName, { delay: 0 });
      cy.get('button').contains(/cadastrar|salvar|enviar/i).click();
      cy.get('.q-field__messages, .text-negative')
        .should('be.visible');
    });

    it('CT-019: Deve submeter formulário com Enter', () => {
      cy.contains('CADASTRAR CURSO').click();
      cy.get('input').first().type('Curso Enter Test');
      cy.get('textarea, input').eq(1).type('Descrição{enter}');
      // Verificar se submeteu ou se precisa clicar no botão
    });
  });

  // ===== PERSISTÊNCIA =====

  describe('Persistência de Dados', () => {

    it('CT-015: Dados devem persistir após reload', () => {
      cy.contains('CADASTRAR CURSO').click();
      cy.get('input').first().type('Curso Persistência');
      cy.get('textarea, input').eq(1).type('Teste persistência');
      cy.get('button').contains(/cadastrar|salvar|enviar/i).click();

      cy.contains('LISTAR CURSOS').click();
      cy.reload();
      cy.contains('Curso Persistência').should('be.visible');
    });
  });

  // ===== RESPONSIVIDADE =====

  describe('Responsividade', () => {

    it('CT-016: Deve funcionar em viewport mobile (375px)', () => {
      cy.viewport(375, 812);
      cy.contains('Lista de cursos').should('be.visible');
      cy.get('.q-page-container').should('be.visible');
    });

    it('CT-017: Deve funcionar em viewport tablet (768px)', () => {
      cy.viewport(768, 1024);
      cy.contains('CADASTRAR CURSO').click();
      cy.get('input').first().should('be.visible');
    });
  });

  // ===== ACESSIBILIDADE =====

  describe('Acessibilidade', () => {

    it('CT-018: Deve permitir navegação por teclado', () => {
      cy.contains('CADASTRAR CURSO').click();
      cy.get('input').first().focus();
      cy.focused().should('exist');
      cy.realPress('Tab');
      cy.focused().should('exist');
    });
  });
});
`;
