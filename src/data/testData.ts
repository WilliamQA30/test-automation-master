export interface TestCase {
  id: string;
  scenario: string;
  given: string;
  when: string;
  then: string;
  type: 'positive' | 'negative' | 'edge';
  priority: 'alta' | 'media' | 'baixa';
  status: 'passou' | 'falhou' | 'pendente';
}

export interface BugReport {
  id: string;
  title: string;
  steps: string[];
  actual: string;
  expected: string;
  severity: 'critica' | 'alta' | 'media' | 'baixa';
}

export const testCases: TestCase[] = [
  // --- CADASTRO ---
  {
    id: 'CT-001',
    scenario: 'Cadastro de curso com dados válidos',
    given: 'O usuário está na página de cadastro de curso',
    when: 'Preenche todos os campos obrigatórios com dados válidos e submete o formulário',
    then: 'O curso é cadastrado com sucesso e exibido na lista de cursos',
    type: 'positive',
    priority: 'alta',
    status: 'passou',
  },
  {
    id: 'CT-002',
    scenario: 'Cadastro com campos obrigatórios vazios',
    given: 'O usuário está na página de cadastro de curso',
    when: 'Submete o formulário sem preencher os campos obrigatórios',
    then: 'O sistema exibe mensagens de validação para cada campo obrigatório',
    type: 'negative',
    priority: 'alta',
    status: 'falhou',
  },
  {
    id: 'CT-003',
    scenario: 'Cadastro com nome duplicado',
    given: 'Já existe um curso com o nome "Cypress Avançado"',
    when: 'O usuário tenta cadastrar outro curso com o mesmo nome',
    then: 'O sistema impede o cadastro duplicado ou exibe aviso',
    type: 'negative',
    priority: 'media',
    status: 'falhou',
  },
  {
    id: 'CT-004',
    scenario: 'Validação do campo nome com caracteres especiais (XSS)',
    given: 'O usuário está na página de cadastro de curso',
    when: 'Preenche o campo nome com <script>alert("xss")</script>',
    then: 'O sistema rejeita ou sanitiza a entrada inválida',
    type: 'negative',
    priority: 'alta',
    status: 'falhou',
  },
  {
    id: 'CT-005',
    scenario: 'Cadastro com campos preenchidos apenas com espaços',
    given: 'O usuário está na página de cadastro de curso',
    when: 'Preenche os campos obrigatórios apenas com espaços em branco',
    then: 'O sistema não aceita e exibe mensagem de validação',
    type: 'negative',
    priority: 'alta',
    status: 'falhou',
  },
  {
    id: 'CT-006',
    scenario: 'Cadastro com nome muito longo (>255 chars)',
    given: 'O usuário está na página de cadastro de curso',
    when: 'Preenche o campo nome com mais de 255 caracteres',
    then: 'O sistema valida o limite máximo de caracteres',
    type: 'edge',
    priority: 'media',
    status: 'pendente',
  },
  {
    id: 'CT-007',
    scenario: 'Cadastro com SQL Injection no campo descrição',
    given: 'O usuário está na página de cadastro de curso',
    when: 'Preenche a descrição com: \'; DROP TABLE courses; --',
    then: 'O sistema sanitiza a entrada e não executa SQL',
    type: 'negative',
    priority: 'alta',
    status: 'pendente',
  },
  {
    id: 'CT-008',
    scenario: 'Feedback visual de sucesso após cadastro',
    given: 'O usuário preencheu todos os campos corretamente',
    when: 'Submete o formulário de cadastro',
    then: 'O sistema exibe uma mensagem de sucesso (toast/snackbar)',
    type: 'positive',
    priority: 'alta',
    status: 'passou',
  },
  // --- LISTAGEM ---
  {
    id: 'CT-009',
    scenario: 'Listagem de cursos cadastrados',
    given: 'Existem cursos cadastrados no sistema',
    when: 'O usuário acessa a página de listagem de cursos',
    then: 'Todos os cursos cadastrados são exibidos corretamente',
    type: 'positive',
    priority: 'alta',
    status: 'passou',
  },
  {
    id: 'CT-010',
    scenario: 'Listagem vazia quando não há cursos',
    given: 'Não existem cursos cadastrados no sistema',
    when: 'O usuário acessa a página de listagem de cursos',
    then: 'O sistema exibe uma mensagem indicando que não há cursos ou lista vazia',
    type: 'edge',
    priority: 'media',
    status: 'passou',
  },
  {
    id: 'CT-011',
    scenario: 'Exibição correta dos dados do curso na listagem',
    given: 'Um curso foi cadastrado com nome, descrição e tipo',
    when: 'O usuário acessa a listagem',
    then: 'O card do curso exibe nome, descrição e tipo corretamente',
    type: 'positive',
    priority: 'alta',
    status: 'passou',
  },
  // --- NAVEGAÇÃO ---
  {
    id: 'CT-012',
    scenario: 'Navegação de listagem para cadastro',
    given: 'O usuário está na página de listagem',
    when: 'Clica em "Cadastrar Curso" no menu de navegação',
    then: 'O sistema redireciona para a página de cadastro de curso',
    type: 'positive',
    priority: 'media',
    status: 'passou',
  },
  {
    id: 'CT-013',
    scenario: 'Navegação de cadastro para listagem',
    given: 'O usuário está na página de cadastro',
    when: 'Clica em "Listar Cursos" no menu de navegação',
    then: 'O sistema redireciona para a página de listagem',
    type: 'positive',
    priority: 'media',
    status: 'passou',
  },
  {
    id: 'CT-014',
    scenario: 'Logo redireciona para home',
    given: 'O usuário está em qualquer página',
    when: 'Clica no logo "Beedoo QA Challenge"',
    then: 'O sistema redireciona para a página inicial (listagem)',
    type: 'positive',
    priority: 'baixa',
    status: 'pendente',
  },
  // --- PERSISTÊNCIA ---
  {
    id: 'CT-015',
    scenario: 'Persistência dos dados após reload',
    given: 'O usuário cadastrou um curso com sucesso',
    when: 'Recarrega a página de listagem (F5)',
    then: 'O curso cadastrado permanece na lista',
    type: 'positive',
    priority: 'alta',
    status: 'passou',
  },
  // --- RESPONSIVIDADE ---
  {
    id: 'CT-016',
    scenario: 'Responsividade — listagem em mobile',
    given: 'O usuário acessa a aplicação em dispositivo móvel (375px)',
    when: 'Visualiza a listagem de cursos',
    then: 'A página se adapta corretamente sem cortar conteúdo',
    type: 'positive',
    priority: 'media',
    status: 'passou',
  },
  {
    id: 'CT-017',
    scenario: 'Responsividade — formulário em tablet',
    given: 'O usuário acessa a aplicação em tablet (768px)',
    when: 'Navega e preenche o formulário de cadastro',
    then: 'O formulário é exibido e funcional no tamanho do tablet',
    type: 'positive',
    priority: 'media',
    status: 'passou',
  },
  // --- ACESSIBILIDADE ---
  {
    id: 'CT-018',
    scenario: 'Navegação por teclado (Tab)',
    given: 'O usuário está na página de cadastro',
    when: 'Navega pelos campos usando apenas a tecla Tab',
    then: 'Todos os campos e botões são acessíveis por teclado',
    type: 'positive',
    priority: 'media',
    status: 'pendente',
  },
  {
    id: 'CT-019',
    scenario: 'Submissão por Enter',
    given: 'O usuário preencheu todos os campos do formulário',
    when: 'Pressiona Enter ao invés de clicar no botão',
    then: 'O formulário é submetido normalmente',
    type: 'positive',
    priority: 'baixa',
    status: 'pendente',
  },
  // --- PERFORMANCE ---
  {
    id: 'CT-020',
    scenario: 'Carregamento da listagem com muitos cursos',
    given: 'Existem mais de 50 cursos cadastrados',
    when: 'O usuário acessa a página de listagem',
    then: 'A página carrega em menos de 3 segundos',
    type: 'edge',
    priority: 'media',
    status: 'pendente',
  },
];

