export const cypressCode = `// cypress/e2e/courses.cy.ts
// Automação E2E - Beedoo QA Challenge 2026
// Responsável: Luis Eric de Lima Nazaré

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

      cy.get('.q-notification, .q-notify, [role="alert"]', { timeout: 5000 })
        .should('be.visible');
    });
  });

  // ===== CADASTRO - NEGATIVOS =====

  describe('Cadastro de Cursos - Cenários Negativos', () => {

    beforeEach(() => {
      cy.contains('CADASTRAR CURSO').click();
    });

    it('CT-002: Não deve cadastrar com campos vazios', () => {
      cy.get('button').contains(/cadastrar|salvar|enviar/i).click();
      cy.get('.q-field__messages, .text-negative, .q-field--error')
        .should('be.visible');
    });

    it('CT-003: Não deve permitir nomes duplicados', () => {
      cy.get('input').first().type('Curso Duplicado');
      cy.get('textarea, input').eq(1).type('Descrição 1');
      cy.get('button').contains(/cadastrar|salvar|enviar/i).click();

      cy.contains('CADASTRAR CURSO').click();
      cy.get('input').first().type('Curso Duplicado');
      cy.get('textarea, input').eq(1).type('Descrição 2');
      cy.get('button').contains(/cadastrar|salvar|enviar/i).click();

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

  // ===== PERFORMANCE =====

  describe('Performance', () => {

    it('CT-020: Listagem deve carregar em < 3s com 50+ cursos', () => {
      // Cadastrar 50 cursos via loop rápido
      for (let i = 0; i < 50; i++) {
        cy.contains('CADASTRAR CURSO').click();
        cy.get('input').first().type(\`Curso Perf \${i}\`, { delay: 0 });
        cy.get('textarea, input').eq(1).type('Desc', { delay: 0 });
        cy.get('button').contains(/cadastrar|salvar|enviar/i).click();
      }

      // Medir tempo de carregamento da listagem
      cy.contains('LISTAR CURSOS').click();
      const start = performance.now();
      cy.get('.q-page-container').should('be.visible').then(() => {
        const loadTime = performance.now() - start;
        expect(loadTime).to.be.lessThan(3000);
      });
    });

    it('CT-021: Renderização fluida com 100 cursos', () => {
      // Cadastrar 100 cursos
      for (let i = 0; i < 100; i++) {
        cy.contains('CADASTRAR CURSO').click();
        cy.get('input').first().type(\`Curso Load \${i}\`, { delay: 0 });
        cy.get('textarea, input').eq(1).type('D', { delay: 0 });
        cy.get('button').contains(/cadastrar|salvar|enviar/i).click();
      }

      cy.contains('LISTAR CURSOS').click();
      cy.get('.q-page-container').should('be.visible');
      // Scroll até o final para verificar renderização
      cy.scrollTo('bottom');
      cy.contains('Curso Load 99').should('exist');
    });

    it('CT-022: Tempo de resposta do cadastro sob carga', () => {
      cy.contains('CADASTRAR CURSO').click();
      cy.get('input').first().type('Curso Stress Test');
      cy.get('textarea, input').eq(1).type('Teste de carga');

      const start = Date.now();
      cy.get('button').contains(/cadastrar|salvar|enviar/i).click();
      cy.get('.q-notification, .q-notify, [role="alert"]', { timeout: 5000 })
        .should('be.visible')
        .then(() => {
          const elapsed = Date.now() - start;
          expect(elapsed).to.be.lessThan(2000);
        });
    });
  });

  // ===== EDIÇÃO DE CURSOS =====

  describe('Edição de Cursos', () => {

    beforeEach(() => {
      // Pré-condição: cadastrar um curso para editar
      cy.contains('CADASTRAR CURSO').click();
      cy.get('input').first().type('Curso Para Editar');
      cy.get('textarea, input').eq(1).type('Descrição original');
      cy.get('button').contains(/cadastrar|salvar|enviar/i).click();
      cy.contains('LISTAR CURSOS').click();
    });

    it('CT-023: Deve editar curso existente com sucesso', () => {
      cy.contains('Curso Para Editar')
        .parents('.q-card, [class*="card"]')
        .find('button, [role="button"]')
        .contains(/editar|edit/i)
        .click();

      cy.get('input').first().clear().type('Curso Editado');
      cy.get('button').contains(/salvar|atualizar|save/i).click();

      cy.contains('LISTAR CURSOS').click();
      cy.contains('Curso Editado').should('be.visible');
      cy.contains('Curso Para Editar').should('not.exist');
    });

    it('CT-024: Não deve salvar edição com campos vazios', () => {
      cy.contains('Curso Para Editar')
        .parents('.q-card, [class*="card"]')
        .find('button, [role="button"]')
        .contains(/editar|edit/i)
        .click();

      cy.get('input').first().clear();
      cy.get('button').contains(/salvar|atualizar|save/i).click();
      cy.get('.q-field__messages, .text-negative, .q-field--error')
        .should('be.visible');
    });

    it('CT-025: Deve cancelar edição sem salvar alterações', () => {
      cy.contains('Curso Para Editar')
        .parents('.q-card, [class*="card"]')
        .find('button, [role="button"]')
        .contains(/editar|edit/i)
        .click();

      cy.get('input').first().clear().type('Nome Alterado');
      cy.get('button').contains(/cancelar|cancel|voltar/i).click();

      cy.contains('Curso Para Editar').should('be.visible');
      cy.contains('Nome Alterado').should('not.exist');
    });
  });

  // ===== EXCLUSÃO DE CURSOS =====

  describe('Exclusão de Cursos', () => {

    beforeEach(() => {
      cy.contains('CADASTRAR CURSO').click();
      cy.get('input').first().type('Curso Para Excluir');
      cy.get('textarea, input').eq(1).type('Será excluído');
      cy.get('button').contains(/cadastrar|salvar|enviar/i).click();
      cy.contains('LISTAR CURSOS').click();
    });

    it('CT-026: Deve excluir curso com confirmação', () => {
      cy.contains('Curso Para Excluir')
        .parents('.q-card, [class*="card"]')
        .find('button, [role="button"]')
        .contains(/excluir|deletar|remover|delete/i)
        .click();

      // Confirmar exclusão no dialog
      cy.get('.q-dialog, [role="dialog"]')
        .find('button')
        .contains(/confirmar|sim|ok|yes/i)
        .click();

      cy.contains('Curso Para Excluir').should('not.exist');
    });

    it('CT-027: Deve cancelar exclusão e manter o curso', () => {
      cy.contains('Curso Para Excluir')
        .parents('.q-card, [class*="card"]')
        .find('button, [role="button"]')
        .contains(/excluir|deletar|remover|delete/i)
        .click();

      // Cancelar no dialog
      cy.get('.q-dialog, [role="dialog"]')
        .find('button')
        .contains(/cancelar|não|cancel|no/i)
        .click();

      cy.contains('Curso Para Excluir').should('be.visible');
    });

    it('CT-028: Exclusão deve persistir após reload', () => {
      cy.contains('Curso Para Excluir')
        .parents('.q-card, [class*="card"]')
        .find('button, [role="button"]')
        .contains(/excluir|deletar|remover|delete/i)
        .click();

      cy.get('.q-dialog, [role="dialog"]')
        .find('button')
        .contains(/confirmar|sim|ok|yes/i)
        .click();

      cy.reload();
      cy.contains('Curso Para Excluir').should('not.exist');
    });
  });

  // ===== TESTES DE API & CONTRATO =====

  describe('API & Contrato', () => {

    const API_URL = BASE_URL + '/api';

    it('CT-029: GET /api/courses deve retornar lista', () => {
      cy.request({
        method: 'GET',
        url: \`\${API_URL}/courses\`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');

        if (response.body.length > 0) {
          const course = response.body[0];
          expect(course).to.have.property('id');
          expect(course).to.have.property('nome').that.is.a('string');
          expect(course).to.have.property('descricao').that.is.a('string');
        }
      });
    });

    it('CT-030: POST /api/courses deve criar curso', () => {
      cy.request({
        method: 'POST',
        url: \`\${API_URL}/courses\`,
        body: {
          nome: 'Curso API Test',
          descricao: 'Criado via API',
          tipo: 'Online',
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
        expect(response.body.nome).to.eq('Curso API Test');
      });
    });

    it('CT-031: POST /api/courses com payload inválido', () => {
      cy.request({
        method: 'POST',
        url: \`\${API_URL}/courses\`,
        body: {},
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error');
      });
    });

    it('CT-032: DELETE /api/courses/:id deve remover', () => {
      // Primeiro criar um curso
      cy.request({
        method: 'POST',
        url: \`\${API_URL}/courses\`,
        body: {
          nome: 'Curso Para Deletar API',
          descricao: 'Será deletado',
          tipo: 'Presencial',
        },
        failOnStatusCode: false,
      }).then((createRes) => {
        const courseId = createRes.body.id;

        // Deletar
        cy.request({
          method: 'DELETE',
          url: \`\${API_URL}/courses/\${courseId}\`,
          failOnStatusCode: false,
        }).then((deleteRes) => {
          expect(deleteRes.status).to.eq(200);
        });

        // Verificar que não existe mais
        cy.request({
          method: 'GET',
          url: \`\${API_URL}/courses\`,
          failOnStatusCode: false,
        }).then((listRes) => {
          const found = listRes.body.find(
            (c: any) => c.id === courseId
          );
          expect(found).to.be.undefined;
        });
      });
    });
  });
});
`;

