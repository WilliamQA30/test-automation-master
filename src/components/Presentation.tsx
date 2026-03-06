import { useState } from 'react';
import { ChevronLeft, ChevronRight, Bug, TestTube, Code, FileText, Target, Video, CheckCircle, XCircle, Clock, BarChart3, Camera, Shield, GitBranch, Server, Pencil, Trash2 } from 'lucide-react';
import { testCases, bugReports, evidences } from '@/data/testData';
import { cypressCode, githubActionsCode } from '@/data/cypressCode';
import screenshotListagem from '@/assets/screenshot-listagem.png';
import evCadastroSucesso from '@/assets/evidence-cadastro-sucesso.png';
import evCamposVazios from '@/assets/evidence-campos-vazios.png';
import evListagemCursos from '@/assets/evidence-listagem-cursos.png';
import evXssInput from '@/assets/evidence-xss-input.png';
import evMobile from '@/assets/evidence-mobile.png';
import evDuplicado from '@/assets/evidence-duplicado.png';

const evidenceImages: Record<string, string> = {
  'cadastro-sucesso': evCadastroSucesso,
  'campos-vazios': evCamposVazios,
  'listagem-cursos': evListagemCursos,
  'listagem': screenshotListagem,
  'xss-input': evXssInput,
  'mobile': evMobile,
  'duplicado': evDuplicado,
};

const portraitEvidenceKeys = new Set(['mobile']);

const typeColors: Record<string, string> = {
  positive: 'bg-slide-success',
  negative: 'bg-slide-danger',
  edge: 'bg-slide-warning',
};

const typeLabels: Record<string, string> = {
  positive: 'Positivo',
  negative: 'Negativo',
  edge: 'Edge Case',
};

const severityColors: Record<string, string> = {
  critica: 'bg-slide-danger',
  alta: 'bg-slide-accent',
  media: 'bg-slide-warning',
  baixa: 'bg-slide-success',
};

const statusIcons: Record<string, React.ReactNode> = {
  passou: <CheckCircle className="w-4 h-4 text-slide-success" />,
  falhou: <XCircle className="w-4 h-4 text-slide-danger" />,
  pendente: <Clock className="w-4 h-4 text-slide-warning" />,
};

function SlideWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full bg-slide-bg text-slide-fg p-12 flex flex-col font-display overflow-hidden">
      {children}
    </div>
  );
}

function TitleSlide() {
  const passed = testCases.filter(t => t.status === 'passou').length;
  const failed = testCases.filter(t => t.status === 'falhou').length;
  const pending = testCases.filter(t => t.status === 'pendente').length;

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-slide-accent flex items-center justify-center">
            <TestTube className="w-8 h-8 text-slide-bg" />
          </div>
          <span className="text-lg font-mono tracking-widest uppercase text-slide-muted">Beedoo QA Challenge 2026</span>
        </div>
        <h1 className="text-6xl font-bold leading-tight max-w-4xl">
          Casos de Teste &<br />
          <span className="text-slide-accent">Automação Cypress</span>
        </h1>
        <p className="text-xl text-slide-muted max-w-2xl">
          Análise completa do módulo de cadastro e listagem de cursos
        </p>
        <div className="flex gap-4 mt-4">
          <span className="px-4 py-2 rounded-lg bg-slide-card text-sm font-mono">{testCases.length} Casos de Teste</span>
          <span className="px-4 py-2 rounded-lg bg-slide-card text-sm font-mono">{bugReports.length} Bugs Reportados</span>
          <span className="px-4 py-2 rounded-lg bg-slide-card text-sm font-mono">{evidences.length} Evidências</span>
        </div>
        <div className="flex gap-6 mt-2">
          <span className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-slide-success" /> {passed} Passou</span>
          <span className="flex items-center gap-2 text-sm"><XCircle className="w-4 h-4 text-slide-danger" /> {failed} Falhou</span>
          <span className="flex items-center gap-2 text-sm"><Clock className="w-4 h-4 text-slide-warning" /> {pending} Pendente</span>
        </div>
        <p className="text-base text-slide-muted mt-4 font-mono">
          Responsável: <strong className="text-slide-fg">Luis Eric de Lima Nazaré</strong>
        </p>
      </div>
    </SlideWrapper>
  );
}

