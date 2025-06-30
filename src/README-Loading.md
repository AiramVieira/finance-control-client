# Sistema de Loading Global

Este projeto implementa um sistema de loading global que automaticamente intercepta todas as requisições `fetch` e exibe um indicador de loading.

## Como Funciona

### 1. Interceptor Automático
- Todas as requisições `fetch` são automaticamente interceptadas
- O loading é iniciado quando uma requisição começa
- O loading é finalizado quando a requisição termina (sucesso ou erro)

### 2. Componentes Principais

#### LoadingContext (`contexts/LoadingContext.tsx`)
- Gerencia o estado global de loading
- Fornece métodos para controlar o loading manualmente
- Suporta múltiplas requisições simultâneas

#### LoadingSpinner (`components/LoadingSpinner.tsx`)
- Componente visual do loading
- Aparece como overlay sobre toda a aplicação
- Design moderno com animações

#### FetchInterceptor (`utils/fetchInterceptor.ts`)
- Intercepta todas as requisições `fetch`
- Integra automaticamente com o contexto de loading

## Como Usar

### Uso Automático (Recomendado)
Todas as requisições `fetch` são automaticamente interceptadas:

```typescript
// Esta requisição automaticamente ativa o loading
const response = await fetch('/api/data');
```

### Uso Manual
Para controlar o loading manualmente em operações específicas:

```typescript
import { useLoading } from './contexts/LoadingContext';

const MyComponent = () => {
  const { startLoading, stopLoading } = useLoading();

  const handleManualOperation = async () => {
    startLoading();
    try {
      // Sua operação aqui
      await someAsyncOperation();
    } finally {
      stopLoading();
    }
  };

  return <button onClick={handleManualOperation}>Executar</button>;
};
```

### Hook Personalizado
Para operações mais complexas:

```typescript
import { useLoadingState } from './hooks/useLoadingState';

const MyComponent = () => {
  const { withLoading, localLoading } = useLoadingState();

  const handleComplexOperation = async () => {
    await withLoading(async () => {
      // Sua operação aqui
      await complexAsyncOperation();
    });
  };

  return (
    <button 
      onClick={handleComplexOperation}
      disabled={localLoading}
    >
      {localLoading ? 'Processando...' : 'Executar'}
    </button>
  );
};
```

## Configuração

O sistema já está configurado no `main.tsx`:

```typescript
import { LoadingProvider } from './contexts/LoadingContext'
import { LoadingSpinner } from './components/LoadingSpinner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoadingProvider>
      <AppWithLoading />
    </LoadingProvider>
  </StrictMode>,
)
```

## Benefícios

1. **Automático**: Não precisa configurar loading em cada requisição
2. **Consistente**: Interface de loading uniforme em toda a aplicação
3. **Confiável**: Funciona com múltiplas requisições simultâneas
4. **Flexível**: Permite controle manual quando necessário
5. **Performance**: Não afeta a performance das requisições

## Exemplo de Uso nos Serviços

Os serviços já estão configurados para usar o sistema:

```typescript
// services/finances.ts
export async function fetchFinances() {
  const response = await fetch("http://localhost:3000/api/finances");
  return await response.json();
}
```

Esta requisição automaticamente ativa o loading global. 