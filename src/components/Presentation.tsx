import { useState } from 'react';
import { ChevronLeft, ChevronRight, Bug, TestTube, Code, FileText, Target, Video, CheckCircle } from 'lucide-react';
import { testCases, bugReports } from '@/data/testData';
import { cypressCode } from '@/data/cypressCode';

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

function SlideWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full bg-slide-bg text-slide-fg p-16 flex flex-col font-display">
      {children}
    </div>
  );
}

function TitleSlide() {
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
          <span className="px-4 py-2 rounded-lg bg-slide-card text-sm font-mono">10 Casos de Teste</span>
          <span className="px-4 py-2 rounded-lg bg-slide-card text-sm font-mono">2 Bugs Reportados</span>
          <span className="px-4 py-2 rounded-lg bg-slide-card text-sm font-mono">Cypress E2E</span>
        </div>
      </div>
    </SlideWrapper>
  );
}

function AnalysisSlide() {
  return (
    <SlideWrapper>
      <div className="flex items-center gap-3 mb-8">
        <Target className="w-6 h-6 text-slide-accent" />
        <h2 className="text-3xl font-bold">Análise da Aplicação</h2>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-8">
        <div className="bg-slide-card rounded-2xl p-8 flex flex-col gap-4">
          <h3 className="text-xl font-bold text-slide-accent">Objetivo</h3>
          <p className="text-slide-fg/80 leading-relaxed">
            Aplicação simples para <strong>cadastro e listagem de cursos</strong>. 
            Permite ao usuário criar novos cursos e visualizar os já cadastrados.
          </p>
        </div>
        <div className="bg-slide-card rounded-2xl p-8 flex flex-col gap-4">
          <h3 className="text-xl font-bold text-slide-accent">Fluxos Principais</h3>
          <ul className="space-y-2 text-slide-fg/80">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slide-accent" /> Listar cursos cadastrados
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slide-accent" /> Cadastrar novo curso
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slide-accent" /> Navegação entre telas
            </li>
          </ul>
        </div>
        <div className="bg-slide-card rounded-2xl p-8 flex flex-col gap-4 col-span-2">
          <h3 className="text-xl font-bold text-slide-accent">Pontos Críticos para Teste</h3>
          <div className="grid grid-cols-3 gap-4">
            {['Validação de campos obrigatórios', 'Persistência de dados', 'Segurança (XSS/Injection)', 
              'Feedback ao usuário', 'Responsividade', 'Estados vazios'].map((item) => (
              <div key={item} className="px-4 py-3 bg-slide-bg rounded-xl text-sm text-center">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

function TestCasesSlide({ page }: { page: number }) {
  const perPage = 4;
  const start = page * perPage;
  const items = testCases.slice(start, start + perPage);

  return (
    <SlideWrapper>
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-6 h-6 text-slide-accent" />
        <h2 className="text-3xl font-bold">Casos de Teste</h2>
        <span className="ml-auto text-sm font-mono text-slide-muted">
          {start + 1}-{Math.min(start + perPage, testCases.length)} de {testCases.length}
        </span>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-4">
        {items.map((tc) => (
          <div key={tc.id} className="bg-slide-card rounded-2xl p-6 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-slide-accent font-bold">{tc.id}</span>
              <span className={`px-2 py-0.5 rounded text-xs font-bold text-slide-bg ${typeColors[tc.type]}`}>
                {typeLabels[tc.type]}
              </span>
              <span className="ml-auto text-xs font-mono text-slide-muted uppercase">
                Prioridade: {tc.priority}
              </span>
            </div>
            <h3 className="font-bold text-base">{tc.scenario}</h3>
            <div className="space-y-1 text-sm text-slide-fg/70">
              <p><span className="text-slide-success font-bold font-mono">DADO</span> {tc.given}</p>
              <p><span className="text-slide-warning font-bold font-mono">QUANDO</span> {tc.when}</p>
              <p><span className="text-slide-accent-2 font-bold font-mono">ENTÃO</span> {tc.then}</p>
            </div>
          </div>
        ))}
      </div>
    </SlideWrapper>
  );
}

function BugsSlide() {
  return (
    <SlideWrapper>
      <div className="flex items-center gap-3 mb-8">
        <Bug className="w-6 h-6 text-slide-danger" />
        <h2 className="text-3xl font-bold">Bugs Encontrados</h2>
        <span className="ml-auto text-sm font-mono text-slide-muted">{bugReports.length} bugs</span>
      </div>
      <div className="flex-1 flex flex-col gap-5">
        {bugReports.map((bug) => (
          <div key={bug.id} className="bg-slide-card rounded-2xl p-6 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-slide-danger font-bold">{bug.id}</span>
              <h3 className="font-bold text-lg">{bug.title}</h3>
              <span className={`ml-auto px-3 py-1 rounded text-xs font-bold text-slide-bg ${severityColors[bug.severity]}`}>
                {bug.severity.toUpperCase()}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-slide-muted font-mono text-xs">Passos</span>
                <ol className="list-decimal list-inside text-slide-fg/70 mt-1 space-y-0.5">
                  {bug.steps.map((s, i) => <li key={i}>{s}</li>)}
                </ol>
              </div>
              <div>
                <span className="text-slide-muted font-mono text-xs">Resultado Atual</span>
                <p className="text-slide-danger/90 mt-1">{bug.actual}</p>
              </div>
              <div>
                <span className="text-slide-muted font-mono text-xs">Resultado Esperado</span>
                <p className="text-slide-success/90 mt-1">{bug.expected}</p>
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
  const perSlide = 30;
  const start = part * perSlide;
  const chunk = lines.slice(start, start + perSlide).join('\n');

  return (
    <SlideWrapper>
      <div className="flex items-center gap-3 mb-6">
        <Code className="w-6 h-6 text-slide-accent-2" />
        <h2 className="text-3xl font-bold">Automação Cypress</h2>
        <span className="ml-auto text-sm font-mono text-slide-muted">Parte {part + 1}</span>
      </div>
      <div className="flex-1 bg-slide-code-bg rounded-2xl p-6 overflow-hidden">
        <pre className="text-sm leading-relaxed text-slide-fg/90 font-mono whitespace-pre overflow-auto h-full">
          {chunk}
        </pre>
      </div>
    </SlideWrapper>
  );
}

function CypressVideoSlide() {
  return (
    <SlideWrapper>
      <div className="flex items-center gap-3 mb-8">
        <Video className="w-6 h-6 text-slide-accent" />
        <h2 className="text-3xl font-bold">Evidências — Gravação Cypress</h2>
      </div>
      <div className="flex-1 flex flex-col gap-6">
        <div className="bg-slide-card rounded-2xl p-8 flex flex-col gap-4">
          <h3 className="text-xl font-bold text-slide-accent">Gravação Automática de Testes</h3>
          <p className="text-slide-fg/80 leading-relaxed">
            O Cypress gera automaticamente vídeos de cada execução de teste. Os arquivos são salvos em{' '}
            <code className="bg-slide-code-bg px-2 py-1 rounded text-sm">cypress/videos/</code> após rodar{' '}
            <code className="bg-slide-code-bg px-2 py-1 rounded text-sm">npx cypress run</code>.
          </p>
        </div>

        <div className="bg-slide-card rounded-2xl p-8">
          <h3 className="text-lg font-bold text-slide-accent mb-4">Configuração no cypress.config.ts</h3>
          <pre className="bg-slide-code-bg rounded-xl p-5 text-sm font-mono text-slide-fg/90 leading-relaxed">{`import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://creative-sherbet-a51eac.netlify.app',
    video: true,                    // ✅ Ativado por padrão
    videosFolder: 'cypress/videos', // 📁 Pasta de saída
    videoCompression: 32,           // 🎥 Compressão (0-51)
    screenshotOnRunFailure: true,   // 📸 Screenshot em falhas
  },
});`}</pre>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slide-card rounded-xl p-5 text-center">
            <Video className="w-8 h-8 text-slide-accent mx-auto mb-2" />
            <p className="text-sm font-bold">cypress/videos/</p>
            <p className="text-xs text-slide-muted mt-1">courses.cy.ts.mp4</p>
          </div>
          <div className="bg-slide-card rounded-xl p-5 text-center">
            <CheckCircle className="w-8 h-8 text-slide-success mx-auto mb-2" />
            <p className="text-sm font-bold">Comando</p>
            <p className="text-xs text-slide-muted mt-1 font-mono">npx cypress run</p>
          </div>
          <div className="bg-slide-card rounded-xl p-5 text-center">
            <TestTube className="w-8 h-8 text-slide-accent-2 mx-auto mb-2" />
            <p className="text-sm font-bold">BUG-003 Validado</p>
            <p className="text-xs text-slide-success mt-1">✅ Feedback funciona corretamente</p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

const slides = [
  <TitleSlide key="title" />,
  <AnalysisSlide key="analysis" />,
  <TestCasesSlide key="tc1" page={0} />,
  <TestCasesSlide key="tc2" page={1} />,
  <TestCasesSlide key="tc3" page={2} />,
  <BugsSlide key="bugs" />,
  <CypressSlide key="cy1" part={0} />,
  <CypressSlide key="cy2" part={1} />,
  <CypressSlide key="cy3" part={2} />,
  <CypressVideoSlide key="video" />,
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
      {/* Slide content */}
      <div className="flex-1 overflow-hidden">
        {slides[current]}
      </div>

      {/* Navigation bar */}
      <div className="h-16 bg-slide-card flex items-center justify-between px-8 shrink-0">
        <button onClick={prev} disabled={current === 0}
          className="p-2 rounded-lg hover:bg-slide-bg disabled:opacity-30 transition-colors">
          <ChevronLeft className="w-5 h-5 text-slide-fg" />
        </button>
        
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === current ? 'bg-slide-accent w-8' : 'bg-slide-muted hover:bg-slide-fg/50'
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