export const bugReports: BugReport[] = [
  {
    id: 'BUG-001',
    title: 'Formulário aceita campos obrigatórios vazios',
    steps: [
      'Acessar a página de cadastro de curso',
      'Não preencher nenhum campo',
      'Clicar no botão de submissão',
    ],
    actual: 'O formulário é submetido sem validação',
    expected: 'O sistema deve exibir mensagens de erro para campos obrigatórios',
    severity: 'critica',
  },
  {
    id: 'BUG-002',
    title: 'Campos aceitam apenas espaços em branco',
    steps: [
      'Acessar a página de cadastro de curso',
      'Preencher campos com apenas espaços',
      'Submeter o formulário',
    ],
    actual: 'O curso é cadastrado com valores em branco',
    expected: 'O sistema deve rejeitar entradas contendo apenas espaços',
    severity: 'alta',
  },
  {
    id: 'BUG-003',
    title: 'Aplicação aceita input XSS sem sanitização',
    steps: [
      'Acessar a página de cadastro de curso',
      'Preencher o nome com: <script>alert("xss")</script>',
      'Submeter o formulário',
      'Acessar a listagem de cursos',
    ],
    actual: 'O texto do script é salvo e exibido como nome do curso',
    expected: 'O sistema deve sanitizar ou rejeitar entradas com tags HTML/scripts',
    severity: 'critica',
  },
  {
    id: 'BUG-004',
    title: 'Sistema permite cadastro de cursos duplicados',
    steps: [
      'Cadastrar um curso com nome "Teste Duplicado"',
      'Cadastrar outro curso com o mesmo nome "Teste Duplicado"',
    ],
    actual: 'Dois cursos com nomes idênticos são cadastrados',
    expected: 'O sistema deve avisar ou impedir nomes duplicados',
    severity: 'media',
  },
];