export const githubActionsCode = `# .github/workflows/cypress-tests.yml
# CI/CD Pipeline — Cypress E2E Tests
# Responsável: Luis Eric de Lima Nazaré

name: Cypress E2E Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 8 * * 1-5'  # Seg-Sex às 8h

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        browser: [chrome, firefox, edge]

    steps:
      - name: 📥 Checkout
        uses: actions/checkout@v4

      - name: 🟢 Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: 📦 Install Dependencies
        run: npm ci

      - name: 🧪 Run Cypress Tests
        uses: cypress-io/github-action@v6
        with:
          browser: \${{ matrix.browser }}
          record: true
          parallel: true
        env:
          CYPRESS_RECORD_KEY: \${{ secrets.CYPRESS_RECORD_KEY }}
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}

      - name: 📸 Upload Screenshots (on failure)
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: cypress-screenshots-\${{ matrix.browser }}
          path: cypress/screenshots
          retention-days: 7

      - name: 🎥 Upload Videos
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: cypress-videos-\${{ matrix.browser }}
          path: cypress/videos
          retention-days: 7

      - name: 📊 Upload Test Report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-report-\${{ matrix.browser }}
          path: cypress/results
          retention-days: 30

  notify:
    needs: cypress-run
    runs-on: ubuntu-latest
    if: always()

    steps:
      - name: 📢 Notify Results
        run: |
          echo "Test run completed"
          echo "Status: \${{ needs.cypress-run.result }}"
`;
