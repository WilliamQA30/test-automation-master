export interface TestCase {
  id: string;
  scenario: string;
  given: string;
  when: string;
  then: string;
  type: 'positive' | 'negative' | 'edge';
  priority: 'alta' | 'media' | 'baixa';
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
  {
    id: 'CT-001',
    scenario: 'Cadastro de curso com dados válidos',
    given: 'O usuário está na página de cadastro de curso',
    when: 'Preenche todos os campos obrigatórios com dados válidos e submete o formulário',
    then: 'O curso é cadastrado com sucesso e exibido na lista de cursos',
    type: 'positive',
    priority: 'alta',
  },
  {
    id: 'CT-002',
    scenario: 'Cadastro com campos obrigatórios vazios',
    given: 'O usuário está na página de cadastro de curso',
    when: 'Submete o formulário sem preencher os campos obrigatórios',
    then: 'O sistema exibe mensagens de validação para cada campo obrigatório',
    type: 'negative',
    priority: 'alta',
  },
  {
    id: 'CT-003',
    scenario: 'Listagem de cursos cadastrados',
    given: 'Existem cursos cadastrados no sistema',
    when: 'O usuário acessa a página de listagem de cursos',
    then: 'Todos os cursos cadastrados são exibidos corretamente',
    type: 'positive',
    priority: 'alta',
  },
  {
    id: 'CT-004',
    scenario: 'Listagem vazia quando não há cursos',
    given: 'Não existem cursos cadastrados no sistema',
    when: 'O usuário acessa a página de listagem de cursos',
    then: 'O sistema exibe uma mensagem indicando que não há cursos',
    type: 'edge',
    priority: 'media',
  },
  {
    id: 'CT-005',
    scenario: 'Validação do campo nome com caracteres especiais',
    given: 'O usuário está na página de cadastro de curso',
    when: 'Preenche o campo nome com caracteres especiais (<script>, SQL injection)',
    then: 'O sistema rejeita ou sanitiza a entrada inválida',
    type: 'negative',
    priority: 'alta',
  },
  {
    id: 'CT-006',
    scenario: 'Navegação entre listar e cadastrar',
    given: 'O usuário está na página de listagem',
    when: 'Clica em "Cadastrar Curso" no menu de navegação',
    then: 'O sistema redireciona para a página de cadastro de curso',
    type: 'positive',
    priority: 'media',
  },
  {
    id: 'CT-007',
    scenario: 'Cadastro com nome muito longo',
    given: 'O usuário está na página de cadastro de curso',
    when: 'Preenche o campo nome com mais de 255 caracteres',
    then: 'O sistema valida o limite máximo de caracteres',
    type: 'edge',
    priority: 'media',
  },
  {
    id: 'CT-008',
    scenario: 'Cadastro com campos preenchidos apenas com espaços',
    given: 'O usuário está na página de cadastro de curso',
    when: 'Preenche os campos obrigatórios apenas com espaços em branco',
    then: 'O sistema não aceita e exibe mensagem de validação',
    type: 'negative',
    priority: 'alta',
  },
  {
    id: 'CT-009',
    scenario: 'Responsividade da aplicação',
    given: 'O usuário acessa a aplicação em dispositivo móvel',
    when: 'Navega pelas páginas de listagem e cadastro',
    then: 'A aplicação se adapta corretamente à tela do dispositivo',
    type: 'positive',
    priority: 'media',
  },
  {
    id: 'CT-010',
    scenario: 'Persistência dos dados após reload',
    given: 'O usuário cadastrou um curso com sucesso',
    when: 'Recarrega a página de listagem (F5)',
    then: 'O curso cadastrado permanece na lista',
    type: 'positive',
    priority: 'alta',
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
    title: 'Sem feedback visual de sucesso após cadastro',
    steps: [
      'Preencher todos os campos corretamente',
      'Submeter o formulário de cadastro',
    ],
    actual: 'Nenhuma mensagem de confirmação é exibida',
    expected: 'O sistema deve exibir uma mensagem de sucesso (toast/snackbar)',
    severity: 'media',
  },
];
