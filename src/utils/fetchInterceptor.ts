let loadingContext: any = null;

export const setLoadingContext = (context: any) => {
  loadingContext = context;
};

export const fetchWithLoading = async (url: string, options?: RequestInit): Promise<Response> => {
  if (loadingContext) {
    loadingContext.startLoading();
  }

  try {
    const response = await fetch(url, options);
    return response;
  } finally {
    if (loadingContext) {
      loadingContext.stopLoading();
    }
  }
};

export const setupFetchInterceptor = () => {
  const originalFetch = window.fetch;
  
  const newFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    if (loadingContext) {
      loadingContext.startLoading();
    }

    try {
      const response = await originalFetch(input, init);
      return response;
    } finally {
      if (loadingContext) {
        loadingContext.stopLoading();
      }
    }
  };

  Object.setPrototypeOf(newFetch, Object.getPrototypeOf(originalFetch));
  Object.assign(newFetch, originalFetch);
  
  window.fetch = newFetch as typeof fetch;
}; 