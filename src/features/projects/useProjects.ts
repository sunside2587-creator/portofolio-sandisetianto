import { useCallback, useEffect, useState } from 'react';
import { getCmsConfig } from '@/lib/env';
import type { AsyncDataState } from '@/types/common';
import type { Project } from '@/types/project';
import { FALLBACK_PROJECTS } from './projects.fallback';
import { loadProjects, type LoadProjectsResult } from './projects.service';

let cachedProjects: LoadProjectsResult | null = null;

function mapResultToState(result: LoadProjectsResult): AsyncDataState<Project> {
  if (result.error && result.error.code !== 'CMS_NOT_CONFIGURED') {
    return {
      status: 'error',
      data: result.projects,
      isFallback: true,
      error: result.error,
    };
  }
  return {
    status: 'success',
    data: result.projects,
    isFallback: result.isFallback,
  };
}

function getInitialProjectState(): AsyncDataState<Project> {
  if (getCmsConfig() === null) {
    return { status: 'success', data: FALLBACK_PROJECTS, isFallback: true };
  }
  if (cachedProjects !== null) {
    return mapResultToState(cachedProjects);
  }
  return { status: 'loading', data: FALLBACK_PROJECTS, isFallback: true };
}

export function useProjects() {
  const [state, setState] = useState<AsyncDataState<Project>>(getInitialProjectState);
  const [requestKey, setRequestKey] = useState(0);

  useEffect(() => {
    const config = getCmsConfig();
    if (!config) {
      return;
    }
    if (requestKey === 0 && cachedProjects !== null) {
      return;
    }

    const controller = new AbortController();

    async function fetchFromCms() {
      try {
        const result = await loadProjects(config, controller.signal);
        if (controller.signal.aborted) {
          return;
        }
        cachedProjects = result;
        setState(mapResultToState(result));
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
      }
    }

    void fetchFromCms();

    return () => {
      controller.abort();
    };
  }, [requestKey]);

  const refetch = useCallback(() => {
    cachedProjects = null;
    setState({ status: 'loading', data: FALLBACK_PROJECTS, isFallback: true });
    setRequestKey((k) => k + 1);
  }, []);

  return { state, refetch };
}