function AnalysisSlide() {
  return (
    <SlideWrapper>
      <div className="flex items-center gap-3 mb-6">
        <Target className="w-6 h-6 text-slide-accent" />
        <h2 className="text-3xl font-bold">Análise da Aplicação</h2>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-6">
        <div className="bg-slide-card rounded-2xl p-6 flex flex-col gap-3">
          <h3 className="text-lg font-bold text-slide-accent">Objetivo</h3>
          <p className="text-slide-fg/80 leading-relaxed text-sm">
            Aplicação simples para <strong>cadastro e listagem de cursos</strong>. 
            Permite ao usuário criar novos cursos e visualizar os já cadastrados.
          </p>
          <div className="mt-2">
            <p className="text-xs text-slide-muted mb-1 font-mono">Tela: Listagem de Cursos</p>
            <img src={screenshotListagem} alt="Screenshot da tela de listagem de cursos" className="rounded-xl border border-slide-muted/20 w-full" />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="bg-slide-card rounded-2xl p-6 flex flex-col gap-3">
            <h3 className="text-lg font-bold text-slide-accent">Fluxos Principais</h3>
            <ul className="space-y-2 text-slide-fg/80 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slide-accent" /> Listar cursos cadastrados
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slide-accent" /> Cadastrar novo curso (formulário)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slide-accent" /> Navegação entre telas via toolbar
              </li>
            </ul>
          </div>
          <div className="bg-slide-card rounded-2xl p-6 flex flex-col gap-3">
            <h3 className="text-lg font-bold text-slide-accent">Pontos Críticos</h3>
            <div className="grid grid-cols-2 gap-2">
              {['Validação de campos', 'Persistência de dados', 'Segurança (XSS/SQL)', 
                'Feedback ao usuário', 'Responsividade', 'Acessibilidade'].map((item) => (
                <div key={item} className="px-3 py-2 bg-slide-bg rounded-xl text-xs text-center">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

function TestCasesSlide({ page }: { page: number }) {
  const perPage = 2;
  const start = page * perPage;
  const items = testCases.slice(start, start + perPage);
  if (items.length === 0) return null;

  return (
    <SlideWrapper>
      <div className="flex items-center gap-3 mb-4">
        <FileText className="w-6 h-6 text-slide-accent" />
        <h2 className="text-3xl font-bold">Casos de Teste</h2>
        <span className="ml-auto text-sm font-mono text-slide-muted">
          {start + 1}-{Math.min(start + perPage, testCases.length)} de {testCases.length}
        </span>
      </div>
      <div className="flex-1 flex flex-col gap-3">
        {items.map((tc) => (
          <div key={tc.id} className="bg-slide-card rounded-2xl p-4 flex gap-4 flex-1">
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-slide-accent font-bold">{tc.id}</span>
                <span className={`px-2 py-0.5 rounded text-xs font-bold text-slide-bg ${typeColors[tc.type]}`}>
                  {typeLabels[tc.type]}
                </span>
                {statusIcons[tc.status]}
                <span className="ml-auto text-xs font-mono text-slide-muted uppercase">
                  {tc.priority}
                </span>
              </div>
              <h3 className="font-bold text-sm">{tc.scenario}</h3>
              <div className="space-y-0.5 text-xs text-slide-fg/70">
                <p><span className="text-slide-success font-bold font-mono">DADO</span> {tc.given}</p>
                <p><span className="text-slide-warning font-bold font-mono">QUANDO</span> {tc.when}</p>
                <p><span className="text-slide-accent-2 font-bold font-mono">ENTÃO</span> {tc.then}</p>
              </div>
            </div>
            {tc.evidenceKey && evidenceImages[tc.evidenceKey] && !portraitEvidenceKeys.has(tc.evidenceKey) && (
              <div className="w-96 shrink-0 flex flex-col gap-1">
                <img 
                  src={evidenceImages[tc.evidenceKey]} 
                  alt={`Evidência ${tc.id}`} 
                  className="rounded-xl border border-slide-muted/20 w-full h-auto object-cover"
                />
                <span className="text-xs font-mono text-slide-muted text-center">
                  {tc.status === 'passou' ? '✅ Passou' : tc.status === 'falhou' ? '❌ Falhou' : '⏳ Pendente'}
                </span>
              </div>
            )}
            {tc.evidenceKey && portraitEvidenceKeys.has(tc.evidenceKey) && (
              <div className="w-24 shrink-0 flex flex-col items-center justify-center gap-1">
                <Camera className="w-5 h-5 text-slide-accent" />
                <span className="text-[10px] font-mono text-slide-muted text-center">Ver slide seguinte</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </SlideWrapper>
  );
}


function SummarySlide() {
  const passed = testCases.filter(t => t.status === 'passou').length;
  const failed = testCases.filter(t => t.status === 'falhou').length;
  const pending = testCases.filter(t => t.status === 'pendente').length;
  const total = testCases.length;
  const passRate = Math.round((passed / total) * 100);

  const categories = [
    { name: 'Cadastro', tests: testCases.filter(t => ['CT-001','CT-002','CT-003','CT-004','CT-005','CT-006','CT-007','CT-008'].includes(t.id)) },
    { name: 'Listagem', tests: testCases.filter(t => ['CT-009','CT-010','CT-011'].includes(t.id)) },
    { name: 'Navegação', tests: testCases.filter(t => ['CT-012','CT-013','CT-014'].includes(t.id)) },
    { name: 'Persistência', tests: testCases.filter(t => ['CT-015'].includes(t.id)) },
    { name: 'Responsividade', tests: testCases.filter(t => ['CT-016','CT-017'].includes(t.id)) },
    { name: 'Acessibilidade', tests: testCases.filter(t => ['CT-018','CT-019'].includes(t.id)) },
    { name: 'Performance', tests: testCases.filter(t => ['CT-020','CT-021','CT-022'].includes(t.id)) },
    { name: 'Edição', tests: testCases.filter(t => ['CT-023','CT-024','CT-025'].includes(t.id)) },
    { name: 'Exclusão', tests: testCases.filter(t => ['CT-026','CT-027','CT-028'].includes(t.id)) },
    { name: 'API/Contrato', tests: testCases.filter(t => ['CT-029','CT-030','CT-031','CT-032'].includes(t.id)) },
  ];

  return (
    <SlideWrapper>
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-6 h-6 text-slide-accent" />
        <h2 className="text-3xl font-bold">Resumo da Execução</h2>
      </div>
      <div className="flex-1 grid grid-cols-3 gap-6">
        {/* Stats */}
        <div className="flex flex-col gap-4">
          <div className="bg-slide-card rounded-2xl p-6 text-center">
            <p className="text-5xl font-bold text-slide-accent">{passRate}%</p>
            <p className="text-sm text-slide-muted mt-2">Taxa de Aprovação</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slide-success/20 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-slide-success">{passed}</p>
              <p className="text-xs text-slide-muted">Passou</p>
            </div>
            <div className="bg-slide-danger/20 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-slide-danger">{failed}</p>
              <p className="text-xs text-slide-muted">Falhou</p>
            </div>
            <div className="bg-slide-warning/20 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-slide-warning">{pending}</p>
              <p className="text-xs text-slide-muted">Pendente</p>
            </div>
          </div>
          <div className="bg-slide-card rounded-2xl p-4">
            <p className="text-sm text-slide-muted mb-2">Bugs por severidade</p>
            <div className="space-y-2">
              {['critica', 'alta', 'media'].map(sev => {
                const count = bugReports.filter(b => b.severity === sev).length;
                if (count === 0) return null;
                return (
                  <div key={sev} className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${severityColors[sev]}`} />
                    <span className="text-xs capitalize">{sev}</span>
                    <span className="ml-auto text-xs font-mono font-bold">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="col-span-2 bg-slide-card rounded-2xl p-6">
          <h3 className="text-lg font-bold text-slide-accent mb-4">Cobertura por Área</h3>
          <div className="space-y-3">
            {categories.map(cat => {
              const p = cat.tests.filter(t => t.status === 'passou').length;
              const f = cat.tests.filter(t => t.status === 'falhou').length;
              const pend = cat.tests.filter(t => t.status === 'pendente').length;
              const pct = cat.tests.length > 0 ? Math.round((p / cat.tests.length) * 100) : 0;
              return (
                <div key={cat.name} className="flex items-center gap-4">
                  <span className="w-28 text-sm font-bold">{cat.name}</span>
                  <div className="flex-1 h-6 bg-slide-bg rounded-full overflow-hidden flex">
                    {p > 0 && <div className="bg-slide-success h-full" style={{ width: `${(p/cat.tests.length)*100}%` }} />}
                    {f > 0 && <div className="bg-slide-danger h-full" style={{ width: `${(f/cat.tests.length)*100}%` }} />}
                    {pend > 0 && <div className="bg-slide-warning h-full" style={{ width: `${(pend/cat.tests.length)*100}%` }} />}
                  </div>
                  <span className="text-xs font-mono w-16 text-right">{p}/{cat.tests.length} ({pct}%)</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

function EvidencesSlide({ page }: { page: number }) {
  const perPage = 7;
  const start = page * perPage;
  const items = evidences.slice(start, start + perPage);

  return (
    <SlideWrapper>
      <div className="flex items-center gap-3 mb-6">
        <Camera className="w-6 h-6 text-slide-accent" />
        <h2 className="text-3xl font-bold">Evidências de Execução</h2>
        <span className="ml-auto text-sm font-mono text-slide-muted">
          {start + 1}-{Math.min(start + perPage, evidences.length)} de {evidences.length}
        </span>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="grid grid-cols-12 gap-2 text-xs font-mono text-slide-muted px-4 py-2">
          <span className="col-span-1">ID</span>
          <span className="col-span-1">Status</span>
          <span className="col-span-3">Teste</span>
          <span className="col-span-7">Evidência / Detalhes</span>
        </div>
        {items.map((ev) => (
          <div key={ev.testId} className={`grid grid-cols-12 gap-2 items-center px-4 py-3 rounded-xl text-sm ${
            ev.status === 'passou' ? 'bg-slide-success/10' : 'bg-slide-danger/10'
          }`}>
            <span className="col-span-1 font-mono text-xs font-bold text-slide-accent">{ev.testId}</span>
            <span className="col-span-1">
              {ev.status === 'passou' 
                ? <CheckCircle className="w-5 h-5 text-slide-success" /> 
                : <XCircle className="w-5 h-5 text-slide-danger" />}
            </span>
            <span className="col-span-3 font-bold text-xs">{ev.description}</span>
            <span className="col-span-7 text-xs text-slide-fg/70">{ev.details}</span>
          </div>
        ))}
      </div>
    </SlideWrapper>
  );
}

function BugsSlide() {
  return (
    <SlideWrapper>
      <div className="flex items-center gap-3 mb-6">
        <Bug className="w-6 h-6 text-slide-danger" />
        <h2 className="text-3xl font-bold">Bugs Encontrados</h2>
        <span className="ml-auto text-sm font-mono text-slide-muted">{bugReports.length} bugs</span>
      </div>
      <div className="flex-1 flex flex-col gap-4 overflow-auto">
        {bugReports.map((bug) => (
          <div key={bug.id} className="bg-slide-card rounded-2xl p-5 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-slide-danger font-bold">{bug.id}</span>
              <h3 className="font-bold text-base">{bug.title}</h3>
              <span className={`ml-auto px-3 py-1 rounded text-xs font-bold text-slide-bg ${severityColors[bug.severity]}`}>
                {bug.severity.toUpperCase()}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-slide-muted font-mono text-xs">Passos</span>
                <ol className="list-decimal list-inside text-slide-fg/70 mt-1 space-y-0.5 text-xs">
                  {bug.steps.map((s, i) => <li key={i}>{s}</li>)}
                </ol>
              </div>
              <div>
                <span className="text-slide-muted font-mono text-xs">Resultado Atual</span>
                <p className="text-slide-danger/90 mt-1 text-xs">{bug.actual}</p>
              </div>
              <div>
                <span className="text-slide-muted font-mono text-xs">Resultado Esperado</span>
                <p className="text-slide-success/90 mt-1 text-xs">{bug.expected}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SlideWrapper>
  );
}

function CypressSlide({ part }: { part: number }) {
  const lines = cypressCode.trim().split('\n');
  const perSlide = 32;
  const start = part * perSlide;
  const chunk = lines.slice(start, start + perSlide).join('\n');
  if (!chunk.trim()) return null;

  return (
    <SlideWrapper>
      <div className="flex items-center gap-3 mb-4">
        <Code className="w-6 h-6 text-slide-accent-2" />
        <h2 className="text-3xl font-bold">Automação Cypress</h2>
        <span className="ml-auto text-sm font-mono text-slide-muted">Parte {part + 1}</span>
      </div>
      <div className="flex-1 bg-slide-code-bg rounded-2xl p-5 overflow-hidden">
        <pre className="text-xs leading-relaxed text-slide-fg/90 font-mono whitespace-pre overflow-auto h-full">
          {chunk}
        </pre>
      </div>
    </SlideWrapper>
  );
}

function CypressVideoSlide() {
  return (
    <SlideWrapper>
      <div className="flex items-center gap-3 mb-6">
        <Video className="w-6 h-6 text-slide-accent" />
        <h2 className="text-3xl font-bold">Evidências — Gravação Cypress</h2>
      </div>
      <div className="flex-1 flex flex-col gap-5">
        <div className="bg-slide-card rounded-2xl p-6 flex flex-col gap-3">
          <h3 className="text-lg font-bold text-slide-accent">Gravação Automática de Testes</h3>
          <p className="text-slide-fg/80 leading-relaxed text-sm">
            O Cypress gera automaticamente vídeos (<code className="bg-slide-code-bg px-2 py-0.5 rounded text-xs">.mp4</code>) de cada spec executada via{' '}
            <code className="bg-slide-code-bg px-2 py-0.5 rounded text-xs">npx cypress run</code>. 
            Screenshots são capturados automaticamente em falhas.
          </p>
        </div>

        <div className="bg-slide-card rounded-2xl p-6">
          <h3 className="text-base font-bold text-slide-accent mb-3">Configuração — cypress.config.ts</h3>
          <pre className="bg-slide-code-bg rounded-xl p-4 text-xs font-mono text-slide-fg/90 leading-relaxed">{`import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://creative-sherbet-a51eac.netlify.app',
    video: true,                    // ✅ Grava vídeo de cada spec
    videosFolder: 'cypress/videos', // 📁 Pasta de saída dos vídeos
    videoCompression: 32,           // 🎥 Compressão (0 = sem, 51 = máx)
    screenshotOnRunFailure: true,   // 📸 Screenshot automático em falhas
    screenshotsFolder: 'cypress/screenshots',
  },
});`}</pre>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <div className="bg-slide-card rounded-xl p-4 text-center">
            <Video className="w-7 h-7 text-slide-accent mx-auto mb-2" />
            <p className="text-xs font-bold">Vídeos</p>
            <p className="text-xs text-slide-muted mt-1 font-mono">cypress/videos/*.mp4</p>
          </div>
          <div className="bg-slide-card rounded-xl p-4 text-center">
            <Camera className="w-7 h-7 text-slide-danger mx-auto mb-2" />
            <p className="text-xs font-bold">Screenshots</p>
            <p className="text-xs text-slide-muted mt-1 font-mono">cypress/screenshots/</p>
          </div>
          <div className="bg-slide-card rounded-xl p-4 text-center">
            <CheckCircle className="w-7 h-7 text-slide-success mx-auto mb-2" />
            <p className="text-xs font-bold">Comando</p>
            <p className="text-xs text-slide-muted mt-1 font-mono">npx cypress run</p>
          </div>
          <div className="bg-slide-card rounded-xl p-4 text-center">
            <Shield className="w-7 h-7 text-slide-accent-2 mx-auto mb-2" />
            <p className="text-xs font-bold">CI/CD</p>
            <p className="text-xs text-slide-muted mt-1 font-mono">GitHub Actions</p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

function ConclusionSlide() {
  const passed = testCases.filter(t => t.status === 'passou').length;
  const total = testCases.length;
  const passRate = Math.round((passed / total) * 100);

  return (
    <SlideWrapper>
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-6 h-6 text-slide-accent" />
        <h2 className="text-3xl font-bold">Conclusão & Recomendações</h2>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div className="bg-slide-card rounded-2xl p-6">
            <h3 className="text-lg font-bold text-slide-accent mb-3">Resumo Geral</h3>
            <p className="text-slide-fg/80 text-sm leading-relaxed">
              Foram executados <strong>{total} casos de teste</strong> com uma taxa de aprovação de{' '}
              <strong className="text-slide-accent">{passRate}%</strong>. Foram identificados{' '}
              <strong className="text-slide-danger">{bugReports.length} bugs</strong>, incluindo vulnerabilidades 
              de segurança críticas (XSS) e falhas de validação de formulário.
            </p>
          </div>
          <div className="bg-slide-card rounded-2xl p-6">
            <h3 className="text-lg font-bold text-slide-danger mb-3">⚠️ Riscos Identificados</h3>
            <ul className="space-y-2 text-sm text-slide-fg/80">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-slide-danger mt-1.5 shrink-0" />
                <span><strong>XSS:</strong> Inputs não são sanitizados, permitindo injeção de scripts maliciosos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-slide-danger mt-1.5 shrink-0" />
                <span><strong>SQL Injection:</strong> Descrição aceita payloads SQL sem sanitização</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-slide-danger mt-1.5 shrink-0" />
                <span><strong>Validação:</strong> Formulário aceita campos vazios e apenas espaços</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-slide-warning mt-1.5 shrink-0" />
                <span><strong>CRUD incompleto:</strong> Sem funcionalidades de edição e exclusão de cursos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-slide-warning mt-1.5 shrink-0" />
                <span><strong>API:</strong> Nenhum endpoint REST exposto (/api/courses retorna 404)</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-slide-card rounded-2xl p-6">
            <h3 className="text-lg font-bold text-slide-success mb-3">✅ Recomendações de Melhorias</h3>
            <div className="space-y-3">
              {[
                { priority: 'P0', color: 'bg-slide-danger', text: 'Implementar sanitização de inputs contra XSS e SQL Injection' },
                { priority: 'P0', color: 'bg-slide-danger', text: 'Adicionar validação client-side e server-side para campos obrigatórios' },
                { priority: 'P1', color: 'bg-slide-accent', text: 'Implementar funcionalidades de edição e exclusão de cursos (CRUD completo)' },
                { priority: 'P1', color: 'bg-slide-accent', text: 'Expor API RESTful para operações de CRUD' },
                { priority: 'P1', color: 'bg-slide-accent', text: 'Adicionar limites de caracteres e verificação de duplicidade' },
                { priority: 'P2', color: 'bg-slide-warning', text: 'Melhorar acessibilidade: labels, ARIA attributes e foco visível' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-slide-bg ${item.color} shrink-0`}>
                    {item.priority}
                  </span>
                  <span className="text-sm text-slide-fg/80">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slide-card rounded-2xl p-6">
            <h3 className="text-lg font-bold text-slide-accent-2 mb-3">✔️ Já Implementado neste Projeto</h3>
            <ul className="space-y-2 text-sm text-slide-fg/80">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-slide-success shrink-0" /> Pipeline CI/CD com GitHub Actions (Chrome, Firefox, Edge)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-slide-success shrink-0" /> Cobertura expandida para fluxos de edição e exclusão
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-slide-success shrink-0" /> Testes de API e contrato (GET, POST, DELETE)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-slide-success shrink-0" /> Testes de performance com cargas de 50 e 100 cursos
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

function CICDSlide() {
  return (
    <SlideWrapper>
      <div className="flex items-center gap-3 mb-4">
        <GitBranch className="w-6 h-6 text-slide-accent-2" />
        <h2 className="text-3xl font-bold">CI/CD — GitHub Actions</h2>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-5">
        <div className="bg-slide-code-bg rounded-2xl p-5 overflow-hidden">
          <p className="text-xs font-mono text-slide-accent mb-2">.github/workflows/cypress-tests.yml</p>
          <pre className="text-[10px] leading-relaxed text-slide-fg/90 font-mono whitespace-pre overflow-auto h-full">
            {githubActionsCode.trim()}
          </pre>
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-slide-card rounded-2xl p-5">
            <h3 className="text-base font-bold text-slide-accent mb-3">Pipeline Automatizado</h3>
            <ul className="space-y-2 text-sm text-slide-fg/80">
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-slide-success" /> Executa em push/PR para main e develop</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-slide-success" /> Testes paralelos em Chrome, Firefox e Edge</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-slide-success" /> Agendamento diário (Seg-Sex 8h)</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-slide-success" /> Upload automático de vídeos e screenshots</li>
            </ul>
          </div>
          <div className="bg-slide-card rounded-2xl p-5">
            <h3 className="text-base font-bold text-slide-accent mb-3">Artefatos Gerados</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: <Video className="w-5 h-5 text-slide-accent" />, label: 'Vídeos', desc: '7 dias retenção' },
                { icon: <Camera className="w-5 h-5 text-slide-danger" />, label: 'Screenshots', desc: 'Apenas em falhas' },
                { icon: <BarChart3 className="w-5 h-5 text-slide-accent-2" />, label: 'Relatórios', desc: '30 dias retenção' },
                { icon: <Server className="w-5 h-5 text-slide-success" />, label: 'Dashboard', desc: 'Cypress Cloud' },
              ].map((item, i) => (
                <div key={i} className="bg-slide-bg rounded-xl p-3 flex items-center gap-3">
                  {item.icon}
                  <div>
                    <p className="text-xs font-bold">{item.label}</p>
                    <p className="text-[10px] text-slide-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slide-card rounded-2xl p-5">
            <h3 className="text-base font-bold text-slide-accent mb-3">Novos Fluxos Cobertos</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 text-sm"><Pencil className="w-4 h-4 text-slide-warning" /> Edição de cursos</div>
              <div className="flex items-center gap-2 text-sm"><Trash2 className="w-4 h-4 text-slide-danger" /> Exclusão de cursos</div>
              <div className="flex items-center gap-2 text-sm"><Server className="w-4 h-4 text-slide-accent-2" /> Testes de API</div>
              <div className="flex items-center gap-2 text-sm"><BarChart3 className="w-4 h-4 text-slide-success" /> Performance</div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// Collect test cases with portrait evidence for dedicated slides
const portraitTestCases = testCases.filter(tc => tc.evidenceKey && portraitEvidenceKeys.has(tc.evidenceKey));

function PortraitEvidenceSlide({ tc }: { tc: typeof testCases[0] }) {
  return (
    <SlideWrapper>
      <div className="flex items-center gap-3 mb-4">
        <Camera className="w-6 h-6 text-slide-accent" />
        <h2 className="text-3xl font-bold">Evidência — {tc.id}</h2>
        <span className="ml-auto text-sm font-mono text-slide-muted">{tc.scenario}</span>
      </div>
      <div className="flex-1 flex gap-8 items-center">
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-slide-card rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-lg text-slide-accent font-bold">{tc.id}</span>
              <span className={`px-2 py-0.5 rounded text-xs font-bold text-slide-bg ${typeColors[tc.type]}`}>
                {typeLabels[tc.type]}
              </span>
              {statusIcons[tc.status]}
            </div>
            <h3 className="font-bold text-lg mb-3">{tc.scenario}</h3>
            <div className="space-y-2 text-sm text-slide-fg/70">
              <p><span className="text-slide-success font-bold font-mono">DADO</span> {tc.given}</p>
              <p><span className="text-slide-warning font-bold font-mono">QUANDO</span> {tc.when}</p>
              <p><span className="text-slide-accent-2 font-bold font-mono">ENTÃO</span> {tc.then}</p>
            </div>
          </div>
          <div className="bg-slide-card rounded-2xl p-6">
            <p className="text-sm text-slide-muted font-mono mb-2">Resultado</p>
            <p className="text-base font-bold">
              {tc.status === 'passou' ? '✅ Teste aprovado — evidência visual ao lado' : '❌ Teste reprovado'}
            </p>
          </div>
        </div>
        {tc.evidenceKey && evidenceImages[tc.evidenceKey] && (
          <div className="w-72 shrink-0 flex flex-col gap-2">
            <img 
              src={evidenceImages[tc.evidenceKey]} 
              alt={`Evidência ${tc.id}`}
              className="rounded-2xl border border-slide-muted/20 w-full h-auto object-contain max-h-[500px]"
            />
            <span className="text-xs font-mono text-slide-muted text-center">
              {tc.status === 'passou' ? '✅ Passou' : '❌ Falhou'}
            </span>
          </div>
        )}
      </div>
    </SlideWrapper>
  );
}

// Build slides dynamically
const cypressLines = cypressCode.trim().split('\n');
const cypressSlideCount = Math.ceil(cypressLines.length / 32);
const evidenceSlideCount = Math.ceil(evidences.length / 7);
const testCaseSlideCount = Math.ceil(testCases.length / 2);

// Build test case slides, inserting portrait evidence slides after the page that contains them
const testCaseSlides: React.ReactNode[] = [];
for (let i = 0; i < testCaseSlideCount; i++) {
  testCaseSlides.push(<TestCasesSlide key={`tc${i}`} page={i} />);
  const start = i * 2;
  const pageItems = testCases.slice(start, start + 2);
  const portraitItems = pageItems.filter(tc => tc.evidenceKey && portraitEvidenceKeys.has(tc.evidenceKey));
  portraitItems.forEach(tc => {
    testCaseSlides.push(<PortraitEvidenceSlide key={`portrait-${tc.id}`} tc={tc} />);
  });
}

const slides = [
  <TitleSlide key="title" />,
  <AnalysisSlide key="analysis" />,
  ...testCaseSlides,
  <SummarySlide key="summary" />,
  ...Array.from({ length: evidenceSlideCount }, (_, i) => (
    <EvidencesSlide key={`ev${i}`} page={i} />
  )),
  <BugsSlide key="bugs" />,
  ...Array.from({ length: cypressSlideCount }, (_, i) => (
    <CypressSlide key={`cy${i}`} part={i} />
  )),
  <CypressVideoSlide key="video" />,
  <CICDSlide key="cicd" />,
  <ConclusionSlide key="conclusion" />,
];

export default function Presentation() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(slides.length - 1, c + 1));

  return (
    <div className="h-screen w-screen bg-slide-bg flex flex-col overflow-hidden" 
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') next();
        if (e.key === 'ArrowLeft') prev();
      }}
      tabIndex={0}
    >
      <div className="flex-1 overflow-hidden">
        {slides[current]}
      </div>

      <div className="h-14 bg-slide-card flex items-center justify-between px-8 shrink-0">
        <button onClick={prev} disabled={current === 0}
          className="p-2 rounded-lg hover:bg-slide-bg disabled:opacity-30 transition-colors">
          <ChevronLeft className="w-5 h-5 text-slide-fg" />
        </button>
        
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? 'bg-slide-accent w-6' : 'bg-slide-muted hover:bg-slide-fg/50 w-2'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm font-mono text-slide-muted">
            {current + 1} / {slides.length}
          </span>
          <button onClick={next} disabled={current === slides.length - 1}
            className="p-2 rounded-lg hover:bg-slide-bg disabled:opacity-30 transition-colors">
            <ChevronRight className="w-5 h-5 text-slide-fg" />
          </button>
        </div>
      </div>
    </div>
  );
}