export interface EvidenceItem {
  testId: string;
  description: string;
  status: 'passou' | 'falhou';
  details: string;
}

export const evidences: EvidenceItem[] = [
  { testId: 'CT-001', description: 'Cadastro com dados válidos', status: 'passou', details: 'Curso "Cypress Automação" cadastrado e visível na listagem' },
  { testId: 'CT-002', description: 'Campos vazios sem validação', status: 'falhou', details: 'Formulário submetido sem erros — BUG-001' },
  { testId: 'CT-003', description: 'Nome duplicado aceito', status: 'falhou', details: 'Sistema cadastrou dois cursos idênticos — BUG-004' },
  { testId: 'CT-004', description: 'XSS não sanitizado', status: 'falhou', details: 'Tag <script> salva como nome do curso — BUG-003' },
  { testId: 'CT-005', description: 'Espaços aceitos como conteúdo', status: 'falhou', details: 'Curso criado com nome "   " — BUG-002' },
  { testId: 'CT-008', description: 'Feedback visual após cadastro', status: 'passou', details: 'Toast de sucesso exibido corretamente após cadastro' },
  { testId: 'CT-009', description: 'Listagem exibe cursos', status: 'passou', details: 'Cursos cadastrados aparecem em cards na listagem' },
  { testId: 'CT-010', description: 'Lista vazia funcional', status: 'passou', details: 'Página exibe "Lista de cursos" sem erros quando vazia' },
  { testId: 'CT-011', description: 'Dados do card corretos', status: 'passou', details: 'Nome, descrição e tipo exibidos corretamente no card' },
  { testId: 'CT-012', description: 'Navegação para cadastro', status: 'passou', details: 'Link "CADASTRAR CURSO" leva ao formulário de cadastro' },
  { testId: 'CT-013', description: 'Navegação para listagem', status: 'passou', details: 'Link "LISTAR CURSOS" retorna à listagem' },
  { testId: 'CT-015', description: 'Dados persistem após F5', status: 'passou', details: 'Cursos permanecem na listagem após recarregar a página' },
  { testId: 'CT-016', description: 'Mobile 375px', status: 'passou', details: 'Layout adapta-se ao viewport mobile sem quebra' },
  { testId: 'CT-017', description: 'Tablet 768px', status: 'passou', details: 'Formulário funcional e responsivo em tablet' },
];
